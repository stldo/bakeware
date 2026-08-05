import type { PropertiesHyphen, Property } from "csstype";
import { formatTime } from "#/utils/format-time.ts";

export type PropertyName = keyof PropertiesHyphen;

export class Transition {
  private readonly declarations: Array<
    Partial<Transition["options"]> & { property: PropertyName }
  > = [];

  private readonly options: {
    behavior: Property.TransitionBehavior;
    delay?: Property.TransitionDelay | number;
    duration: Property.TransitionDuration | number;
    timingFunction: Property.TransitionTimingFunction;
  };

  constructor({
    behavior = "normal",
    delay,
    duration = "0s",
    timingFunction = "ease",
  }: Partial<Transition["options"]> = {}) {
    this.options = { behavior, delay, duration, timingFunction };
  }

  add(
    ...properties:
      | [PropertyName, ...PropertyName[]]
      | [PropertyName, ...PropertyName[], Partial<Transition["options"]>]
  ): this {
    let options = properties.at(-1);

    if (typeof options === "string") {
      options = {};
    } else {
      properties.pop();
    }

    for (const property of properties as PropertyName[]) {
      this.declarations.push({ ...options, property });
    }

    return this;
  }

  toString(): string {
    return this.declarations
      .map(
        ({
          behavior = this.options.behavior,
          delay = this.options.delay,
          duration = this.options.duration,
          property,
          timingFunction = this.options.timingFunction,
        }) => {
          if (typeof delay === "number") {
            delay = formatTime(delay);
          }

          if (typeof duration === "number") {
            duration = formatTime(duration);
          }

          let result = `${property} ${duration}`;

          if (timingFunction !== "ease") {
            result += ` ${timingFunction}`;
          }

          if (delay) {
            result += ` ${delay}`;
          }

          if (behavior !== "normal") {
            result += ` ${behavior}`;
          }

          return result;
        },
      )
      .join(",");
  }
}

export function createTransition(
  options?: Partial<Transition["options"]>,
): (...args: Parameters<Transition["add"]>) => Transition {
  return (...args) => new Transition(options).add(...args);
}

export const transition: ReturnType<typeof createTransition> =
  createTransition();
