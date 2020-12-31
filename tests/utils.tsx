import { ChakraProvider, ColorModeProvider, theme } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { StoreProvider } from "easy-peasy";
import React, { ReactElement } from "react";
import CookieConsent from "react-cookie-consent";
import renderer from "react-test-renderer";
import { Container } from "../src/components/Container";
import { Footer } from "../src/components/Footer";
import { NavBar } from "../src/components/NavBar";
import { globalStore } from "../src/store/store";

const Providers: React.FC<{}> = ({ children }) => {
  return (
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
            {children}
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
              Ten fingers, ten toes, ten blocks, ten cookies! Dont eat them all
              at once!
            </CookieConsent>
          </Container>
        </ColorModeProvider>
      </ChakraProvider>
    </StoreProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export const Snapshot = (ui: ReactElement) => {
  return renderer.create(<Providers>{ui}</Providers>).toJSON();
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
