import React from "react";
import Home from "../src/components/home/Home";
import { mockAuthStore } from "./mocks/mockUseAuthStore";
import { mockUsePost } from "./mocks/mockUsePost";
import { render, screen } from "@testing-library/react";

jest.mock("../../src/hooks/PostHook");
jest.mock("../../src/hooks/AuthStoreHook");

mockAuthStore();
mockUsePost();

test("renders home", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Not Found/i);
  expect(linkElement).toBeTruthy();
});
