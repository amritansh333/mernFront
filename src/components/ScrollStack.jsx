import {
  Children,
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
} from "react";

import "./ScrollStack.css";

const resolveOffset = (value, size) => {
  if (typeof value === "number") return value;

  const text = String(value).trim();

  if (text.endsWith("%")) {
    return (parseFloat(text) / 100) * size;
  }

  return parseFloat(text) || 0;
};

const toLength = (value) => (typeof value === "number" ? `${value}px` : value);

const scrollsInside = (node, stop, delta) => {
  for (
    let element = node;
    element && element !== stop;
    element = element.parentElement
  ) {
    if (element.scrollHeight <= element.clientHeight + 1) {
      continue;
    }

    const overflow = getComputedStyle(element).overflowY;

    if (overflow !== "auto" && overflow !== "scroll") {
      continue;
    }

    const canScroll =
      delta > 0
        ? element.scrollTop + element.clientHeight < element.scrollHeight - 1
        : element.scrollTop > 0;

    if (canScroll) return true;
  }

  return false;
};

export const ScrollStackItem = ({ children, itemClassName = "", style }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
    <span className="scroll-stack-card__shade" aria-hidden="true" />
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemStackDistance = 24,
  stackPosition = "15%",
  itemScale = 0.05,
  baseScale = 0.8,
  dimAmount = 0.2,
  blurAmount = 0,
  tiltAmount = 0,
  rotationAmount = 0,
  holdDistance = 0,
  smoothScroll = true,
  snap = false,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const endRef = useRef(null);

  const settingsRef = useRef(null);
  const scheduleRef = useRef(null);

  const items = Children.toArray(children);

  // Keep the latest props available to the scroll effect
  // without recreating all event listeners on every render.
  useLayoutEffect(() => {
    settingsRef.current = {
      itemDistance,
      itemStackDistance,
      stackPosition,
      itemScale,
      baseScale,
      dimAmount,
      blurAmount,
      tiltAmount,
      rotationAmount,
      holdDistance,
      smoothScroll,
      snap,
      onStackComplete,
    };

    scheduleRef.current?.();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const end = endRef.current;

    if (!root || !inner || !end) return undefined;

    const windowed = useWindowScroll;
    const target = windowed ? window : root;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const cache = new Map();

    let frame = 0;
    let glide = 0;
    let rest = 0;

    let complete = false;
    let gliding = false;
    let pressed = false;

    let current = 0;
    let goal = 0;
    let written = 0;
    let lastFrameTime = 0;

    let points = [];
    let snapReach = 0;

    const readScroll = () => (windowed ? window.scrollY : root.scrollTop);

    const maxScroll = () =>
      windowed
        ? Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          )
        : Math.max(0, root.scrollHeight - root.clientHeight);

    const writeScroll = (value) => {
      written = value;

      if (windowed) {
        window.scrollTo({
          top: value,
          behavior: "instant",
        });
      } else {
        root.scrollTo({
          top: value,
          behavior: "instant",
        });
      }
    };

    const write = (key, value, apply) => {
      if (cache.get(key) === value) return false;

      cache.set(key, value);
      apply(value);

      return true;
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    const update = () => {
      frame = 0;

      const settings = settingsRef.current;

      const slots = Array.from(inner.children).filter((child) =>
        child.hasAttribute("data-stack-slot"),
      );

      if (!settings || !slots.length) return;

      const viewHeight = windowed ? window.innerHeight : root.clientHeight;

      const viewTop = windowed
        ? 0
        : root.getBoundingClientRect().top + root.clientTop;

      const stackTop = resolveOffset(settings.stackPosition, viewHeight);

      const offset = settings.itemStackDistance;

      const heights = slots.map((slot) => slot.offsetHeight);
      const tops = slots.map((slot) => slot.getBoundingClientRect().top);

      const lastIndex = slots.length - 1;
      const lastHeight = heights[lastIndex];
      const lastPin = stackTop + lastIndex * offset;

      // Give the final card enough trailing space to release
      // naturally from its sticky position.
      const releaseSpace = Math.max(0, viewHeight - lastPin - lastHeight);

      const endHeight = Math.max(0, settings.holdDistance) + releaseSpace;

      const padTop = windowed ? 0 : stackTop;

      let layoutChanged = write("padTop", padTop, (value) => {
        inner.style.paddingTop = `${value}px`;
      });

      layoutChanged =
        write("endHeight", endHeight, (value) => {
          end.style.height = `${value}px`;
        }) || layoutChanged;

      let flow =
        inner.getBoundingClientRect().top - viewTop + readScroll() + padTop;

      points = heights.map((height, index) => {
        const point = flow - stackTop - index * offset;

        flow += height + settings.itemDistance;

        return point;
      });

      snapReach = Math.max(
        40,
        (heights[0] + settings.itemDistance - offset) / 2,
      );

      const depths = slots.map(() => 0);
      let lastCover = 0;

      for (let j = 1; j < slots.length; j++) {
        const pinBefore = viewTop + stackTop + (j - 1) * offset;

        const start = pinBefore + heights[j - 1];

        const span = Math.max(1, start - pinBefore - offset);

        const cover = Math.min(1, Math.max(0, (start - tops[j]) / span));

        for (let i = 0; i < j; i++) {
          depths[i] += cover;
        }

        lastCover = cover;
      }

      const dimStep = Math.min(Math.max(settings.dimAmount, 0), 1);

      slots.forEach((slot, index) => {
        const card = slot.firstElementChild;

        if (!card) return;

        const depth = depths[index];
        const lean = Math.min(depth, 1);

        const scale = Math.max(
          Math.min(settings.baseScale, 1),
          1 - depth * settings.itemScale,
        );

        const tilt = -lean * settings.tiltAmount;

        const turn = lean * settings.rotationAmount * (index % 2 ? -1 : 1);

        const blur = depth * settings.blurAmount;
        const dim = 1 - Math.pow(1 - dimStep, depth);

        const transform =
          depth < 0.0005
            ? ""
            : `perspective(1200px) rotateX(${tilt.toFixed(
                2,
              )}deg) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

        write(`transform-${index}`, transform, (value) => {
          card.style.transform = value;
        });

        write(
          `filter-${index}`,
          blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "",
          (value) => {
            card.style.filter = value;
          },
        );

        write(`dim-${index}`, dim.toFixed(3), (value) => {
          card.style.setProperty("--scroll-stack-dim", value);
        });
      });

      const done = slots.length > 1 && lastCover >= 0.999;

      if (done !== complete) {
        complete = done;

        if (done) {
          settings.onStackComplete?.();
        }
      }

      // Recalculate after changing the stack's layout dimensions.
      if (layoutChanged) schedule();
    };

    const settle = () => {
      rest = 0;

      const settings = settingsRef.current;

      if (!settings?.snap || gliding || pressed || !points.length) {
        return;
      }

      const now = readScroll();

      const nearest = points.reduce((best, point) =>
        Math.abs(point - now) < Math.abs(best - now) ? point : best,
      );

      const distance = Math.abs(nearest - now);

      if (distance > 1 && distance < snapReach) {
        glideTo(nearest);
      }
    };

    const settleSoon = () => {
      window.clearTimeout(rest);
      rest = window.setTimeout(settle, 140);
    };

    const step = (now) => {
      const dt = Math.min(0.05, (now - lastFrameTime) / 1000);

      lastFrameTime = now;

      // Stop the animation if another scroll action takes control.
      if (Math.abs(readScroll() - written) > 2) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }

      current += (goal - current) * (1 - Math.pow(0.9, dt * 60));

      if (Math.abs(goal - current) < 0.5) {
        current = goal;
      }

      writeScroll(current);

      if (current === goal) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }

      glide = requestAnimationFrame(step);
    };

    const glideTo = (value) => {
      goal = Math.min(Math.max(value, 0), maxScroll());

      if (motion.matches) {
        gliding = false;
        writeScroll(goal);
        return;
      }

      if (gliding) return;

      gliding = true;
      current = readScroll();
      written = current;
      lastFrameTime = performance.now();

      glide = requestAnimationFrame(step);
    };

    const onScroll = () => {
      schedule();

      if (!gliding) settleSoon();
    };

    const onWheel = (event) => {
      const settings = settingsRef.current;

      if (
        !settings?.smoothScroll ||
        motion.matches ||
        event.defaultPrevented ||
        event.ctrlKey
      ) {
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      const page = windowed ? window.innerHeight : root.clientHeight;

      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? page : 1);

      if (
        !delta ||
        scrollsInside(event.target, windowed ? document.body : root, delta)
      ) {
        return;
      }

      const base = gliding ? goal : readScroll();

      if (
        (delta < 0 && base <= 0) ||
        (delta > 0 && base >= maxScroll() - 0.5)
      ) {
        return;
      }

      event.preventDefault();

      window.clearTimeout(rest);
      glideTo(base + delta);
    };

    const onPress = () => {
      pressed = true;
      window.clearTimeout(rest);
    };

    const onRelease = () => {
      if (!pressed) return;

      pressed = false;
      settleSoon();
    };

    const observer = new ResizeObserver(schedule);

    observer.observe(root);
    observer.observe(inner);

    target.addEventListener("scroll", onScroll, {
      passive: true,
    });

    target.addEventListener("wheel", onWheel, {
      passive: false,
    });

    target.addEventListener("pointerdown", onPress, {
      passive: true,
    });

    window.addEventListener("pointerup", onRelease, {
      passive: true,
    });

    window.addEventListener("pointercancel", onRelease, {
      passive: true,
    });

    window.addEventListener("resize", schedule);

    scheduleRef.current = schedule;

    update();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(glide);

      window.clearTimeout(rest);

      observer.disconnect();

      target.removeEventListener("scroll", onScroll);
      target.removeEventListener("wheel", onWheel);
      target.removeEventListener("pointerdown", onPress);

      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      window.removeEventListener("resize", schedule);

      if (scheduleRef.current === schedule) {
        scheduleRef.current = null;
      }
    };
  }, [useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`scroll-stack ${
        useWindowScroll ? "scroll-stack--window" : "scroll-stack--contained"
      } ${className}`.trim()}
    >
      <div ref={innerRef} className="scroll-stack__inner">
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance;

          return (
            <Fragment
              key={isValidElement(child) ? (child.key ?? index) : index}
            >
              {index > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: Math.max(0, gap),
                    marginTop: Math.min(0, gap),
                  }}
                />
              )}

              <div
                data-stack-slot=""
                className="scroll-stack__slot"
                style={{
                  top: `calc(${toLength(stackPosition)} + ${
                    index * itemStackDistance
                  }px)`,
                  marginBottom: (items.length - 1 - index) * itemStackDistance,
                  zIndex: index + 1,
                }}
              >
                {child}
              </div>
            </Fragment>
          );
        })}

        <div ref={endRef} className="scroll-stack__end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
