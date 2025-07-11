import { render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

describe("tab component test", () => {
  test("should render without crashing", () => {
    render(<Tabs />);
  });
});

screen.debug(undefined, Infinity)