import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>HunterHunterHunter</Title>
      <H2>A Wayfair Price Tracker</H2>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 10px;
  border-bottom: 1px black solid;
`;

const Title = styled.h1`
line-height: -100%;
margin-bottom: 0;
@media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const H2 = styled.h2`
@media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default Header;
