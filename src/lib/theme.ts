// Docs: https://chakra-ui.com/docs/styled-system/theme
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // primary: "cyan.600",
    primary: "#00A3C4",
    // secondary: "#B83280",
  },
  // fontSizes: {
  // md: "16px",
  // },
  breakpoints: {
    // sm: "30em",
    // md: "48em",
    md: "768px",
    // lg: "62em",
    lg: "992px", // px指定すると優先順位が変わるようなので指定する必要あり？
    // xl: "80em",
    // "2xl": "96em",
  },
  styles: {
    global: {
      body: {
        color: "gray.800",
        backgroundColor: "#DFDBE5",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      // "#__next": {
      // minHeight: "100vh",
      // },
      ul: {
        listStyleType: "none",
      },
      "a:hover": {
        textDecoration: "none !important",
      },
    },
  },
});

export default theme;
