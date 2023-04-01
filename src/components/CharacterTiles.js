import React, {
  Fragment,
  ReactDOM,
  ReactMotion,
  useState,
  useEffect,
} from "react";
import "../App.css";

function CharacterTiles() {
  const [jobtiles, setjobtiles] = useState([
    { Name: "Warrior", id: "war", value: "war" },
    { Name: "Thief", id: "thf", value: "thf" },
    { Name: "Dark Knight", id: "drk", value: "drk" },
    { Name: "Paladin", id: "pld", value: "pld" },
    { Name: "Beast Master", id: "bst", value: "bst" },
    { Name: "Dragoon", id: "drg", value: "drg" },
    { Name: "Monk", id: "mnk", value: "mnk" },
    { Name: "Ninja", id: "nin", value: "nin" },
    { Name: "Red Mage", id: "rdm", value: "rdm" },
    { Name: "Ranger", id: "rng", value: "rng" },
    { Name: "Samurai", id: "sam", value: "sam" },
    { Name: "Summoner", id: "smn", value: "smn" },
  ]);

  useEffect(() => {
    //console.log("useEffect Fired");
    createTiles();
    return () => {};
  }, []);

  function createTiles() {
    for (let i = 0; i < jobtiles.length / 2; i++) {
      const list = document.getElementById("begin1");
      const temp = document.createElement("div");
      temp.title = jobtiles[i].Name;
      temp.className = "jobtile col";
      temp.id = jobtiles[i].id;
      temp.value = jobtiles[i].value;
      temp.innerHTML = jobtiles[i].Name;
      temp.draggable = true;
      list.appendChild(temp);
    }

    for (let i = jobtiles.length / 2; i < jobtiles.length; i++) {
      const list = document.getElementById("begin2");
      const temp = document.createElement("div");
      temp.title = jobtiles[i].Name;
      temp.className = "jobtile col";
      temp.id = jobtiles[i].id;
      temp.value = jobtiles[i].value;
      temp.innerHTML = jobtiles[i].Name;
      temp.draggable = true;
      list.appendChild(temp);
    }
  }

  return (
    <Fragment>
      <div>
        CharacterTiles
        <div className="begin1 row" id="begin1"></div>
        <div className="begin2 row" id="begin2"></div>
      </div>
    </Fragment>
  );
}

export default CharacterTiles;
