import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { FiLoader } from "react-icons/fi";

const Spinner = () => {
  return (
    <Wrapper aria-busy="true" aria-label="Loading - Do not refresh the page">
      <SpinnerDiv>
        <FiLoader />
      </SpinnerDiv>
      <SpinnerMessageDiv>
        <SpinnerMessage>
          <p>
            Please wait as we're getting your product information. <br />
            This should only take a few seconds.
          </p>
        </SpinnerMessage>
      </SpinnerMessageDiv>
    </Wrapper>
  );
};

const spin = keyframes`
100% { transform: rotate(360deg); }
`;

const SpinnerMessage = styled.p`
  color: black;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 40px;
  }
`;

const SpinnerMessageDiv = styled.div`
  text-align: center;
`;

const SpinnerDiv = styled.div`
  font-size: 5rem;
  text-align: center;
  margin: 0;
  animation: ${spin} 3s linear infinite;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Wrapper = styled.div`
  margin: 0;
  padding: 50px 20%;
  @media (max-width: 768px) {
    padding: 50px 5% 20px 5%;
  }
`;

export default Spinner;
