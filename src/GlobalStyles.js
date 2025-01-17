import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


:root {
  --color-brand-50: #eef2ff;
  
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 18px;
  font-family: "Inter", serif;

}

body {
 background-color: #e5e5e5;
transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
}


`;

export default GlobalStyles;
