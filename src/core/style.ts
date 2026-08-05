import {
  type ComplexStyleRule,
  type StyleRule,
  style as styleBase,
} from "@vanilla-extract/css";

type ClassNames = string | ClassNames[];

function layerWrap(
  layer: string,
  rule: ComplexStyleRuleWithoutLayer,
): ComplexStyleRule;
function layerWrap(
  layer: string,
  rule: StyleRuleWithoutLayer | ClassNames,
): StyleRule | ClassNames;
function layerWrap(
  layer: string,
  rule: ComplexStyleRuleWithoutLayer | StyleRuleWithoutLayer | ClassNames,
): ComplexStyleRule | StyleRule | ClassNames {
  if (typeof rule === "string") {
    return rule;
  }

  if (Array.isArray(rule)) {
    return rule.map((arg) => layerWrap(layer, arg));
  }

  return {
    "@layer": {
      [layer]: rule,
    },
  };
}

export type ComplexStyleRuleWithoutLayer =
  | StyleRuleWithoutLayer
  | Array<StyleRuleWithoutLayer | ClassNames>;

export type StyleRuleWithoutLayer = Omit<StyleRule, "@layer">;

export function style(...args: Parameters<typeof styleBase>): string;
export function style(
  layer: string,
  rule: ComplexStyleRuleWithoutLayer,
  debugId?: string,
): string;
export function style(
  ...args:
    | Parameters<typeof styleBase>
    | [layer: string, rule: ComplexStyleRuleWithoutLayer, debugId?: string]
): string {
  if (typeof args[0] !== "string" || args[1] === undefined) {
    return styleBase(...(args as Parameters<typeof styleBase>));
  }

  const [layer, rule, debugId] = args;

  return styleBase(
    layerWrap(layer, rule as ComplexStyleRuleWithoutLayer),
    debugId,
  );
}
