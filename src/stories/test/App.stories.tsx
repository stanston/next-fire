import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { App } from "./App";

export default {
  title: "API/Sample",
  component: App,
} as ComponentMeta<typeof App>;

export const Default = () => <App />;

const Template: ComponentStory<typeof App> = () => <App />;

const films = [
  {
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: `(Mocked) Rebel spaceships have won their first victory against the evil Galactic Empire.`,
  },
  {
    title: "Empire Strikes Back",
    episode_id: 5,
    opening_crawl: `(Mocked) Imperial troops are pursuing the Rebel forces across the galaxy.`,
  },
  {
    title: "Return of the Jedi",
    episode_id: 6,
    opening_crawl: `(Mocked) Luke Skywalker has returned to his home planet of Tatooine to rescue Han Solo.`,
  },
];

export const Success = Template.bind({});
Success.parameters = {
  msw: {
    handlers: [
      rest.get("https://swapi.dev/api/films/", (_req, res, ctx) => {
        return res(
          ctx.json({
            results: films,
          })
        );
      }),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get("https://swapi.dev/api/films/", (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(403));
      }),
    ],
  },
};
