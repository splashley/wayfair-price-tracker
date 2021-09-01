import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";

import Header from "./components/header";
import Home from "./home";
import ProductDetails from "./productdetails";
import Error404 from "./error404.js";
import Footer from "./components/footer";
import "./App.css"

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

export default function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/productdetails">
            <ProductDetails />
          </Route>
          <Route component={Error404}>
            <Error404 />
          </Route>
        </Switch>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}