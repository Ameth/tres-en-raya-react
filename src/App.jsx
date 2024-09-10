import { useState } from 'react'

const TURNS = {
  X: '❌',
  O: '🟢',
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  // const [board, setBoard] = useState(['X','X','X','X','O','O','X','O','O'])

  const [turn, setTurn] = useState(TURNS.X)

  //null -> No hay ganador
  //false -> Empate
  //true -> Hay un ganador
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // console.log(board)

  const checkEndGame = (newBoard) => {
    //Revisamos si existe un empate en el juego
    return newBoard.every((pos) => pos !== null)
  }

  const updateBoard = (index) => {
    //Si ya tiene algo en la posición, no actualizamos
    if (board[index] || winner) return

    //Creamos el nuevo tablero con la ultima jugada
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Actualizamos el turno del siguiente jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Verificar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>{winner === false ? 'Empate' : 'Ganó:'}</h2>
            {winner && (
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
            )}

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
