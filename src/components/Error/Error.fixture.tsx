import { Store, Diners } from "../../types";
import { UI_ERRORS } from "../../constants";

export const mockStore: Store = {
  activeDiner: Diners.diner1,
  order: {},
  error: UI_ERRORS.DUPLICATE_ORDER_ITEM,
};
