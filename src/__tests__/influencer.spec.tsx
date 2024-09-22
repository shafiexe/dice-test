import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Influencer from "../pages/(signup)/influencer";

test("Page", () => {
  render(<Influencer />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Influencer" }),
  ).toBeDefined();
});
