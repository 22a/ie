import React from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

import RHYTHM from "../lib/rhythm";
import BREAKPOINTS from "../lib/breakpoints";
import FaceSvg from "../images/face.inline.svg";

const rotationScalar = 0.1;

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

export default class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.updateRotationWheel = this.updateRotationWheel.bind(this);
    this.state = { rotationX: 0, rotationY: 0 };
  }
  componentDidMount() {
    window.addEventListener("wheel", throttle(this.updateRotationWheel, 10), {
      trailing: true,
      leading: true
    });
  }
  componentWillUnmount() {
    window.removeEventListener("wheel", this.updateRotationWheel);
  }
  updateRotationWheel(e) {
    this.setState({
      rotationX: this.state.rotationX + e.deltaY * rotationScalar,
      rotationY: this.state.rotationY + e.deltaX * rotationScalar
    });
  }

  render() {
    return (
      <Face
        role="img"
        id={`${this.state.rotation}`}
        style={{
          transform: `rotateY(${this.state.rotationY}deg) rotateX(${this.state.rotationX}deg)`
        }}
      />
    );
  }
}
