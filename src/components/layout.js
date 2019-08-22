import React from "react";
import styled from "styled-components";

import BREAKPOINTS from "../lib/breakpoints";
import RHYTHM from "../lib/rhythm";

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

export default ({ children }) => <Container>{children}</Container>;
