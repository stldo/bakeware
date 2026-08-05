import { colordx } from "@colordx/core";
import { createTheme } from "#/core/create-theme.ts";

export function alpha(color: string, value: number): string {
  if (value < 0 || value > 1) {
    throw new Error(`Invalid value: "${value}" must be >= 0 and <= 1`);
  }

  return colordx(color.startsWith("var(") ? createTheme.var(color) : color)
    .alpha(value)
    .toRgbString({ legacy: true });
}
