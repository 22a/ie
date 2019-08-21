import React from "react";
import styled from "styled-components";

import RHYTHM from "../lib/rhythm";
import BREAKPOINTS from "../lib/breakpoints";
import FaceSvg from "../images/face.inline.svg";

const Face = styled(FaceSvg)`
  width: calc(100vw - 2 * ${RHYTHM.x6});
  height: calc(100vw - 2 * ${RHYTHM.x6});

  & > path {
    transition: transform 50ms linear;

    :hover {
      transform: perspective(10cm) rotateX(-5deg) rotateY(10deg);
    }
  }

  @media (min-width: ${BREAKPOINTS.small}) {
    width: 300px;
    height: 300px;
  }
`;

export default () => <Face role="img" />;
