import React from "react";
import styled from "styled-components";

const ProductDetails = () => {
  return (
    <Wrapper>
      <h2>ProductDetails</h2>
      <ProductName>{data.productName}</ProductName>
      <ProductPrice>{data.productPrice}</ProductPrice>
      <ProductImage src={data.ProductImage} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default ProductDetails;
