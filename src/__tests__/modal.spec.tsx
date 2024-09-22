import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "../pages/(signup)/modal";

test("Page", () => {
  render(<Modal />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Modal" }),
  ).toBeDefined();
});
