import { render, waitFor, screen } from "@testing-library/react";

// import { getServer } from "../../test-utils";
import { getServer } from "./test-utils";

import { Success, Error } from "./App.stories";

const server = getServer();

it("renders film cards for each film", async () => {
  server.use(...Success.parameters?.msw.handlers);
  render(<Success />);

  expect(screen.getByText(/fetching star wars data/i)).toBeInTheDocument();

  await waitFor(() => screen.getAllByRole("article"));

  const articleNodes = screen.getAllByRole("article");
  expect(articleNodes).toHaveLength(3);

  const headingNodes = screen.getAllByRole("heading");
  expect(headingNodes[0]).toHaveTextContent("A New Hope");
  expect(headingNodes[1]).toHaveTextContent("Empire Strikes Back");
  expect(headingNodes[2]).toHaveTextContent("Return of the Jedi");
});

it("renders error message if it cannot load the films", async () => {
  server.use(...Error.parameters?.msw.handlers);
  render(<Error />);

  const errorMsgNode = await screen.findByText(
    /could not fetch star wars data/i
  );
  expect(errorMsgNode).toBeInTheDocument();
});
