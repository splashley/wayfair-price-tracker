import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <h2>made by <a href="www.github.com/splashley">splashley</a></h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default Footer;
