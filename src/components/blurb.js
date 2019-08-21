import React, { useState } from "react";
import styled from "styled-components";

import RHYTHM from "../lib/rhythm";
import PALETTE from "../lib/palette";

const Blurb = styled.p`
  margin: ${RHYTHM.x6} 0;
  padding: ${RHYTHM.x1};
  background: ${PALETTE.pink};
  cursor: pointer;
`;

const en_content =
  "Hi, I'm Peter. I speak to computers and do some other things too.";
const sv_content =
  "Hej, jag heter Peter. Jag talar till datorer och gör andra saker också.";

export default () => {
  const [lang, setLang] = useState("en");

  const handleClick = () => {
    setLang(lang === "en" ? "sv" : "en");
  };
  return (
    <Blurb onClick={handleClick}>
      {lang === "en" ? en_content : sv_content}
    </Blurb>
  );
};
