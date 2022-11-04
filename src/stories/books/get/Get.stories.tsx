import { ComponentStory, ComponentMeta } from "@storybook/react";
import { handlers } from "../../../mocks/handlers";
import { BooksGet } from "./Get";

export default {
  title: "API/本",
  component: BooksGet,
} as ComponentMeta<typeof BooksGet>;

const Template: ComponentStory<typeof BooksGet> | any = (args: any) => (
  <BooksGet {...args} />
);

export const Get = Template.bind({});
Get.parameters = {
  msw: {
    handlers,
  },
};
Get.args = {
  info: handlers[0].info,
  // books: handlers[0].resolver,
};
