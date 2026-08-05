import {
  type SpacingOptions,
  type SpacingValue,
  spacing,
} from "#/core/spacing.ts";
import { typeScale } from "#/core/type-scale.ts";
import { clamp } from "#/utils/clamp.ts";

export interface VerticalRhythmResult {
  fontSize?: (step: number) => {
    fontSize: `${number}rem`;
    lineHeight: `${number}rem`;
  };
  spacing: (
    ...beats:
      | [SpacingValue, ...SpacingValue[]]
      | [SpacingValue, ...SpacingValue[], Pick<SpacingOptions, "separator">]
  ) => string;
}

export type VerticalRhythmSignature =
  | { lineHeight: number; spacingRatio: number }
  | `${number}/${number}`;

export function verticalRhythm(
  signature: VerticalRhythmSignature,
  options: {
    typeScale: Parameters<typeof typeScale>[0];
    whitespaceRatio?: number;
  },
): Required<VerticalRhythmResult>;
export function verticalRhythm(
  signature: VerticalRhythmSignature,
  options?: {
    typeScale?: never;
    whitespaceRatio?: number;
  },
): Omit<VerticalRhythmResult, "fontSize">;
export function verticalRhythm(
  signature: VerticalRhythmSignature,
  options: {
    typeScale?: Parameters<typeof typeScale>[0];
    whitespaceRatio?: number;
  } = {},
): VerticalRhythmResult | Omit<VerticalRhythmResult, "fontSize"> {
  let lineHeight: number;
  let spacingRatio: number;

  if (typeof signature === "string") {
    const [numerator, denominator] = signature.split("/").map(Number);
    lineHeight = denominator / numerator;
    spacingRatio = 1 / numerator;
  } else {
    ({ lineHeight, spacingRatio } = signature);
  }

  const result: VerticalRhythmResult = {
    spacing(...args) {
      const lastArg = args.at(-1);
      let spacingArgs: [SpacingValue, ...SpacingValue[], SpacingOptions];

      if (typeof lastArg === "number" || typeof lastArg === "string") {
        spacingArgs = [...args, {}] as typeof spacingArgs;
      } else {
        spacingArgs = [...args] as typeof spacingArgs;
      }

      const spacingOptions = spacingArgs.at(-1) as SpacingOptions;
      spacingOptions.baseValue = `${lineHeight}rem`;
      spacingOptions.ratio = spacingRatio;

      return spacing(...spacingArgs);
    },
  };

  if (options.typeScale !== undefined) {
    const { fontSize } = typeScale(options.typeScale, "");

    result.fontSize = (step: number) => {
      const size = Number.parseFloat(fontSize(step));
      const subjectRatio = 1 - clamp(options.whitespaceRatio ?? 0, 0, 1);
      const lines = Math.ceil(size / (lineHeight * subjectRatio));

      return {
        fontSize: `${size}rem`,
        lineHeight: `${lines * lineHeight}rem`,
      };
    };
  }

  return result;
}
