import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const Spinner = () => {
  return (
    <Wrapper>
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
  padding: 15px;
  text-align: center;
`;

const SpinnerDiv = styled.div`
  font-size: 5rem;
  animation: ${spin} 3s linear infinite;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Wrapper = styled.div`
  padding-top: 120px;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (max-width: 768px) {
    padding: 100px 0;
  }
`;

export default Spinner;
