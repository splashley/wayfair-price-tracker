import React from "react";
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

    return (
        <Wrapper>
          <Form>
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
                required
              ></Input>
              <SubmitButton type="submit">Submit</SubmitButton>
            </FormDiv>
          </Form>
        </Wrapper>
      );
    }


export default PriceNotifyForm;