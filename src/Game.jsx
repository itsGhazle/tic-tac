/* eslint-disable react/prop-types */

import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  gap: 12px;
  padding: 16px;
  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  span {
    box-shadow: ${(props) =>
      props.isActive ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : ""};
    padding: 12px;
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 5px;
  background-color: #fff;
  padding: 20px;
  border: 5px solid #000;
  border-radius: 20px;
  box-shadow: #000 -5px 5px, #000 -10px 10px, #000 -15px 15px, #000 -20px 20px,
    #000 -25px 25px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
    gap: 5px;
    border: 3px solid #000;
    border-radius: 10px;
  }
`;

const Cell = styled.button`
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 */
  position: relative;
  background-color: #b3e5fc;
  border: 4px solid #000;
  border-radius: 16px;
  box-shadow: #000 -4px 4px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #81d4fa;
  }

  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    max-height: 80%;
  }

  @media (max-width: 600px) {
    border: 3px solid #000;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-weight: 700;
  border: 4px solid #000;
  border-radius: 16px;
  box-shadow: #000 -5px 5px;
  cursor: pointer;
  transition: all 0.2s;
  ${(props) =>
    props.primary
      ? `
    background-color: #ffcc00;
    color: #000;
    &:hover {
      background-color: #ffb300;
    }
  `
      : `
    background-color: #b3e5fc;
    color: #000;
    &:hover {
      background-color: #81d4fa;
    }
  `}
  @media (max-width: 600px) {
    max-width: 150px;
    height: 50px;
  }
`;

const History = styled.div`
  margin: 20px;
  width: 100%;
  max-width: 400px;
  @media (max-width: 600px) {
    width: 90%;
    margin: 10px;
  }
`;

const Ul = styled.ul`
  margin-top: 5px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    width: 100%;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #ddd;
    }
  }
`;

function Game() {
  const { board, handleClick, goTo, resetGame, status, history, isXNext } =
    useContext(GameContext);

  return (
    <Container>
      <Header>
        {status}
        <Player isActive={isXNext}>
          <span>
            <Img src="/X.png" alt="" />
          </span>
          Player 1
        </Player>
        <Player isActive={!isXNext}>
          <span>
            <Img src="/O.png" alt="" />
          </span>
          Player 2
        </Player>
      </Header>
      <Controls>
        <Button onClick={resetGame}>RESET</Button>
        <Button primary>STEP #{board.filter(Boolean).length + 1}</Button>
      </Controls>
      <Board>
        {board.map((cell, index) => (
          <Cell key={index} onClick={() => handleClick(index)}>
            {cell && <Img src={cell} alt="" />}
          </Cell>
        ))}
      </Board>
      <History>
        <h2>Move History</h2>
        <Ul>
          {history.map((move, moveIndex) => (
            <li key={moveIndex}>
              <button onClick={() => goTo(moveIndex)}>
                Player {move.player}: Row {move.row}, Column {move.col}
              </button>
            </li>
          ))}
        </Ul>
      </History>
    </Container>
  );
}

export default Game;
