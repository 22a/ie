import React from "react";
import styled from "styled-components";

import RHYTHM from "../lib/rhythm";
import PALETTE from "../lib/palette";
import NAV_LINKS from "../lib/nav-links";

const Nav = styled.nav`
  margin-top: ${RHYTHM.x6};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: right;
`;

const Entry = styled.li`
  width: 100%;
  min-width: 300px;
  margin-bottom: ${RHYTHM.x2};
  background: ${PALETTE.pink};
`;

const Link = styled.a`
  display: inline-block;
  box-sizing: border-box;
  width: calc(100% - ${RHYTHM.x2});
  padding: ${RHYTHM.x1};
  color: ${PALETTE.black};
  user-select: none;
  transition: transform 50ms linear;

  ${Entry}:hover &,
  :focus {
    text-decoration: overline;
    text-transform: uppercase;
    transform: translateX(-${RHYTHM.x1});
  }
`;

export default () => (
  <Nav>
    <List>
      {NAV_LINKS.map(link => (
        <Entry key={link.url}>
          <Link href={link.url} target="_blank" rel="noopener">
            {link.text}
          </Link>
        </Entry>
      ))}
    </List>
  </Nav>
);
