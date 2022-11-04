import { ComponentStory, ComponentMeta } from "@storybook/react";
import { handlers } from "../../../mocks/handlers";
import { AuthLogout } from "./Logout";

export default {
  title: "API/認証",
  component: AuthLogout,
} as ComponentMeta<typeof AuthLogout>;

const Template: ComponentStory<typeof AuthLogout> = () => <AuthLogout />;

export const ログアウト = Template.bind({});
ログアウト.parameters = {
  msw: {
    handlers,
  },
};
