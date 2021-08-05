import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import ProductDetails from "./productdetails";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setProductDetails(true);
    setLoading(true);
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
      <Instructions id="instructions">
        <h3>Find a product on Wayfair's website and paste the URL into the input below</h3>
      </Instructions>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Paste URL here"
          name="inputURL"
          id="inputURL"
          pattern="https?://www.wayfair.c.+"
          aria-describedby="instructions"
          required
          aria-required
        ></Input>
        <Label for="inputURL">Input URL</Label>
        <Button type="submit">Click me</Button>
      </Form>
      {productDetails ? <ProductDetails loading={loading} data={data} /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 10px;
  font-family: "Noto Sans JP", sans-serif;
`;

const Instructions = styled.div`
  font-size: 0.8rem;
  padding: 0 10% 20px 10%;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Form = styled.form`
  height: 20px;
  font-family: "Noto Sans JP", sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  font-family: "Noto Sans JP", sans-serif;
`;

const Label = styled.label`
  display: none;
`;

const Button = styled.button`
  padding: 10px;
  margin-left: 10px;
  font-family: "Noto Sans JP", sans-serif;
`;

export default Home;
