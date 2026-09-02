import { type GlobalStyleRule, globalStyle } from "@vanilla-extract/css";

export type GlobalStylesLayerRules = Record<
  string,
  Omit<GlobalStyleRule, "@layer">
>;

export type GlobalStylesRules = Record<
  string,
  GlobalStyleRule | Record<string, GlobalStylesLayerRules>
> & {
  "@layer"?: Record<string, GlobalStylesLayerRules>;
};

export function globalStyles(rules: GlobalStylesRules): void {
  for (const selector of Object.keys(rules)) {
    if (selector === "@layer" && rules[selector]) {
      for (const layer of Object.keys(rules[selector])) {
        const layerRules = rules[selector][layer];

        for (const layerSelector of Object.keys(layerRules)) {
          globalStyle(layerSelector, {
            "@layer": { [layer]: layerRules[layerSelector] },
          });
        }
      }
    } else {
      globalStyle(selector, rules[selector]);
    }
  }
}
