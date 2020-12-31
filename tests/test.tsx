import { jest } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Index from "../src/pages/index";
import { render, Snapshot } from "./utils";
jest.useFakeTimers();

// throws "TypeError: f is not a function" but succeeds
// https://eosio.stackexchange.com/questions/4440/typeerror-f-is-not-a-function
// found link above but jsdom is the test env, not node

describe("HomePage", () => {
  // afterAll(cleanup);
  const { getByTestId } = render(<Index />);
  it("renders without crashing", () => {
    expect(getByTestId("MyApp")).toBeInTheDocument();
    const tree = Snapshot(<Index />);
    console.log(tree);
  });
  it("renders NavBar", () => {
    expect(getByTestId("NavBar")).toBeInTheDocument();
  });
  it("renders Footer", () => {
    expect(getByTestId("Footer")).toBeInTheDocument();
  });
  it("renders DarkModeSwitch", () => {
    expect(getByTestId("DarkModeSwitch")).toBeInTheDocument();
  });
  it("renders RawModal", () => {
    expect(getByTestId("RawModal")).toBeInTheDocument();
  });
});
