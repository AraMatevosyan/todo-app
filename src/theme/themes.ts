export type Theme = {
  header: string;
  background: string;
  table: {
    header: string;
  };
  button: {
    primary: string;
    secondary: string;
  };
};

interface Themes {
  light: Theme;
  dark: Theme;
}

export const themes: Themes = {
  light: {
    header: "#2E8BC0",
    background: "#eeeeee",
    table: {
      header: "#B1D4E0",
    },
    button: {
      primary: "#2E8BC0",
      secondary: "#5b6e82",
    },
  },
  dark: {
    header: "#0C2D48",
    background: "#222222",
    table: {
      header: "#145DA0",
    },
    button: {
      primary: "#2E8BC0",
      secondary: "#5b6e82",
    },
  },
};
