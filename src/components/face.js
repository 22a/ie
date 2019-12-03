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
  transition: transform 100ms linear;

  & > path {
    transition: transform 100ms linear;

    :hover {
      transform: perspective(10cm) rotateX(-5deg) rotateY(10deg) translateZ(1cm);
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
    this.updateRotationOrientation = this.updateRotationOrientation.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.state = { xRotation: 0, yRotation: 0, zRotation: 0 };
  }
  componentDidMount() {
    window.addEventListener("wheel", throttle(this.updateRotationWheel, 10), {
      trailing: true,
      leading: true
    });
    window.addEventListener(
      "deviceorientation",
      throttle(this.updateRotationOrientation, 10),
      {
        trailing: true,
        leading: true
      }
    );
    document
      .querySelector("main")
      .addEventListener("mousemove", throttle(this.onMouseMove, 10), {
        trailing: true,
        leading: true
      });
    window.addEventListener("touchmove", throttle(this.onTouchMove, 10), {
      trailing: true,
      leading: true
    });
  }
  updateRotationWheel(e) {
    this.setState({
      xRotation: Math.round(this.state.xRotation + e.deltaY * rotationScalar),
      yRotation: Math.round(this.state.yRotation + e.deltaX * rotationScalar)
    });
  }
  onMouseMove(e) {
    this.setState({
      xRotation: Math.round(-e.offsetY),
      yRotation: Math.round(-e.offsetX)
    });
  }
  onTouchMove({ touches: [touch] }) {
    this.setState({
      xRotation: Math.round(-touch.pageY),
      yRotation: Math.round(-touch.pageX)
    });
  }
  updateRotationOrientation(e) {
    // alpha: rotation around z-axis
    // -180 -> 180
    const normalisedAlpha = Math.round(e.alpha);
    // beta: front back motion
    // 0 -> 360
    const normalisedBeta = Math.round(e.beta * -1);
    // gamma: left to right
    // -90 -> 90
    const normalisedGamma = Math.round(e.gamma * -1);

    this.setState({
      zRotation: normalisedAlpha,
      xRotation: normalisedBeta,
      yRotation: normalisedGamma
    });
  }

  render() {
    return (
      <Face
        role="img"
        style={{
          transform: `rotateX(${this.state.xRotation}deg) rotateY(${this.state.yRotation}deg) rotateZ(${this.state.zRotation}deg)`
        }}
      />
    );
  }
}
