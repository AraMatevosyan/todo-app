import React from "react";
import Routing from "./Routing";
import { ThemeProvider } from "./theme/ThemeContext";
import { Header } from "./components";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Header />
      <Routing />
    </ThemeProvider>
  );
};

export default App;
