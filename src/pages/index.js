import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import BREAKPOINTS from "../lib/breakpoints";
import PALETTE from "../lib/palette";
import RHYTHM from "../lib/rhythm";
import SEO from "../components/seo";
import Face from "../components/face";
import Nav from "../components/nav";
import Blurb from "../components/blurb";
import dmSansMediumFontBinaryURL from "../fonts/dm-sans-medium.woff2";
import dmSansBoldFontBinaryURL from "../fonts/dm-sans-bold.woff2";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'DM Sans';
    font-display: block;
    font-weight: 500;
    src: url(${dmSansMediumFontBinaryURL}) format('woff2');
  }

  @font-face {
    font-family: 'DM Sans';
    font-weight: 700;
    font-display: block;
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

const Container = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: ${RHYTHM.x6};

  @media (min-width: ${BREAKPOINTS.small}) {
    justify-content: center;
    align-items: flex-end;
  }
`;

const IndexPage = () => (
  <Container>
    <SEO />
    <GlobalStyle />
    <Face />
    <Nav />
    <Blurb />
  </Container>
);

export default IndexPage;
