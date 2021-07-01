import React, { useState } from "react";
import styled from "styled-components";

import SearchBar from "./components/searchbar";
import ProductDetails from "./productdetails";

const Home = () => {
  const [state, setState] = useState("start");

  triggerAddTripState = () => {
    setState("add-trip");
  };

  return (
    <Wrapper>
      <h1>hunterhunterhunter</h1>
      <SearchBar />
      <ProductDetails addTrip={this.triggerAddTripState} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
