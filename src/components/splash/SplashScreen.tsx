import { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";

interface Particle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  alpha: number;
}

interface SplashScreenProps {
  onComplete: () => void;
}

const ANIMATION_DURATION = 1600;
const LOGO_HOLD_DURATION = 350;
const SHUTTER_DURATION = 1200;

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [settled, setSettled] = useState(false);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const timer = window.setTimeout(onComplete, 600);
      return () => window.clearTimeout(timer);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let isCancelled = false;

    let revealTimer = 0;
    let completeTimer = 0;

    // =========================================
    // CINEMATIC REVEAL
    // Called only after logo assembly.
    // =========================================

    const startCinematicReveal = () => {
      if (isCancelled) return;

      // Display the completed logo.
      setSettled(true);

      // Give the completed logo time to be seen.
      revealTimer = window.setTimeout(() => {
        if (isCancelled) return;

        // Hide the logo and start both shutters.
        setRevealing(true);

        // Remove splash after shutters finish.
        completeTimer = window.setTimeout(() => {
          if (!isCancelled) {
            onComplete();
          }
        }, SHUTTER_DURATION + 50);
      }, LOGO_HOLD_DURATION);
    };

    // =========================================
    // LOAD LOGO
    // =========================================

    const image = new Image();

    image.onload = () => {
      if (isCancelled) return;

      const width = Math.min(window.innerWidth * 0.58, 300);
      const height = width * (image.height / image.width);

      const canvasWidth = width * 2.2;
      const canvasHeight = height * 2.2;

      const offsetX = (canvasWidth - width) / 2;
      const offsetY = (canvasHeight - height) / 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // =========================================
      // OFFSCREEN IMAGE SAMPLING
      // =========================================

      const offscreen = document.createElement("canvas");

      offscreen.width = Math.round(canvasWidth);
      offscreen.height = Math.round(canvasHeight);

      const offscreenContext = offscreen.getContext("2d");

      if (!offscreenContext) {
        startCinematicReveal();
        return;
      }

      offscreenContext.drawImage(image, offsetX, offsetY, width, height);

      const imageData = offscreenContext.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      );

      const particles: Particle[] = [];
      const step = 5;

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      const phase1 = Math.random() * Math.PI * 2;
      const phase2 = Math.random() * Math.PI * 2;
      const phase3 = Math.random() * Math.PI * 2;

      // =========================================
      // PARTICLE GENERATION
      // =========================================

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const sampleX = Math.round(x + offsetX);
          const sampleY = Math.round(y + offsetY);

          const index = (sampleY * offscreen.width + sampleX) * 4;

          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const alpha = imageData.data[index + 3];

          if (alpha < 75) continue;

          const angle = Math.random() * Math.PI * 2;

          const organicShape =
            1 +
            0.12 * Math.sin(angle * 3 + phase1) +
            0.08 * Math.sin(angle * 5 + phase2) +
            0.06 * Math.cos(angle * 7 + phase3);

          const randomRadius =
            0.08 + Math.pow(Math.random(), 0.8) * 0.29;

          const radius = randomRadius * organicShape;

          const randomX = 1 + (Math.random() - 0.5) * 0.12;
          const randomY = 1 + (Math.random() - 0.5) * 0.12;

          const startX =
            centerX +
            Math.cos(angle) * canvasWidth * 0.46 * radius * randomX;

          const startY =
            centerY +
            Math.sin(angle) * canvasHeight * 0.46 * radius * randomY;

          particles.push({
            x: x + offsetX,
            y: y + offsetY,
            startX,
            startY,
            size: 1.5 + Math.random() * 0.8,
            color: `rgb(${r}, ${g}, ${b})`,
            alpha: alpha / 255,
          });
        }
      }

      // =========================================
      // PARTICLE ANIMATION
      // =========================================

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        if (isCancelled) return;

        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / ANIMATION_DURATION,
          1,
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        particles.forEach((particle) => {
          const currentX =
            particle.startX +
            (particle.x - particle.startX) * easedProgress;

          const currentY =
            particle.startY +
            (particle.y - particle.startY) * easedProgress;

          context.globalAlpha = particle.alpha;
          context.fillStyle = particle.color;

          context.beginPath();

          context.arc(
            currentX,
            currentY,
            particle.size,
            0,
            Math.PI * 2,
          );

          context.fill();
        });

        context.globalAlpha = 1;

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          context.clearRect(0, 0, canvasWidth, canvasHeight);

          // Logo assembly successfully completed.
          startCinematicReveal();
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    // =========================================
    // IMAGE ERROR FALLBACK
    // =========================================

    image.onerror = () => {
      if (!isCancelled) {
        startCinematicReveal();
      }
    };

    image.src = "/polyrib-logo.png";

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      isCancelled = true;

      cancelAnimationFrame(animationFrame);

      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);

      image.onload = null;
      image.onerror = null;
    };
  }, [onComplete]);

  return (
    <div
      className={`polyrib-splash ${
        revealing ? "splash-revealing" : ""
      }`}
      aria-label="Loading POLYRIB"
      role="status"
    >
      {/* Cinematic white shutters */}
      <div className="splash-shutter splash-shutter-top" />

      <div className="splash-shutter splash-shutter-bottom" />

      {/* Logo and particle animation */}
      <div
        className={`splash-logo-wrapper ${
          revealing ? "splash-logo-exit" : ""
        }`}
        aria-hidden={revealing}
      >
        <canvas
          ref={canvasRef}
          className={`splash-particles ${
            settled ? "particles-hidden" : ""
          }`}
        />

        <img
          src="/polyrib-logo.png"
          alt="POLYRIB"
          className={`splash-logo ${
            settled ? "logo-visible" : ""
          }`}
        />
      </div>
    </div>
  );
}