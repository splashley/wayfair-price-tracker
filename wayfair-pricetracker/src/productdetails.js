import React from "react";
import styled from "styled-components";

import Spinner from "./components/spinner";
import PriceNotifyForm from "./components/desiredprice";

const ProductDetails = (props) => {
  return props.loading ? (
    <Spinner />
  ) : (
    <Wrapper aria-busy="false">
      <ProductName>{props.data.productName}</ProductName>
      <ProductPrice>{props.data.productPrice}</ProductPrice>
      <ProductImage alt={props.data.productName} src={props.data.productImage} />
      <PriceNotifyForm data={props.data.productId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 0;
  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const ProductName = styled.h2`
font-size: 1.5rem;
font-weight: 500;
@media (max-width: 768px) {
    font-size: 1rem;
  }
`
const ProductPrice = styled.h2`
font-size: 1.5rem;
font-weight: 500;
@media (max-width: 768px) {
    font-size: 1rem;
  }
`
const ProductImage = styled.img`
width: 250px;
box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
@media (max-width: 768px) {
  width: 200px;
  }
`
export default ProductDetails;
