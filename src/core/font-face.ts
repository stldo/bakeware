import { fontFace as fontFaceBase } from "@vanilla-extract/css";
import type { Arrayable, IterableElement, RequireAtLeastOne } from "type-fest";
import urlSlug from "url-slug";

function getFontFaceSrc(src: FontFaceSrc): string[] {
  const { tech, ...formats } = src;

  const result: string[] = [];

  for (const format of Object.keys(formats)) {
    let values = formats[format as keyof typeof formats];

    if (values === undefined) {
      continue;
    }

    if (!Array.isArray(values)) {
      values = [values];
    }

    for (const value of values) {
      let fontFaceSrcTech: string | undefined;
      let fontFaceSrcUrl: string;

      if (typeof value === "string") {
        fontFaceSrcUrl = value;
      } else {
        if ("tech" in value && value.tech) {
          fontFaceSrcTech = value.tech;
        }
        fontFaceSrcUrl = value.url;
      }

      if (format === "local") {
        result.push(`local("${fontFaceSrcUrl}")`);
        continue;
      }

      if (fontFaceSrcTech === undefined && tech) {
        fontFaceSrcTech = tech;
      }

      let fontFaceSrc = `url("${fontFaceSrcUrl}") format(${urlSlug(format)})`;

      if (fontFaceSrcTech) {
        fontFaceSrc += ` tech("${urlSlug(fontFaceSrcTech)}")`;
      }

      result.push(fontFaceSrc);
    }
  }

  return result;
}

export type FontFaceRule = Omit<
  IterableElement<Parameters<typeof fontFaceBase>[0]>,
  "src"
> & {
  src: Arrayable<string> | FontFaceSrc;
};

export type FontFaceSrc = FontFaceSrcDefinitions & { tech?: FontFaceSrcTech };

export type FontFaceSrcDefinition =
  | { tech?: FontFaceSrcTech; url: string }
  | string;

export type FontFaceSrcDefinitionLocal = { url: string } | string;

export type FontFaceSrcDefinitions = RequireAtLeastOne<
  {
    [Key in FontFaceSrcFormat]?: Arrayable<FontFaceSrcDefinition>;
  } & {
    local?: Arrayable<FontFaceSrcDefinitionLocal>;
  }
>;

export type FontFaceSrcFormat =
  | "collection"
  | "embeddedOpentype"
  | "opentype"
  | "svg"
  | "truetype"
  | "woff"
  | "woff2";

export type FontFaceSrcTech =
  | "colorCbdt"
  | "colorColrv0"
  | "colorColrv1"
  | "colorSbix"
  | "colorSvg"
  | "featuresAat"
  | "featuresGraphite"
  | "featuresOpentype"
  | "incremental"
  | "palettes"
  | "variations";

export function fontFace(
  rule: FontFaceRule | FontFaceRule[],
  debugId?: string,
): string {
  const rules = Array.isArray(rule) ? rule : [rule];

  return fontFaceBase(
    rules.map(({ src, ...rest }) => {
      if (typeof src !== "string" && !Array.isArray(src)) {
        src = getFontFaceSrc(src);
      }

      return { ...rest, src: typeof src === "string" ? src : src.join(",") };
    }),
    debugId,
  );
}
