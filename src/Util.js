import Papa from "papaparse";

// weapon moves
import archeryCSV from "./skillchain-info/archery.csv";
import axeCSV from "./skillchain-info/axe.csv";
import clubCSV from "./skillchain-info/club.csv";
import daggerCSV from "./skillchain-info/dagger.csv";
import greatAxeCSV from "./skillchain-info/great-axe.csv";
import greatKatanaCSV from "./skillchain-info/great-katana.csv";
import greatSwordCSV from "./skillchain-info/great-sword.csv";
import handToHandCSV from "./skillchain-info/hand-to-hand.csv";
import katanaCSV from "./skillchain-info/katana.csv";
import marksmanshipCSV from "./skillchain-info/marksmanship.csv";
import polearmCSV from "./skillchain-info/polearm.csv";
import scytheCSV from "./skillchain-info/scythe.csv";
import staffCSV from "./skillchain-info/staff.csv";
import summonCSV from "./skillchain-info/summon.csv";
import swordCSV from "./skillchain-info/sword.csv";
// import bloodPactCSV from "./skillchain-info/blood-pact.csv";

// job weapon mapping
import jobWeaponCSV from "./skillchain-info/job-weapon.csv";

// job ws levels
import warWsCSV from "./skillchain-info/war-ws.csv";
import thfWsCSV from "./skillchain-info/thf-ws.csv";
import drkWsCSV from "./skillchain-info/drk-ws.csv";
import pldWsCSV from "./skillchain-info/pld-ws.csv";
import bstWsCSV from "./skillchain-info/bst-ws.csv";
import drgWsCSV from "./skillchain-info/drg-ws.csv";
import mnkWsCSV from "./skillchain-info/mnk-ws.csv";
import ninWsCSV from "./skillchain-info/nin-ws.csv";
import rdmWsCSV from "./skillchain-info/rdm-ws.csv";
import rngWsCSV from "./skillchain-info/rng-ws.csv";
import samWsCSV from "./skillchain-info/sam-ws.csv";
import smnWsCSV from "./skillchain-info/smn-ws.csv";

// skillchains
import lvl1skillchainsCSV from "./skillchain-info/lvl1skillchains.csv";
import lvl2skillchainsCSV from "./skillchain-info/lvl2skillchains.csv";
import lvl3skillchainsCSV from "./skillchain-info/lvl3skillchains.csv";

let csvs = [
  archeryCSV,
  axeCSV,
  clubCSV,
  daggerCSV,
  greatAxeCSV,
  greatKatanaCSV,
  greatSwordCSV,
  handToHandCSV,
  katanaCSV,
  marksmanshipCSV,
  polearmCSV,
  scytheCSV,
  staffCSV,
  summonCSV,
  swordCSV,
  jobWeaponCSV,
  warWsCSV,
  thfWsCSV,
  drkWsCSV,
  pldWsCSV,
  bstWsCSV,
  drgWsCSV,
  mnkWsCSV,
  ninWsCSV,
  rdmWsCSV,
  rngWsCSV,
  samWsCSV,
  smnWsCSV,
  lvl1skillchainsCSV,
  lvl2skillchainsCSV,
  lvl3skillchainsCSV,
];

class Weapon {
  constructor(name, moves, csv) {
    this.name = name;
    this.moves = moves;
    this.csv = csv;
  }
}

class Job {
  constructor(name, shortName, weapons, wsLevel) {
    this.name = name;
    this.shortName = shortName;
    this.weapons = weapons;
    this.wsLevel = wsLevel;
  }
}

