import { ComponentStory, ComponentMeta } from "@storybook/react";
import { handlers } from "../../../mocks/handlers";
import { AuthLogin } from "./Login";

export default {
  title: "API/認証",
  component: AuthLogin,
} as ComponentMeta<typeof AuthLogin>;

const Template: ComponentStory<typeof AuthLogin> = () => <AuthLogin />;

export const ログイン = Template.bind({});
ログイン.parameters = {
  msw: {
    handlers,
  },
};
