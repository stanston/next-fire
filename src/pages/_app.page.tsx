import type { AppProps } from "next/app";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import { useAuth } from "hooks/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "lib/theme";
import Layout from "components/common/Layout";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// function MyApp({ Component, pageProps }: AppProps) {
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useAuth();

  return (
    <ChakraProvider theme={theme}>
      {/* <Layout> */}
      {/* <Component {...pageProps} /> */}
      {!Component.getLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
      {/* </Layout> */}
    </ChakraProvider>
  );
}

export default MyApp;