export async function init() {
  console.log("IN INITIT!!!!!");

  return Promise.all(
    csvs.map(
      (url) =>
        new Promise((resolve, reject) =>
          Papa.parse(url, {
            download: true,
            header: true,
            complete: resolve,
            error: reject,
          })
        )
    )
  )
    .then(async function (results) {
      const archeryMoves = results[0].data;
      const axeMoves = results[1].data;
      const clubMoves = results[2].data;
      const daggerMoves = results[3].data;
      const greatAxeMoves = results[4].data;
      const greatKatanaMoves = results[5].data;
      const greatSwordMoves = results[6].data;
      const handToHandMoves = results[7].data;
      const katanaMoves = results[8].data;
      const marksmanshipMoves = results[9].data;
      const polearmMoves = results[10].data;
      const scytheMoves = results[11].data;
      const staffMoves = results[12].data;
      const summonMoves = results[13].data;
      const swordMoves = results[14].data;
      const jobWeaponMapping = results[15].data;
      const warWsLvl = results[16].data;
      const thfWsLvl = results[17].data;
      const drkWsLvl = results[18].data;
      const pldWsLvl = results[19].data;
      const bstWsLvl = results[20].data;
      const drgWsLvl = results[21].data;
      const mnkWsLvl = results[22].data;
      const ninWsLvl = results[23].data;
      const rdmWsLvl = results[24].data;
      const rngWsLvl = results[25].data;
      const samWsLvl = results[26].data;
      const smnWsLvl = results[27].data;
      const lvl1sc = results[28].data;
      const lvl2sc = results[29].data;
      const lvl3sc = results[30].data;

      let weapons = [];
      weapons.push(new Weapon("archery", archeryMoves, archeryCSV));
      weapons.push(new Weapon("axe", axeMoves, axeCSV));
      weapons.push(new Weapon("club", clubMoves, clubCSV));
      weapons.push(new Weapon("dagger", daggerMoves, daggerCSV));
      weapons.push(new Weapon("greatAxe", greatAxeMoves, greatAxeCSV));
      weapons.push(new Weapon("greatKatana", greatKatanaMoves, greatKatanaCSV));
      weapons.push(new Weapon("greatSword", greatSwordMoves, greatSwordCSV));
      weapons.push(new Weapon("handToHand", handToHandMoves, handToHandCSV));
      weapons.push(new Weapon("katana", katanaMoves, katanaCSV));
      weapons.push(
        new Weapon("marksmanship", marksmanshipMoves, marksmanshipCSV)
      );
      weapons.push(new Weapon("polearm", polearmMoves, polearmCSV));
      weapons.push(new Weapon("scythe", scytheMoves, scytheCSV));
      weapons.push(new Weapon("staff", staffMoves, staffCSV));
      weapons.push(new Weapon("summon", summonMoves, summonCSV));
      weapons.push(new Weapon("sword", swordMoves, swordCSV));

      let topFFXI = {};
      topFFXI["war"] = new Job(
        "warrior",
        "war",
        getWeapons("warrior", weapons, jobWeaponMapping),
        warWsLvl
      );
      topFFXI["thf"] = new Job(
        "thief",
        "thf",
        getWeapons("thief", weapons, jobWeaponMapping),
        thfWsLvl
      );
      topFFXI["drk"] = new Job(
        "dark knight",
        "drk",
        getWeapons("dark knight", weapons, jobWeaponMapping),
        drkWsLvl
      );
      topFFXI["pld"] = new Job(
        "paladin",
        "pld",
        getWeapons("paladin", weapons, jobWeaponMapping),
        pldWsLvl
      );
      topFFXI["bst"] = new Job(
        "beast master",
        "bst",
        getWeapons("beast master", weapons, jobWeaponMapping),
        bstWsLvl
      );

      topFFXI["drg"] = new Job(
        "dragoon",
        "drg",
        getWeapons("dragoon", weapons, jobWeaponMapping),
        drgWsLvl
      );
      topFFXI["mnk"] = new Job(
        "monk",
        "mnk",
        getWeapons("monk", weapons, jobWeaponMapping),
        mnkWsLvl
      );
      topFFXI["nin"] = new Job(
        "ninja",
        "nin",
        getWeapons("ninja", weapons, jobWeaponMapping),
        ninWsLvl
      );
      topFFXI["rdm"] = new Job(
        "red mage",
        "rdm",
        getWeapons("red mage", weapons, jobWeaponMapping),
        rdmWsLvl
      );
      topFFXI["rng"] = new Job(
        "ranger",
        "rng",
        getWeapons("ranger", weapons, jobWeaponMapping),
        rngWsLvl
      );
      topFFXI["sam"] = new Job(
        "samurai",
        "sam",
        getWeapons("samurai", weapons, jobWeaponMapping),
        samWsLvl
      );

      topFFXI["smn"] = new Job(
        "summoner",
        "snm",
        getWeapons("summoner", weapons, jobWeaponMapping),
        smnWsLvl
      );

      // setFFXI(topFFXI);

      console.log(topFFXI);
      return { topFFXI, lvl1sc, lvl2sc, lvl3sc };
    })
    .catch(
      //log the error
      (err) => console.warn("Something went wrong in parsing CSV:", err)
    );
}

