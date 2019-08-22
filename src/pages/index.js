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

  body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    background: ${PALETTE.red};
  }
`;

const Container = styled.main`
  box-sizing: border-box;
  height: 100vh;
  padding: ${RHYTHM.x6};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.small}) {
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
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
