import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
