import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <div>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}

export default App;
