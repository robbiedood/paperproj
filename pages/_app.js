import Head from 'next/head';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Auto Refreshing Currency Conversion</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="preconnect" href="https://stijndv.com" />
      <meta name="description" content="Let's convert ETH to Fiat, make wealthy with cryptocurrency."/>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
