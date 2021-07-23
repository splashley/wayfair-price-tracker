import React from "react";
import styled from "styled-components";

import Spinner from "./components/spinner";
import PriceNotifyForm from "./components/desiredprice";

const ProductDetails = (props) => {
  console.log(props);
  return props.loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <h2>ProductDetails</h2>
      <ProductName>{props?.data?.productName}</ProductName>
      <ProductPrice>{props?.data?.productPrice}</ProductPrice>
      <ProductImage src={props?.data?.productImage} />
      <PriceNotifyForm data={props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

const ProductName = styled.h2`
font-size: 16px;
`

const ProductPrice = styled.h2`
font-size: 16px;
`

const ProductImage  = styled.img`
width: 100px;
`

export default ProductDetails;
