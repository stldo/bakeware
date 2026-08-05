import type { Paths } from "type-fest";

const FORMULAS: {
  equalTemperament: (step: number) => number;
  justIntonation: (step: number) => number;
  metallicMean: (step: number) => number;
  plasticRatio: () => number;
  superGoldenRatio: () => number;
} = {
  equalTemperament: (step: number) => 2 ** (step / 12),

  justIntonation: (step: number) => {
    const octave = Math.floor(step / 12);
    const remainder = ((step % 12) + 12) % 12;

    const ratios = [
      1,
      16 / 15,
      9 / 8,
      6 / 5,
      5 / 4,
      4 / 3,
      45 / 32,
      3 / 2,
      8 / 5,
      5 / 3,
      9 / 5,
      15 / 8,
    ];

    return ratios[remainder] * 2 ** octave;
  },

  metallicMean: (step: number) => (step + Math.sqrt(step ** 2 + 4)) / 2,

  plasticRatio: () => {
    const a = Math.sqrt(69) / 18;

    return Math.cbrt(0.5 + a) + Math.cbrt(0.5 - a);
  },

  superGoldenRatio: () => {
    const a = (29 + 3 * Math.sqrt(93)) / 2;
    const b = (29 - 3 * Math.sqrt(93)) / 2;

    return (1 + Math.cbrt(a) + Math.cbrt(b)) / 3;
  },
};

const SCALES: {
  natural: {
    justIntonation: typeof FORMULAS.justIntonation;
    minorSecond: number;
    majorSecond: number;
    minorThird: number;
    majorThird: number;
    perfectFourth: number;
    augmentedFourth: number;
    perfectFifth: number;
    minorSixth: number;
    majorSixth: number;
    minorSeventh: number;
    majorSeventh: number;
    perfectOctave: number;
  };
  mathematical: {
    equalTemperament: typeof FORMULAS.equalTemperament;
    minorSecond: number;
    majorSecond: number;
    minorThird: number;
    majorThird: number;
    perfectFourth: number;
    augmentedFourth: number;
    perfectFifth: number;
    minorSixth: number;
    majorSixth: number;
    minorSeventh: number;
    majorSeventh: number;
    perfectOctave: number;
  };
  geometrical: {
    metallicMean: typeof FORMULAS.metallicMean;
    goldenRatio: number;
    silverRatio: number;
    bronzeRatio: number;
    plasticRatio: number;
    industrial: number;
    superGoldenRatio: number;
    vesicaPiscis: number;
    eulersNumber: number;
  };
} = {
  natural: {
    justIntonation: FORMULAS.justIntonation,
    minorSecond: FORMULAS.justIntonation(1),
    majorSecond: FORMULAS.justIntonation(2),
    minorThird: FORMULAS.justIntonation(3),
    majorThird: FORMULAS.justIntonation(4),
    perfectFourth: FORMULAS.justIntonation(5),
    augmentedFourth: FORMULAS.justIntonation(6),
    perfectFifth: FORMULAS.justIntonation(7),
    minorSixth: FORMULAS.justIntonation(8),
    majorSixth: FORMULAS.justIntonation(9),
    minorSeventh: FORMULAS.justIntonation(10),
    majorSeventh: FORMULAS.justIntonation(11),
    perfectOctave: FORMULAS.justIntonation(12),
  },

  mathematical: {
    equalTemperament: FORMULAS.equalTemperament,
    minorSecond: FORMULAS.equalTemperament(1),
    majorSecond: FORMULAS.equalTemperament(2),
    minorThird: FORMULAS.equalTemperament(3),
    majorThird: FORMULAS.equalTemperament(4),
    perfectFourth: FORMULAS.equalTemperament(5),
    augmentedFourth: FORMULAS.equalTemperament(6),
    perfectFifth: FORMULAS.equalTemperament(7),
    minorSixth: FORMULAS.equalTemperament(8),
    majorSixth: FORMULAS.equalTemperament(9),
    minorSeventh: FORMULAS.equalTemperament(10),
    majorSeventh: FORMULAS.equalTemperament(11),
    perfectOctave: FORMULAS.equalTemperament(12),
  },

  geometrical: {
    metallicMean: FORMULAS.metallicMean,
    goldenRatio: FORMULAS.metallicMean(1),
    silverRatio: FORMULAS.metallicMean(2),
    bronzeRatio: FORMULAS.metallicMean(3),
    plasticRatio: FORMULAS.plasticRatio(),
    industrial: Math.SQRT2,
    superGoldenRatio: FORMULAS.superGoldenRatio(),
    vesicaPiscis: Math.sqrt(3),
    eulersNumber: Math.E,
  },
};

export function typeScale<Unit extends string = "rem">(
  scale: Paths<typeof SCALES, { depth: 1 }> | number,
  unit?: Unit,
): {
  fontSize: (step: number) => `${number}${Unit}`;
} {
  let formula: ((step: number) => number) | number;

  if (typeof scale === "number") {
    formula = scale;
  } else {
    const path = scale.split(".");
    const category = SCALES[path[0] as keyof typeof SCALES];
    formula = category[path[1] as keyof typeof category] as
      | ((step: number) => number)
      | number;
  }

  return {
    fontSize: (step) => {
      const value =
        typeof formula === "number" ? formula ** step : formula(step);
      return `${value}${unit ?? ("rem" as Unit)}`;
    },
  };
}
