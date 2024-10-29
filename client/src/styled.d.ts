import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      navbar: string;
      border: string;
    };
  }
}
