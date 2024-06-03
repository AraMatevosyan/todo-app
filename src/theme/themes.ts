export type Theme = {
  header: string;
  background: string;
};

interface Themes {
  light: Theme;
  dark: Theme;
}

export const themes: Themes = {
  light: {
    header: "#2E8BC0",
    background: "#eeeeee",
  },
  dark: {
    header: "#0C2D48",
    background: "#222222",
  },
};
