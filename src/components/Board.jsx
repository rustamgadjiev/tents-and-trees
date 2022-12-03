import Tile from "./Tile";
import levels from "../utils/levels.json";
import { ColNumbers } from "./ColNumbers";
import { RowNumbers } from "./RowNumbers";

function Board({ level }) {
  const SIZE = levels[`level_${level}`].column_numbers.length;
  const tiles = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    tiles.push(i);
  }
  const gridSize = {
    gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
    gridTemplateRows: `repeat(${SIZE}, 1fr)`,
  };
  
  return (
    <div className="board" style={gridSize}>
      <RowNumbers SIZE={SIZE} level={level} />
      <ColNumbers level={level} />
      {tiles.map((i) => (
        <Tile key={i} level={level} tileId={i} levels={levels} SIZE={SIZE} />
      ))}
    </div>
  );
}

export default Board;
