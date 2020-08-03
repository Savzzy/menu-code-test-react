import { checkForErrors, canItemBeAdded } from "../ruleSets";
import {
  mockStore,
  cheescake,
  prawnCocktail,
  salmonFillet,
} from "./ruleSets.fixtures";
import { Diners, Store } from "../../types";
import { UI_ERRORS } from "../../constants";

function cloneObject<T>(toBeCloned: T): T {
  return JSON.parse(JSON.stringify(toBeCloned));
}

describe("Tests for rule sets", () => {
  describe("checkForErrors", () => {
    it("should return null, when there are no errors recorded in the store for either dinners", () => {
      const result = checkForErrors(mockStore);

      expect(result).toBeNull();
    });

    it("should show SHOULD_ORDER_FOR_TWO error message, when only one of the diners have placed orders so far", () => {
      const mockStoreClone = cloneObject<Store>(mockStore);
      delete mockStoreClone.order[Diners.diner2];

      const result = checkForErrors(mockStoreClone);

      expect(result).toBe(UI_ERRORS.SHOULD_ORDER_FOR_TWO);
    });

    it("should show diner 1 SHOULD_HAVE_MAINS error message, when diner1's mainAdded flag is false", () => {
      const mockStoreClone = cloneObject<Store>(mockStore);
      mockStoreClone.order[Diners.diner1].mainsAdded = false;

      const result = checkForErrors(mockStoreClone);

      expect(result).toBe(
        UI_ERRORS.SHOULD_HAVE_MAINS.replace("<diner>", Diners.diner1),
      );
    });

    it("should show diner 1 SHOULD_HAVE_TWO_ITEMS error message, when diner1's twoItemsAdded flag is false", () => {
      const mockStoreClone = cloneObject<Store>(mockStore);
      mockStoreClone.order[Diners.diner1].twoItemsAdded = false;

      const result = checkForErrors(mockStoreClone);

      expect(result).toBe(
        UI_ERRORS.SHOULD_HAVE_TWO_ITEMS.replace("<diner>", Diners.diner1),
      );
    });
  });

  describe("canItemBeAdded", () => {
    it("should return DUPLICATE_ORDER_ITEM error message, when the passed menuItemId is part of the order", () => {
      const result = canItemBeAdded(
        salmonFillet.id,
        salmonFillet.name,
        mockStore,
      );

      expect(result.canBeAdded).toBeFalsy();
      expect(result.error).toBe(UI_ERRORS.DUPLICATE_ORDER_ITEM);
    });

    it("should return NO_MORE_CHEESECAKE error message, when trying to add cheescake, when the order already has a cheescake", () => {
      const mockStoreClone = cloneObject<Store>(mockStore);
      mockStoreClone.activeDiner = Diners.diner2;

      const result = canItemBeAdded(
        cheescake.id,
        cheescake.name,
        mockStoreClone,
      );

      expect(result.canBeAdded).toBeFalsy();
      expect(result.error).toBe(UI_ERRORS.NO_MORE_CHEESECAKE);
    });

    it("should return WAITER_RESTRICTION error message, when a diner tries to add prawn cocktail and salmon fillet in the same order", () => {
      const result = canItemBeAdded(
        prawnCocktail.id,
        prawnCocktail.name,
        mockStore,
      );

      expect(result.canBeAdded).toBeFalsy();
      expect(result.error).toBe(UI_ERRORS.WAITER_RESTRICTION);
    });
  });
});
