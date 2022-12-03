function Tile({ tileId, levels, SIZE, level }) {
  const TREES_ID = levels[`level_${level}`].trees_id;
  const TENTS_ID = levels[`level_${level}`].tents_id;
  let tileClassName = "field tile";
  if (TREES_ID.includes(tileId)) tileClassName = "tree tile";

  let rowChecked = false;

  const handleClick = (tile) => {
    if (tile.target.className === "tree tile") return;
    toggleTile(tile);
    check(tile, "row");
    check(tile, "col");
    checkResults();
  };

  const toggleTile = (tile) => {
    if (tile.target.className === "field tile")
      tile.target.className = "grass tile";
    else if (tile.target.className === "grass tile")
      tile.target.className = "tent tile";
    else if (tile.target.className === "tent tile")
      tile.target.className = "field tile";
  };

  const check = (tile, currentType) => {
    const BASE_ID = rowChecked
      ? tile.target.id % SIZE
      : Math.floor(tile.target.id / SIZE) * SIZE;
    const TILES_CHECKABLE = [];
    const TILES_CHECKED = [];
    const TENT_TILES = [];
    const TENTS_AMOUNT = Number(
      document.getElementById(`${currentType}${BASE_ID}`).innerText
    );

    const LOOP_CONDITION = rowChecked ? SIZE * SIZE : BASE_ID + SIZE;
    const LOOP_ITERATION = rowChecked ? SIZE : 1;

    for (let i = BASE_ID; i < LOOP_CONDITION; i += LOOP_ITERATION) {
      const tileInspected = document.getElementById(i);
      if (tileInspected !== null && tileInspected.className !== "tree tile")
        TILES_CHECKABLE.push(i);

      if (
        tileInspected !== null &&
        tileInspected.className !== "tree tile" &&
        tileInspected.className !== "field tile"
      )
        TILES_CHECKED.push(i);

      if (tileInspected !== null && tileInspected.className === "tent tile")
        TENT_TILES.push(i);
    }

    changeColor(
      TILES_CHECKABLE,
      TILES_CHECKED,
      TENT_TILES,
      TENTS_AMOUNT,
      currentType,
      BASE_ID
    );

    if (rowChecked) {
      rowChecked = false;
      return;
    }
    rowChecked = true;
  };

  const changeColor = (
    TILES_CHECKABLE,
    TILES_CHECKED,
    TENT_TILES,
    TENTS_AMOUNT,
    currentType,
    BASE_ID
  ) => {
    if (TENT_TILES.length === TENTS_AMOUNT) {
      document.getElementById(`${currentType}${BASE_ID}`).style.color = "gray";
    }
    if (
      TENT_TILES.length > TENTS_AMOUNT ||
      (TILES_CHECKABLE.length === TILES_CHECKED.length &&
        TENT_TILES.length !== TENTS_AMOUNT)
    )
      document.getElementById(`${currentType}${BASE_ID}`).style.color = "red";
    else if (
      TENT_TILES.length < TENTS_AMOUNT ||
      (TILES_CHECKABLE.length === TILES_CHECKED.length &&
        TENT_TILES.length !== TENTS_AMOUNT)
    )
      document.getElementById(`${currentType}${BASE_ID}`).style.color = "white";
    if (
      TENTS_AMOUNT === 0 &&
      TILES_CHECKABLE.length !== TILES_CHECKED.length &&
      TENT_TILES.length === TENTS_AMOUNT
    )
      document.getElementById(`${currentType}${BASE_ID}`).style.color = "white";
  };

  const checkResults = () => {
    const PLAYER_TENTS = [];

    for (let i = 0; i < SIZE * SIZE; i++) {
      const tileInspected = document.getElementById(i);
      if (tileInspected && tileInspected.className === "tent tile") {
        PLAYER_TENTS.push(i);
      }
    }
    if (PLAYER_TENTS.length !== TENTS_ID.length) return;
    if (!PLAYER_TENTS.every((tent, index) => tent === TENTS_ID[index])) return;
    alert("You won!");
    return;
  };

  return (
    <div id={tileId} className={tileClassName} onClick={handleClick}></div>
  );
}

export default Tile;
