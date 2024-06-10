import React from "react";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Routing from "./Routing";
import { ThemeProvider } from "./theme/ThemeContext";
import { Header } from "./components";
import { Styled } from "./App.styled";

const App: React.FC = () => {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <ThemeProvider>
        <Header />
        <Styled.Content>
          <Routing />
        </Styled.Content>
      </ThemeProvider>{" "}
    </QueryParamProvider>
  );
};

export default App;
