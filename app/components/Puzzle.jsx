'use client';
import React, { useState, useEffect } from 'react';

const ShuffleButton = ({ onClick }) => (
  <button onClick={onClick} 
    style={{ marginTop: '10px', marginLeft: '20px', padding: '10px', background: '#4285f4', 
     color: '#F2F5F5', borderRadius: '6px'}}>
    Mischia tessere
  </button>
);


const PuzzleTile = ({ image, onClick }) => (
  <div
    className="tile"
    onClick={onClick}
    style={{
      width: '150px',
      height: '150px',
      border: '1px solid #ccc',
      background: `url(${image}) center/cover`,
      cursor: 'pointer',
    }}
  />
);

const SlidePuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const size = 3; // 3x3 puzzle
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const orderedTiles = Array.from({ length: size * size }, (_, index) => `./images/piece_${Math.floor(index / size)}_${index % size}.png`);
    orderedTiles[size * size - 1] = null;
    setTiles(orderedTiles);
    setMoves(0);
  };

  const shuffleTiles = (arr) => {
    let shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  };

  const getAdjacentIndices = (index) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const indices = [];
    if (row > 0) indices.push(index - size);
    if (row < size - 1) indices.push(index + size);
    if (col > 0) indices.push(index - 1);
    if (col < size - 1) indices.push(index + 1);
    return indices;
  };

  const handleTileClick = (index) => {
    const clickedTile = tiles[index];
    const emptyIndex = tiles.indexOf(null);
    const adjacentIndices = getAdjacentIndices(emptyIndex);

    if (adjacentIndices.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = clickedTile;
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves((prevMoves) => prevMoves + 1);
    }
  };

  const handleShuffleClick = () => {
    const shuffledTiles = shuffleTiles(tiles);
    setTiles(shuffledTiles);
    setMoves(0);
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl pb-12 mt-20">Slide Puzzle</h1>
      <div className="grid grid-cols-3 gap-0.5" onClick={(e) => e.stopPropagation()}>
        {tiles.map((tile, index) => (
          <PuzzleTile key={index} image={tile} onClick={() => handleTileClick(index)} />
        ))}
      </div>
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <ShuffleButton onClick={handleShuffleClick} />
        <p style={{ marginTop: '20px', marginLeft: '20px' }}>Mosse: {moves}</p>
      </div>
    </div>


  );
};

export default SlidePuzzle;

