import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const P = styled.p`
  @media (max-width: 950px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #6eaa4a;
  font-family: "Noto Sans JP", sans-serif;
  color: white;
  border-radius: 2px;
  border: none;
  padding: 5px;
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
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Input = styled.input`
  padding: 5px 0;
  @media (max-width: 950px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const FormTitle = styled.h2`
  @media (max-width: 950px) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Form = styled.form`
  background-color: #fedeca;
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
  width: 50%;
  margin: 40px auto 0 auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const PriceNotifyForm = (props) => {
  const [currentDesiredPrice, setCurrentDesiredPrice] = useState(0);
  const [email, setEmail] = useState(null);
  const [buttonMessage, setButtonMessage] = useState("Save Your Price");

  let txt;

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/storedesiredprice", {
        email: event.currentTarget.elements.email.value,
        desiredPrice: event.currentTarget.elements.desiredPrice.value,
        productId: props.data,
        priceReplacementFlag: false,
      })
      .then((response) => {
        const currentPrice = response.data;
        if (response.data) {
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
            setButtonMessage("Your Desired Price Has Been Saved");
            setInterval(() => {
              setButtonMessage("Save Your Price");
            }, 5000);
          } else {
            txt = "No, don't replace my price!";
          }
        } else {
          setButtonMessage("Your Desired Price Has Been Saved");
          setInterval(() => {
            setButtonMessage("Save Your Price");
          }, 5000);
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
          <SubmitButton type="submit">{buttonMessage}</SubmitButton>
        </FormDiv>
      </Form>
    </Wrapper>
  );
};

export default PriceNotifyForm;
