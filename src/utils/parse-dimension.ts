const UNIT_REGEX = /([a-z]+|%)$/i;

export function parseDimension(
  value: `${number}${string}` | `${number}`,
): [number, string] {
  const match = UNIT_REGEX.exec(value);

  if (!match) {
    return [Number(value), ""];
  }

  const [_, unit] = match;
  const number = value.slice(0, -unit.length);

  return [Number(number), unit];
}
