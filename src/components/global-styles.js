import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import PALETTE from "../lib/palette";
import dmSansMediumFontBinaryURL from "../fonts/dm-sans-medium.woff2";
import dmSansBoldFontBinaryURL from "../fonts/dm-sans-bold.woff2";

export default createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'DM Sans';
    font-weight: 500;
    src: url(${dmSansMediumFontBinaryURL}) format('woff2');
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 700;
    src: url(${dmSansBoldFontBinaryURL}) format('woff2');
  }

  html, body {
    overflow: hidden;
  }

  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 500;
    background: ${PALETTE.red};
  }
`;
