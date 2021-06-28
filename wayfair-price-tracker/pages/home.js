import React from "react";
import styled from "styled-components";

import SearchBar from "./components/searchbar";

const Home = () => {
  return (
    <Wrapper>
      <h1>hunterhunterhunter</h1>
      <SearchBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10% 15%;
`;

export default Home;
