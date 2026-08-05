export interface Breakpoint {
  mediaType?: "all" | "print" | "screen" | "speech";
  min?: string;
  max?: string;
}

export function breakpoints<
  Breakpoints extends Record<string, Breakpoint | string>,
>(value: Breakpoints) {
  const not: Record<string, string> = {};
  const result: Record<string, string> = {};

  for (const key of Object.keys(value)) {
    const { mediaType, min, max } =
      typeof value[key] === "string" ? { min: value[key] } : value[key];

    const parts: string[] = [];

    if (mediaType) {
      parts.push(mediaType);
    }

    if (min) {
      parts.push(`(min-width: ${min})`);
    }

    if (max) {
      parts.push(`(max-width: ${max})`);
    }

    result[key] = parts.join(" and ");

    not[key] = mediaType
      ? `not ${result[key]}`
      : result[key]
        ? `not all and ${result[key]}`
        : "not all";
  }

  return { ...result, not } as {
    [BreakpointKey in keyof Breakpoints]: string;
  } & {
    not: { [BreakpointKey in keyof Breakpoints]: string };
  };
}
