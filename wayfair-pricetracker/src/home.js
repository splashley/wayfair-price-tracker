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
    console.log("value", event.currentTarget.elements.inputURL.value);
    setProductDetails(true)
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
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter URL here"
          name="inputURL"
          pattern="https?://www.wayfair.c.+"
        ></Input>
        <Button type="submit">Click me</Button>
      </Form>
      {productDetails ? <ProductDetails loading={loading} data={data} /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  font-family: 'Noto Sans JP', sans-serif;
`;

const Form = styled.form`
height: 20px;
font-family: 'Noto Sans JP', sans-serif;
`;

const Input = styled.input`
padding: 5px;
`;

const Button = styled.button`
padding: 5px;
`;

export default Home;