export function initDroppable(
  ffxi,
  leftrighttoggle,
  setJob1,
  setJob2,
  setWeapon1,
  setWeapon2
) {
  //New Select Charcter functions
  const jobtiles = document.querySelectorAll(".jobtile");
  const dropzones = document.querySelectorAll(".dropzone");

  jobtiles.forEach((jobtile) => {
    jobtile.addEventListener("dblclick", () => {
      jobtile.classList.add("lastclicked");
      const lastclicked = document.querySelector(".lastclicked");
      handleCharacterSelect(lastclicked, leftrighttoggle);
    });

    jobtile.addEventListener("dragstart", () => {
      jobtile.classList.add("dragging");
    });

    jobtile.addEventListener("dragend", () => {
      jobtile.classList.remove("dragging");
    });
  });

  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    dropzone.addEventListener("drop", (event) => {
      const draggable = document.querySelector(".dragging");
      let position = "string";
      const targetID = event.target.id;
      const targetElement = event.target;
      const charaElement = targetElement.closest("#chara");

      if (charaElement) {
        position = "left";
      } else {
        position = "right";
      }

      handleCharacterSelect(draggable, position);
    });
  });

  const handleCharacterSelect = (character, position) => {
    const clonedCharacterDiv = character.cloneNode(true);
    character.classList.remove("lastclicked");
    clonedCharacterDiv.classList.remove("lastclicked");
    clonedCharacterDiv.classList.remove("dragging");

    leftrighttoggle = position;

    if (leftrighttoggle === "left") {
      let dropzone = document.querySelector(".chara");
      if (dropzone.hasChildNodes()) {
        dropzone.removeChild(dropzone.firstChild);
      }

      dropzone.appendChild(clonedCharacterDiv);

      console.log("Dropped Left:");
      console.log(clonedCharacterDiv.id);

      setJob1(ffxi[clonedCharacterDiv.id]);
      setWeapon1(ffxi[clonedCharacterDiv.id].weapons[0].moves);

      clonedCharacterDiv.id = "charaobj";
      clonedCharacterDiv.classList.add("charaobj");

      leftrighttoggle = "right";
    } else {
      let dropzone = document.querySelector(".charb");
      if (dropzone.hasChildNodes()) {
        dropzone.removeChild(dropzone.firstChild);
      }
      dropzone.appendChild(clonedCharacterDiv);

      console.log("Dropped Right:");
      console.log(clonedCharacterDiv.id);

      setJob2(ffxi[clonedCharacterDiv.id]);
      setWeapon2(ffxi[clonedCharacterDiv.id].weapons[0].moves);

      leftrighttoggle = "left";
    }
    highlightTiles();
  };

  const highlightTiles = () => {
    const jobtiles = document.querySelectorAll(".jobtile");
    const dropzones = document.querySelectorAll(".dropzone");

    var dropzoneValues = [];
    dropzones.forEach((dropzone) => {
      dropzoneValues.push(dropzone.firstChild.getAttribute("title"));
      console.log(dropzone.firstChild.getAttribute("title"));
    });

    hasDuplicates(jobtiles);

    function hasDuplicates(jobs) {
      for (var i = 0; i < jobs.length; i++) {
        var value = jobs[i].getAttribute("title");
        if (dropzoneValues.indexOf(value) !== -1) {
          jobs[i].classList.add("selected");
        } else {
          jobs[i].classList.remove("selected");
        }
      }
    }
  };
}

export function getWeapons(jobName, allWeapons, jobWeaponMappings) {
  let retJobWeapons = [];
  let jobWeapons = [];

  for (let jwm of jobWeaponMappings) {
    if (jwm.name == jobName) {
      jobWeapons = jwm.weapons.split(",");
      break;
    }
  }

  jobWeapons = jobWeapons.map((jw) => jw.trim());
  jobWeapons = jobWeapons.map((jw) => jw.replace(" ", ""));

  for (let weapon of jobWeapons) {
    let wpn = allWeapons.filter(
      (w) => w.name.toLowerCase() == weapon.toLowerCase()
    );
    if (wpn[0]) {
      retJobWeapons.push(wpn[0]);
    }
  }

  return retJobWeapons;
}

export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
