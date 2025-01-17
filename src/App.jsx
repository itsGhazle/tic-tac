import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./Game";
import GlobalStyles from "./GlobalStyles";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <GameProvider>
          <Routes>
            <Route index element={<Game />} />
          </Routes>{" "}
        </GameProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
