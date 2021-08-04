import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>hunterhunterhunter</Title>
      <H2>a wayfair price tracker</H2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

const Title = styled.h1`
line-height: -100%;
margin-bottom: 0;
`;

const H2 = styled.h2`
`;

export default Header;
