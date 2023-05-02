import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Todos } from "./components/Todos/Todos";
import { Container } from "@mui/material";
import React from "react";
import "./App.css";

function App() {
  return (
    <Container>
      <ChakraProvider>
        <Flex justifyContent={"center"} alignItems={"center"} marginY={10}>
          <h1>Todo List</h1>
        </Flex>
        <Todos />
      </ChakraProvider>
    </Container>
  );
}

export default App;
