import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
