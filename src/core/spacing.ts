import { parseDimension } from "#/utils/parse-dimension.ts";

export interface SpacingOptions {
  baseValue?: `${number}${string}`;
  ratio?: number;
  separator?: " " | ",";
}

export type SpacingValue = number | string;

export function spacing(
  ...values:
    | [SpacingValue, ...SpacingValue[]]
    | [SpacingValue, ...SpacingValue[], SpacingOptions]
): string {
  let options = values.at(-1);

  if (typeof options === "number" || typeof options === "string") {
    options = {};
  } else if (options) {
    values.pop();
  }

  const { baseValue = "1rem", ratio = 1 / 4, separator = " " } = options ?? {};
  const [baseAmount, baseUnit] = parseDimension(baseValue);

  return (values as SpacingValue[])
    .map((value) =>
      typeof value === "number" && value !== 0
        ? `${value * baseAmount * ratio}${baseUnit}`
        : `${value}`,
    )
    .join(separator);
}
