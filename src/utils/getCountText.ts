export type DigitCountText = {
  digits: number[];
  text: string;
};

export type DigitCountTextList = DigitCountText[];

export interface CountForms {
  first: string;
  second: string;
  third: string;
}

export const getCountTextsTemp = ({
  first,
  second,
  third,
}: CountForms): DigitCountTextList => [
  { digits: [1], text: first },
  { digits: [2, 3, 4], text: second },
  { digits: [5, 6, 7, 8, 9, 0, 11, 12, 13, 14], text: third },
];

export const getCountText = (count: number, countForms: CountForms) => {
  const countTexts = getCountTextsTemp(countForms);

  const countText = countTexts.reverse().find(({ digits }) => {
    return digits.some((digit) => {
      return String(count).endsWith(String(digit));
    });
  });

  return countText?.text || null;
};
