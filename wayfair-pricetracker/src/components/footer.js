import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <FooterText>Made by <a href="www.github.com/splashley">Splashley</a></FooterText>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  padding: 0;
`;

const FooterText = styled.h3`
@media (max-width: 768px) {
    font-size: 1rem;
    margin: 0;
    padding: 20px;
  }
`;

export default Footer;
