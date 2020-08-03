import React from "react";
import mockedAppRoot from "../../../__test-utils__/mockedAppRoot";
import MenuCategory, { MenuItemType } from "./MenuCategory";
import {
  mockMenuCategory,
  mockMenuItems,
  mockUnsplashResponse,
} from "./MenuCategory.fixtures";

import axios from "axios";
import { UnsplashResponse } from "../../../types";
import { waitFor } from "@testing-library/react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MenuCategory", () => {
  it("renders correctly", () => {
    const { container } = mockedAppRoot(
      <MenuCategory
        menuCategory={mockMenuCategory}
        menuItems={mockMenuItems}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("shows the passed category", async () => {
    const { getByText } = mockedAppRoot(
      <MenuCategory
        menuCategory={mockMenuCategory}
        menuItems={mockMenuItems}
      />,
    );

    await waitFor(() => {
      expect(getByText(mockMenuCategory)).toBeInTheDocument();
    });
  });

  it("renders a menu item for each item passed", async () => {
    const resp = { data: mockUnsplashResponse };
    mockedAxios.get.mockResolvedValue(resp);

    const { getAllByTestId, getByText } = mockedAppRoot(
      <MenuCategory
        menuCategory={mockMenuCategory}
        menuItems={mockMenuItems}
      />,
    );

    await waitFor(() => {
      expect(getAllByTestId("menu_item").length).toBe(mockMenuItems.length);
      mockMenuItems.forEach((menuItem: MenuItemType) => {
        expect(getByText(menuItem.name)).toBeInTheDocument();
        expect(getByText(`£ ${menuItem.price.toFixed(2)}`)).toBeInTheDocument();
      });
    });
  });
});
