import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <h2>this is the Header</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10% 15%;
`;

export default Header;
