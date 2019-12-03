import React from "react";
import Helmet from "react-helmet";

import ogImagePath from "../images/og-image.png";

const SITE_URL = `https://22a.ie`;

const META = {
  title: `22a · Peter Meehan`,
  description: `Peter's personal cybersphere zone.`,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${ogImagePath}`,
  twitterUsername: `@22a`
};

export default ({ title = META.title, description = META.description }) => {
  return (
    <Helmet
      htmlAttributes={{ lang: `en` }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description
        },
        {
          name: `image`,
          content: META.image
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: description
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:image`,
          content: META.image
        },
        {
          property: `og:image:width`,
          content: `1200`
        },
        {
          property: `og:image:height`,
          content: `630`
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:creator`,
          content: META.twitterUsername
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: description
        },
        {
          name: `twitter:image`,
          content: META.image
        }
      ]}
    />
  );
};
