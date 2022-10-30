import { Html, Head, Main, NextScript } from "next/document";

import { siteMeta } from "lib/meta";

export default function Document() {
  const { siteLang } = siteMeta;

  return (
    <Html lang={siteLang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
