import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const [inputURL, setInputUrl] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setInputUrl(value);
    console.log(inputURL);
  };

  return (
    <Wrapper>
      <form action="http://localhost:3001/api/scraping" method="post">
        <input
          type="text"
          placeholder="Enter URL here"
          name="inputURL"
          onChange={handleChange}
          pattern="https?://www.wayfair.com.+"
        ></input>
        <button type="submit">Click me</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
`;

export default SearchBar;
