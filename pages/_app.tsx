import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';
import { useRouter } from 'next/router';
// import { defineChain } from "viem";

import {
  bscTestnet,
  // chiliz,
  spicy,
} from "viem/chains";

// const chilizTest = defineChain({
//   id: 88882,
//   name: "Chiliz Spicy Testnet",
//   network: "chiliz",
//   nativeCurrency: {
//     decimals: 18,
//     name: "CHZ",
//     symbol: "CHZ",
//   },
//   rpcUrls: {
//     public: { http: ["https://spicy-rpc.chiliz.com/"] },
//     default: { http: ["https://spicy-rpc.chiliz.com/"] },
//   },
//   blockExplorers: {
//     etherscan: { name: "ChilizScan", url: "https://testnet.chiliscan.com/" },
//     default: { name: "ChilizScan", url: "https://testnet.chiliscan.com/" },
//   },
//   contracts: {
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//       blockCreated: 8080847,
//     },
//   },
// });

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <link rel="preload" href="/fonts/AdelleSans-Regular.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/AdelleSans-Regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/AdelleSans-Semibold.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/AdelleSans-Semibold.woff2" as="font" crossOrigin="" />

        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.json" />

        <title>Privy Auth Starter</title>
        <meta name="description" content="Privy Auth Starter" />
      </Head>
      <PrivyProvider
        appId="clnju0ny30cfhl60frmw59ker"
        config={{
          supportedChains: [spicy, bscTestnet],
          customAuth: {
            isLoading: false,
            // getCustomAccessToken: async () => "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmb290YmFsbGNyYWZ0LmlvIiwiZXhwIjoxNzQwNjcyMDAwLCJzdWIiOiI4NjAwMDAwMDAwMDAwMDAwNTciLCJhdWQiOiJmb290YmFsbGNyYWZ0LmlvIiwibmJmIjoxNzA5MTg2NjgyLCJpYXQiOjE3MDkxODY2ODV9.KLO_ZKkqumPdWgzqBd4iJdjxTYjTzJE73ph-84EiNudvC35zp2wlmlUSDKbdVEm9nY_y78rRUXbsilSJOc0YCJwrifxYWqmbJr90FguAKL9HZFBeAa26XNpfDN9LTKTu0xRLQNYJL5Dp2pdWWFjz7Ju2dAdcH2uwZ_Pko84K66B9dp5qt5ljUmySLVFKS0NRRSI_63aN4Qy8tP5YBhp3yfYY7Ky5oLXLMXjjWeaEnXde80VZtmaxdicYJqVNjeQ9o-A5M7pAeaOtdcGSJlRS7U7oLfYOkGIIugmJAcC5ROhvXaodNblCEb2lFmjgIWhpDtZ7XUgHn-TcztaebVX-Qg",
            getCustomAccessToken: async () => "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDU2MjQwNDYwZmU0MjEyYjA3MmFmNDUiLCJuYmYiOjE3MTE4NTU0NDksImV4cCI6MTcxMjExNDk0OSwiaWF0IjoxNzExODU1NDQ5fQ.Hn4I9JsfM4e6tOXuaIQYyC5QbjcT9dld4GRtLJtcMmgGGRwlBRahBHp0uMDxrT9fV4ZuGFRnp4yICMm8UgrF2cGOd9Oa3Eq0J-N5iMVbZjwBLLm8q4B0go-gUMmhfKNtRScUoWv52XrOJpbe169F-arPh65CNh6xuL1NkVl5WcnMYMxDiccK93Xjapk1ufEx5z05-lLEUoJ3zp21U_--1iGbPDkyTAdzh_r-FjH-IYhsd_zkquEDUhwds8HLh_kEfe7VZ7TD1J3De0cI7fSVnQSeNKY3yfJpLIc7ihW1F9Aii7uh_5VoDBvlrOBDdzxE6rohupKK4LRpHtmL1bCQnQ",
          },
        }}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </div>
  );
}

export default MyApp;
