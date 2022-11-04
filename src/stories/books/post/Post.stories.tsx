import { ComponentStory, ComponentMeta } from "@storybook/react";
import { handlers } from "../../../mocks/handlers";
import { BooksPost } from "./Post";

export default {
  title: "API/本",
  component: BooksPost,
  // argTypes: {
  //   title: { control: "label" },
  // },
} as ComponentMeta<typeof BooksPost>;

const Template: ComponentStory<typeof BooksPost> | any = (args: any) => (
  <BooksPost {...args} />
);

export const Post = Template.bind({});
Post.parameters = {
  msw: {
    handlers,
  },
};
Post.args = {
  // primary: true,
  // label: "Button",
  info: handlers[1].info,
};
