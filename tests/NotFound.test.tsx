import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../src/components/404/NotFound";

test("renders learn react link", () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/Not Found/i);
  expect(linkElement).toBeTruthy();
});
