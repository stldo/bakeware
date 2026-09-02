import {
  type GlobalStylesLayerRules,
  globalStyles,
} from "#/core/global-styles.ts";

const STYLES: GlobalStylesLayerRules = {
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  "*": {
    margin: 0,
  },

  html: {
    blockSize: "100%",
    interpolateSize: "allow-keywords",
    scrollbarGutter: "stable",
    tabSize: 4,
    textSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%",
  },

  "html.translated-rtl": {
    direction: "rtl" /* Apply correct direction for Google Translate results */,
  },

  body: {
    minBlockSize: "100%",
  },

  "dir, fieldset, legend, menu, td, th": {
    padding: 0,
  },

  "fieldset, iframe": {
    border: "none",
  },

  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
  },

  "b, dt, h1, h2, h3, h4, h5, h6, legend, optgroup, strong, summary, th": {
    fontWeight: "bolder",
  },

  "h1, h2, h3, h4, h5, h6": {
    fontVariantNumeric: "lining-nums",
    textWrap: "balance",
  },

  p: {
    fontVariantNumeric: "proportional-nums",
    textWrap: "pretty",
  },

  "ul, ol, dl": {
    paddingInlineStart: "2.5em",
  },

  "code, kbd, pre, samp": {
    fontSize: "1em",
  },

  code: {
    fontVariantNumeric: "slashed-zero",
  },

  "math, table, time": {
    fontVariantNumeric: "tabular-nums lining-nums slashed-zero",
  },

  table: {
    borderCollapse: "collapse",
    borderColor: "currentcolor",
  },

  summary: {
    display: "list-item",
  },

  "audio, canvas, iframe, img, picture, svg, video": {
    maxInlineSize: "100%",
  },

  "audio, canvas, iframe, img, video": {
    blockSize: "auto",
    display: "block",
  },

  "canvas, iframe, img, svg, video": {
    aspectRatio: "attr(width) / attr(height)",
  },

  svg: {
    display: "inline-block",
  },

  "svg:not([fill])": {
    fill: "currentcolor",
  },

  "button, input, optgroup, select, textarea": {
    color: "inherit",
    font: "inherit",
    letterSpacing: "inherit",
  },

  "button, [type='button'], [type='reset'], [type='submit']": {
    WebkitAppearance: "button",
    cursor: "pointer",
  },

  textarea: {
    resize: "block",
  },

  "[type='search']": {
    WebkitAppearance: "textfield",
    outlineOffset: "-2px",
  },

  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    blockSize: "auto",
  },

  "::-webkit-search-decoration": {
    WebkitAppearance: "none",
  },

  "::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    font: "inherit",
  },

  "address, cite, dfn, em, i, mi, var": {
    fontStyle: "italic",
  },

  progress: {
    verticalAlign: "baseline",
  },

  small: {
    fontSize: "80%",
  },

  "sup, sub": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
  },

  sub: {
    insetBlockEnd: "-0.25em",
  },

  sup: {
    insetBlockStart: "-0.5em",
  },
};

export function normalize(layer?: string): void {
  if (layer === undefined) {
    globalStyles(STYLES);
  } else {
    globalStyles({ "@layer": { [layer]: STYLES } });
  }
}
