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

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body {
    overflow: hidden;
  }

  body {
    font-family: 'DM Sans', sans-serif;
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
    <GlobalStyle />
    <SEO />
    <Face />
    <Nav />
    <Blurb />
  </Container>
);

export default IndexPage;
