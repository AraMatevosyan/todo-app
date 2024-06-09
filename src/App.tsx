import React from "react";
import Routing from "./Routing";
import { ThemeProvider } from "./theme/ThemeContext";
import { Header } from "./components";
import { Styled } from "./App.styled";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Header />
      <Styled.Content>
        <Routing />
      </Styled.Content>
    </ThemeProvider>
  );
};

export default App;
