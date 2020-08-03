import "styled-components";
import globalTheme from "./src/globalTheme";

declare module "styled-components" {
  type Theme = typeof globalTheme;
  export interface DefaultTheme extends Theme {}
}
