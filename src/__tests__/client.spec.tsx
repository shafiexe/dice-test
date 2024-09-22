import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Client from "../pages/(signup)/client";

test("Page", () => {
  render(<Client />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Client" }),
  ).toBeDefined();
});
