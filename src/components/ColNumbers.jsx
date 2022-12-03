import levels from "../utils/levels.json";

export function ColNumbers({ level }) {
  return (
    <div className="col num">
      {levels[`level_${level}`].column_numbers.map((number, i) => (
        <div key={i} id={`col${i}`} className="number">
          {number}
        </div>
      ))}
    </div>
  );
}
