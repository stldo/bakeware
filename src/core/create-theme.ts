import { createTheme as createThemeBase } from "@vanilla-extract/css";

type Tokens = Record<string, Record<string, string> | string>;

const VAR_CACHE: Map<string, string> = new Map();

function fillCache(baseTokens: Tokens, tokens: Tokens) {
  for (const key of Object.keys(baseTokens)) {
    const functionToken = baseTokens[key];
    const token = tokens[key];

    if (typeof functionToken === "string" && typeof token === "string") {
      VAR_CACHE.set(functionToken, token);
    } else if (
      functionToken &&
      typeof functionToken === "object" &&
      token &&
      typeof token === "object"
    ) {
      fillCache(functionToken, token);
    }
  }
}

export type CreateTheme = typeof createThemeBase & {
  var: (declaration: string) => string;
};

export const createTheme: CreateTheme = Object.assign(
  (<Base extends typeof createThemeBase>(...args: Parameters<Base>) => {
    const [className, baseTokens] = (
      createThemeBase as unknown as (
        ...args: Parameters<Base>
      ) => ReturnType<Base>
    )(...args) as readonly [string, Tokens];

    let tokens: Tokens | null = null;

    for (let i = -1; i >= -2; i--) {
      const arg = args.at(i);
      if (arg && typeof arg !== "string") {
        tokens = arg as Tokens;
      }
    }

    if (tokens) {
      fillCache(baseTokens, tokens);
    }

    return [className, baseTokens];
  }) as typeof createThemeBase,
  {
    var: (declaration: string) => VAR_CACHE.get(declaration) ?? declaration,
  },
);
