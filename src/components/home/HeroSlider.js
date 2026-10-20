"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 6000;

const SLIDE_MS = 900;

/**
 * Full-width home page slideshow: photos slide in from right to left in an endless loop,
 * with animated captions, autoplay with progress bar, arrows, dots, swipe and keyboard support.
 * `slides` are already translated: [{ id, image, title, subtitle }].
 * `children` (badge + buttons) stay fixed while the slides change.
 */
export default function HeroSlider({ slides, children }) {
  const count = slides.length;
  // `position` is the slide on screen in the track. The track ends with a copy of the
  // first slide, so going "next" from the last slide still moves right-to-left; once that
  // copy is showing we jump back to the real first slide without animation.
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const index = position % count;

  const jumpThenSlide = useCallback((jumpTo, slideTo) => {
    setAnimate(false);
    setPosition(jumpTo);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setPosition(slideTo);
      })
    );
  }, []);

  const next = useCallback(() => {
    // Still on the copy of the first slide (e.g. transitionend never fired): reset, then move on.
    if (position >= count) jumpThenSlide(0, 1);
    else setPosition(position + 1);
  }, [position, count, jumpThenSlide]);
  const prev = useCallback(() => {
    if (position === 0) jumpThenSlide(count, count - 1);
    else setPosition(position - 1);
  }, [position, count, jumpThenSlide]);
  const goTo = (i) => setPosition(i);

  // Once the copy of the first slide has slid in, silently swap to the real first slide.
  useEffect(() => {
    if (count < 2 || position !== count) return;
    const timer = setTimeout(() => {
      setAnimate(false);
      setPosition(0);
    }, SLIDE_MS + 50);
    return () => clearTimeout(timer);
  }, [position, count]);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  // Pause autoplay while the browser tab is hidden.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [position, paused, count, next]);

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const current = slides[index];
  const track = count > 1 ? [...slides, slides[0]] : slides;

  return (
    <section
      className="relative isolate h-[85svh] min-h-[460px] max-h-[860px] overflow-hidden bg-primary-dark sm:h-[78vh] sm:min-h-[520px]"
      aria-roledescription="carousel"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      {/* Photos */}
      <div
        className="absolute inset-0 -z-10 flex"
        style={{
          transform: `translateX(-${position * 100}%)`,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
        }}
      >
        {track.map((slide, i) => (
          <div key={`${slide.id}-${i}`} className="h-full w-full shrink-0" aria-hidden={i !== position}>
            {slide.image && (
              <img
                src={slide.image}
                alt=""
                fetchPriority={i === 0 ? "high" : "low"}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Text */}
      <Container className="flex h-full flex-col justify-center pb-16 sm:pb-20">
        <div key={index} className="max-w-3xl" aria-live="polite">
          <h1 className="animate-fade-up text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl md:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          {current.subtitle && (
            <p className="animate-fade-up mt-3 max-w-2xl text-base text-on-dark sm:mt-4 sm:text-lg md:text-xl" style={{ animationDelay: "150ms" }}>
              {current.subtitle}
            </p>
          )}
        </div>
        <div className="animate-fade-up mt-6 sm:mt-8" style={{ animationDelay: "300ms" }}>
          {children}
        </div>
      </Container>

      {count > 1 && (
        <>
          {/* Arrows */}
          {[
            ["left-3 lg:left-6", -1, "Previous slide", "chevronLeft"],
            ["right-3 lg:right-6", 1, "Next slide", "chevronRight"],
          ].map(([pos, step, label, icon]) => (
            <button
              key={label}
              onClick={step > 0 ? next : prev}
              aria-label={label}
              className={`absolute ${pos} top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition hover:bg-white/30 md:block`}
            >
              <Icon name={icon} className="h-6 w-6" />
            </button>
          ))}

          {/* Dots with progress */}
          <div className="absolute inset-x-0 bottom-16 flex justify-center gap-2 sm:bottom-20">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={cn("relative h-1.5 overflow-hidden rounded-full bg-white/40 transition-all", i === index ? "w-10" : "w-4 hover:bg-white/70")}
              >
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className={cn("absolute inset-0 bg-accent", !paused && "animate-slide-progress")}
                    style={{ animationDuration: `${INTERVAL_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
