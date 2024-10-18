import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

function blocked({ Component, pageProps }) {
  return <p>no</p>;
}

export default blocked
