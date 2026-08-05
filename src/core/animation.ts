import type { Property } from "csstype";
import { formatTime } from "#/utils/format-time.ts";

export class Animation {
  private readonly declarations: Array<
    Partial<Animation["options"]> & { name: string }
  > = [];

  private readonly options: {
    delay?: Property.AnimationDelay | number;
    direction: Property.AnimationDirection;
    duration: Property.AnimationDuration | number;
    fillMode?: Property.AnimationFillMode;
    iterationCount: Property.AnimationIterationCount;
    playState: Property.AnimationPlayState;
    timeline: Property.AnimationTimeline;
    timingFunction: Property.AnimationTimingFunction;
  };

  constructor({
    delay,
    direction = "normal",
    duration = "0s",
    fillMode,
    iterationCount = "1",
    playState = "running",
    timeline = "auto",
    timingFunction = "ease",
  }: Partial<Animation["options"]> = {}) {
    this.options = {
      delay,
      direction,
      duration,
      fillMode,
      iterationCount,
      playState,
      timeline,
      timingFunction,
    };
  }

  add(name: string, options: Partial<Animation["options"]> = {}): this {
    this.declarations.push({ ...options, name });
    return this;
  }

  toString(): string {
    return this.declarations
      .map(
        ({
          delay = this.options.delay,
          direction = this.options.direction,
          duration = this.options.duration,
          fillMode = this.options.fillMode,
          iterationCount = this.options.iterationCount,
          playState = this.options.playState,
          name,
          timeline = this.options.timeline,
          timingFunction = this.options.timingFunction,
        }) => {
          if (typeof delay === "number") {
            delay = formatTime(delay);
          }

          if (typeof duration === "number") {
            duration = formatTime(duration);
          }

          if (typeof iterationCount === "number") {
            iterationCount = `${iterationCount}`;
          }

          let result = `${duration}`;

          if (timingFunction !== "ease") {
            result += ` ${timingFunction}`;
          }

          if (delay) {
            result += ` ${delay}`;
          }

          if (iterationCount !== "1") {
            result += ` ${iterationCount}`;
          }

          if (direction !== "normal") {
            result += ` ${direction}`;
          }

          if (fillMode) {
            result += ` ${fillMode}`;
          }

          if (playState !== "running") {
            result += ` ${playState}`;
          }

          result += ` ${name}`;

          if (timeline !== "auto") {
            result += ` ${timeline}`;
          }

          return result;
        },
      )
      .join(",");
  }
}

export function createAnimation(
  options?: Partial<Animation["options"]>,
): (...args: Parameters<Animation["add"]>) => Animation {
  return (...args) => new Animation(options).add(...args);
}

export const animation: ReturnType<typeof createAnimation> = createAnimation();
