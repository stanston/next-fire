import { initialize, mswDecorator } from "msw-storybook-addon";

// import "../src/styles.css";
const theme = require("../src/lib/theme");

initialize();

export const parameters = {
  // options: {
  //   storySort: {
  //     order: ["Guides", ["Introduction", "Installation"], "Demos", ["Urql"]],
  //   },
  // },
  // previewTabs: {
  //   "storybook/docs/panel": {
  //     hidden: true,
  //   },
  // },
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: {
    theme,
  },
};

export const decorators = [mswDecorator];
