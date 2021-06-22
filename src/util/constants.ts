export const ONBOARDING_STATUS_KEY = "onboarding";
export const UNCATEGORISED_TODO_PROJID = "uncategorised";

export type ShadowHeight = 1 | 2 | 4 | 6 | 8 | 9 | 12 | 16 | 24;
export type Theme = {
  primary: string;
  light: string;
  dark: string;
  gradientFade: string;
  text: { primary: string; light: string; dark: string };
};

export enum SageTheme {
  Mint = "Mint",
  Lilac = "Lilac",
}

const THEME_MINT: Theme = {
  primary: "#64FFDA",
  light: "#9effff",
  dark: "#14cba8",
  gradientFade: "#A7FFEB",
  text: { primary: "black", light: "black", dark: "black" },
};

const THEME_LILAC: Theme = {
  primary: "#b388ff",
  light: "#e7b9ff",
  dark: "#805acb",
  gradientFade: "#caacff",
  text: { primary: "black", light: "black", dark: "white" },
};

export const SAGE_THEME_LIST = { Mint: THEME_MINT, Lilac: THEME_LILAC };
export const ERROR_COLOR = "#B00020";
