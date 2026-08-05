import type { GlobalStyleRule } from "@vanilla-extract/css";
import {
  type GlobalStylesRuleWithoutLayer,
  globalStyle,
} from "#/core/global-style.ts";

export type GlobalStylesRules = Record<string, GlobalStyleRule>;

export type GlobalStylesRulesWithoutLayer = Record<
  string,
  GlobalStylesRuleWithoutLayer
>;

export function globalStyles(rules: GlobalStylesRules): void;
export function globalStyles(
  layer: string,
  rules: GlobalStylesRulesWithoutLayer,
): void;
export function globalStyles(
  ...args:
    | [rules: GlobalStylesRules]
    | [layer: string, rules: GlobalStylesRulesWithoutLayer]
) {
  const [layer, rules] = args.length === 2 ? args : [null, args[0]];

  for (const selector of Object.keys(rules)) {
    if (layer === null) {
      globalStyle(selector, rules[selector]);
    } else {
      globalStyle(layer, selector, rules[selector]);
    }
  }
}
