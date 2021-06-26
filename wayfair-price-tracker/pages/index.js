import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [inputURL, setInputUrl] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setInputUrl(value);
    console.log(inputURL);
  };

  return (
    <div>
      <h1>Hello!</h1>
      <form action="http://localhost:3001/scraping" method="post">
        <input
          type="text"
          placeholder="Enter URL here"
          name="inputURL"
          onChange={handleChange}
          pattern="https?://www.wayfair.com.+"
        ></input>
        <button type="submit">Click me</button>
      </form>
      <footer>
        <h3>This is the footer</h3>
      </footer>
    </div>
  );
}
