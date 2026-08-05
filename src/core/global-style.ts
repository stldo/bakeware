import {
  type GlobalStyleRule,
  globalStyle as globalStyleBase,
} from "@vanilla-extract/css";

export type GlobalStylesRuleWithoutLayer = Omit<GlobalStyleRule, "@layer">;

export function globalStyle(...args: Parameters<typeof globalStyleBase>): void;
export function globalStyle(
  layer: string,
  selector: string,
  rule: GlobalStylesRuleWithoutLayer,
): void;
export function globalStyle(
  ...args:
    | Parameters<typeof globalStyleBase>
    | [layer: string, selector: string, rule: GlobalStylesRuleWithoutLayer]
) {
  if (args.length === 3) {
    const [layer, selector, rule] = args;
    globalStyleBase(selector, { "@layer": { [layer]: rule } });
    return;
  }

  globalStyleBase(...args);
}
