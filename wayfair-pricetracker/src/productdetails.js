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
      <ProductName>{props?.data?.productName}</ProductName>
      <ProductPrice>{props?.data?.productPrice}</ProductPrice>
      <ProductImage src={props?.data?.productImage} />
      <PriceNotifyForm data={props?.data?.productId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 25px 0;
`;

const ProductName = styled.h2`
font-size: 1.5rem;
`

const ProductPrice = styled.h2`
font-size: 1.5rem;
`

const ProductImage  = styled.img`
width: 250px;
`

export default ProductDetails;
