import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const P = styled.p`
  @media (max-width: 950px) {
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #6eaa4a;
  color: white;
  border-radius: 2px;
  border: none;
  margin-top: 20px;
  @media (max-width: 950px) {
    margin-top: 10px;
  }
`;

const Label = styled.label`
  padding: 5px 0;
  @media (max-width: 950px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: 5px 0;
  @media (max-width: 950px) {
    font-size: 1rem;
  }
`;

const FormTitle = styled.h2`
  @media (max-width: 950px) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Form = styled.form`
  background-color: #fdb486;
  color: black;
  text-align: left;
  border-radius: 5px;
`;

const FormDiv = styled.div`
  padding: 15px 20px 15px 20px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const PriceNotifyForm = (props) => {
  const [currentDesiredPrice, setCurrentDesiredPrice] = useState(0);
  const [email, setEmail] = useState(null);

  let txt;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("new price", event.currentTarget.elements.desiredPrice.value);
    
    axios
      .post("http://localhost:3001/api/storedesiredprice", {
        email: event.currentTarget.elements.email.value,
        desiredPrice: event.currentTarget.elements.desiredPrice.value,
        productId: props.data,
        priceReplacementFlag: false,
      })
      .then((response) => {
        console.log("response.data", response.data);
        const currentPrice = response.data;
        if (response.data) {
          console.log("we hit the if")
          if (
            window.confirm(
              `You already have a desired price of $${currentPrice} saved, do you wish to replace it with $${currentDesiredPrice}?`
            )
          ) {
            txt = "Sure! Replace my price";
            axios.post("http://localhost:3001/api/storedesiredprice", {
              email: email,
              desiredPrice: currentDesiredPrice,
              productId: props.data,
              priceReplacementFlag: true,
            });
          } else {
            txt = "No, don't replace my price!";
          }
        } else {
          console.log("else!!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlePriceChange = (event) => {
    event.preventDefault(); // prevent the default action
    setCurrentDesiredPrice(event.target.value); // set name to e.target.value (event)
  };

  const handleEmailChange = (event) => {
    event.preventDefault(); // prevent the default action
    setEmail(event.target.value); // set name to e.target.value (event)
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          <FormTitle>Track this Product</FormTitle>
          <P>
            We'll notify you via e-mail when this product hits your desired
            price. We check the product's price on a daily basis.
          </P>
          <Label htmlFor="email">Your E-mail Address</Label>
          <Input
            type="email"
            placeholder="Enter your e-mail address"
            autoComplete="email"
            id="email"
            name="email"
            noValidate=""
            onChange={handleEmailChange}
            required
          ></Input>
          <Label htmlFor="desiredPrice">Your Desired Price</Label>
          <Input
            type="number"
            placeholder="Enter your desired price"
            min="1"
            max="99999"
            id="desiredPrice"
            name="desiredPrice"
            onChange={handlePriceChange}
            required
          ></Input>
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormDiv>
      </Form>
    </Wrapper>
  );
};

export default PriceNotifyForm;
