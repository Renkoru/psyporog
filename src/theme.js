// const colors1 = {
//   primary: '#30323d',
//   primaryLight: '#595b67',
//   primaryDark: '#080a17',
//   secondary: '#bc339c',
//   secondaryLight: '#f168cd',
//   secondaryDark: '#88006d',
//   error: '#b00020',
// };

const colors2 = {
  primary: "#81C784",
  primaryLight: "#AED581",
  primaryDark: "#4DB6AC",
  secondary: "#4DB6AC",
  secondaryLight: "#DCE775",
  secondaryDark: "#4DD0E1",
  error: "#E57373",
  delimeter: "#f0f0f0",
};

const colors = colors2;
export default {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    ...colors,
    surface: "white",
    textonp: "white",
    textons: "black",
    bitbucket: "#0747a6",
    grey: "#90A4AE",
  },
  radii: {
    default: 4,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  buttons: {
    secondary: {
      color: "textons",
      bg: "secondary",
      ":hover": {
        cursor: "pointer",
        bg: "secondaryDark",
      },
      ":disabled": {
        cursor: "not-allowed",
        bg: "black",
      },
    },
    primary: {
      color: "textonp",
      bg: "primaryLight",
      ":hover": {
        cursor: "pointer",
      },
      ":disabled": {
        cursor: "not-allowed",
        bg: "black",
      },
    },
    outline: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 2px",

      ":disabled": {
        cursor: "not-allowed",
        bg: "black",
      },
    },
  },
  variants: {
    card: {
      p: 3,
      borderRadius: "default",
      bg: "surface",
      boxShadow: "card",
    },
    badge: {
      color: "surface",
      bg: "primary",
      p: 1,
      borderRadius: "default",
    },
  },
};
