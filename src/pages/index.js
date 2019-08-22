import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import GlobalStyles from "../components/global-styles";
import Face from "../components/face";
import Nav from "../components/nav";
import Blurb from "../components/blurb";

const IndexPage = () => (
  <Layout>
    <SEO />
    <GlobalStyles />
    <Face />
    <Nav />
    <Blurb />
  </Layout>
);

export default IndexPage;
