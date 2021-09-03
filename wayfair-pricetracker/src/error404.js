import React from "react";
import styled from "styled-components";

const Error404 = () => {
  return (
    <Wrapper>
      <h2>Error404</h2>
      <p>Not Found</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default Error404;
