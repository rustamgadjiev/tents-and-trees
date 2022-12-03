import levels from "../utils/levels.json";

export function RowNumbers({ SIZE, level }) {
  return (
    <div className="row num">
      {levels[`level_${level}`].row_numbers.map((number, i) => (
        <div key={i} id={`row${i * SIZE}`} className="number">
          {number}
        </div>
      ))}
    </div>
  );
}
