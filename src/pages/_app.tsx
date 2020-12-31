import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import Head from "next/head";
import React, { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { globalStore } from "../store/store";
import theme from "../theme";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: React.ComponentProps<any>;
}) => {
  return (
    <Fragment>
      <Head>
        <title>Block.ten</title>
      </Head>
      <StoreProvider store={globalStore}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <Container
              data-testid="MyApp"
              flexDirection="column"
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <NavBar />
              <Component {...pageProps} />
              <Footer />
              <CookieConsent
                location="bottom"
                buttonText="Only one cookie actually"
                style={{ background: "black" }}
                buttonStyle={{
                  backgroundColor: "gray",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
                expires={150}
              >
                Ten fingers, ten toes, ten blocks, ten cookies! Dont eat them
                all at once!
              </CookieConsent>
            </Container>
          </ColorModeProvider>
        </ChakraProvider>
      </StoreProvider>
    </Fragment>
  );
};

export default MyApp;
