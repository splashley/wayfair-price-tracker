import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Spinner from "./components/spinner";

const ProductDetails = (event) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(event.target);
  useEffect(() => {
    console.log(event.target);
    fetch("http://localhost:3001/api/scraping/", {
      method: "GET",
      body: event.target,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(err);
        }
      })
      .then(function (response) {
        console.log("response payload:" + response);
        setProductDetails(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h2>ProductDetails</h2>
      <ProductName>{productDetails.productName}</ProductName>
      <ProductPrice>{productDetails.productPrice}</ProductPrice>
      <ProductImage src={productDetails.ProductImage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default ProductDetails;
