import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import ProductDetails from "./productdetails";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log(event.currentTarget.elements.inputURL.value);
    axios
      .post("http://localhost:3001/api/scraping", {
        inputURL: event.currentTarget.elements.inputURL.value,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <h1>hunterhunterhunter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL here"
          name="inputURL"
          pattern="https?://www.wayfair.com.+"
        ></input>
        <button type="submit">Click me</button>
      </form>
      <ProductDetails loading={loading} data={data} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
