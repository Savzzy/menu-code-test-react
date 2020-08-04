import { Diners, Order, Store } from "../../types";

export const salmonFillet = {
  id: 7,
  name: "Salmon fillet",
  price: 14,
  category: "mains",
};

export const soup = {
  id: 1,
  name: "Soup",
  price: 3,
  category: "starters",
};

export const prawnCocktail = {
  id: 4,
  name: "Prawn cocktail",
  price: 6,
  category: "starters",
};

export const cheescake = {
  id: 11,
  name: "Cheesecake",
  price: 4,
  category: "desserts",
};

export const Pâté = {
  id: 2,
  name: "Pâté",
  price: 4,
  category: "starters",
};

export const mockNewMenuItemId = 20;

export const mockOrder: Order = {
  "diner 1": {
    mainsAdded: true,
    twoItemsAdded: true,
    orderedItems: [
      {
        ...salmonFillet,
      },
      {
        ...cheescake,
      },
    ],
  },
  "diner 2": {
    mainsAdded: true,
    twoItemsAdded: true,
    orderedItems: [
      {
        ...salmonFillet,
      },
      {
        ...soup,
      },
    ],
  },
};

export const mockStore: Store = {
  order: mockOrder,
  activeDiner: Diners.diner1,
};
