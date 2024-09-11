import { WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck) => {
  //Revisamos todas las combinaciones posibles para ver quien ganó
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  return null
}

export const checkEndGame = (newBoard) => {
  //Revisamos si existe un empate en el juego
  return newBoard.every((pos) => pos !== null)
}
