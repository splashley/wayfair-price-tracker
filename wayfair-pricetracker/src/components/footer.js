import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <FooterText>Made by <a href="https://www.github.com/splashley">Splashley</a></FooterText>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 40px 0;
`;

const FooterText = styled.h3`
font-weight: 500;
@media (max-width: 768px) {
    font-size: 1rem;
    margin: 0;
    padding: 20px;
  }
`;

export default Footer;
