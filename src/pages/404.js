import React from "react";
import styled from "styled-components";

import PALETTE from "../lib/palette";
import RHYTHM from "../lib/rhythm";
import Layout from "../components/layout";
import SEO from "../components/seo";
import GlobalStyles from "../components/global-styles";

const Heading = styled.h1`
  background-color: ${PALETTE.pink};
  padding: ${RHYTHM.x2};
`;

const Paragraph = styled.p`
  background-color: ${PALETTE.pink};
  padding: ${RHYTHM.x1};
`;

const Link = styled.a`
  color: ${PALETTE.white};
  background-color: ${PALETTE.black};
  padding: ${RHYTHM.x2};

  :hover {
    color: ${PALETTE.pink};
    box-shadow: 0px 0px 0px 1px ${PALETTE.pink};
    text-decoration: none;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO
      title="404: Not found (oopsie)"
      description="Someone linked to a page on Peter's personal cybersphere zone that doesn't exist ¯\_(ツ)_/¯"
    />
    <GlobalStyles />
    <Heading>404: Not found</Heading>
    <Link href="/">
      (I'd recommend retreating to a safe part of the cybersphere.)
    </Link>
    <Paragraph>
      I'm not sure what it is you're looking for, but if you think this should
      exist go shout at me on twitter.
    </Paragraph>
  </Layout>
);

export default NotFoundPage;
