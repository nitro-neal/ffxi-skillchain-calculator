import "./App.css";
import "./Orb.css";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import JobWeaponSelect from "./components/JobWeaponSelect.js";
import CharacterTiles from "./components/CharacterTiles.js";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBCardFooter } from "mdb-react-ui-kit";

import * as util from "./Util.js";

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

util.hi();

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

function App() {
  const scMap = {
    Scission: "🟤",
    Detonation: "🟢",
    Impaction: "🟣",
    Reverberation: "🔵",
    Induration: "🧊",
    Compression: "⚫",
    Liquefaction: "🔴",
    Transfixion: "⚪",
    Distortion: "🔵🧊",
    Fusion: "🔴⚪",
    Fragmentation: "🟣🟢",
    Gravitation: "⚫🟤",
  };

  const [ffxi, setFFXI] = useState({});

  // CSVs
  const [archeryMoves, setArcheryMoves] = useState([]);
  const [axeMoves, setAxeMoves] = useState([]);
  const [clubMoves, setClubMoves] = useState([]);
  const [daggerMoves, setDaggerMoves] = useState([]);
  const [greatAxeMoves, setGreatAxeMoves] = useState([]);
  const [greatKatanaMoves, setGreatKatanaMoves] = useState([]);
  const [greatSwordMoves, setGreatSwordMoves] = useState([]);
  const [handToHandMoves, setHandToHandMoves] = useState([]);
  const [katanaMoves, setKatanaMoves] = useState([]);
  const [marksmanshipMoves, setMarksmanshipMoves] = useState([]);
  const [polearmMoves, setPolearmMoves] = useState([]);
  const [scytheMoves, setScytheMoves] = useState([]);
  const [staffMoves, setStaffMoves] = useState([]);
  const [summonMoves, setSummonMoves] = useState([]);
  const [swordMoves, setSwordMoves] = useState([]);

  const [jobWeaponMapping, setJobWeapons] = useState([]);

  const [warWsLvl, setWarWsLvl] = useState([]);
  const [thfWsLvl, setThfWsLvl] = useState([]);
  const [drkWsLvl, setDrkWsLvl] = useState([]);
  const [pldWsLvl, setPldWsLvl] = useState([]);
  const [bstWsLvl, setBstWsLvl] = useState([]);
  const [drgWsLvl, setDrgWsLvl] = useState([]);
  const [mnkWsLvl, setMnkWsLvl] = useState([]);
  const [ninWsLvl, setNinWsLvl] = useState([]);
  const [rdmWsLvl, setRdmWsLvl] = useState([]);
  const [rngWsLvl, setRngWsLvl] = useState([]);
  const [samWsLvl, setSamWsLvl] = useState([]);
  const [smnWsLvl, setSmnWsLvl] = useState([]);

  const [lvl1sc, setlvl1sc] = useState([]);
  const [lvl2sc, setlvl2sc] = useState([]);
  const [lvl3sc, setlvl3sc] = useState([]);
  let [selectedCharacters, setSelectedCharacters] = useState([]);
  let [leftrighttoggle, setleftrighttoggle] = useState("left");

  // UI
  const [partyLevel, setPartyLevel] = useState(10);
  const [selectedParty, setSelectedParty] = useState([]);
  const [selectedJob1, setJob1] = useState({});
  const [selectedJob2, setJob2] = useState({});
  const [selectedWeapon1, setWeapon1] = useState([]);
  const [selectedWeapon2, setWeapon2] = useState([]);

  const [weaponFlip, setWeaponFlip] = useState(true);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    Promise.all(
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
        await setArcheryMoves(results[0].data);
        await setAxeMoves(results[1].data);
        await setClubMoves(results[2].data);
        await setDaggerMoves(results[3].data);
        await setGreatAxeMoves(results[4].data);
        await setGreatKatanaMoves(results[5].data);
        await setGreatSwordMoves(results[6].data);
        await setHandToHandMoves(results[7].data);
        await setKatanaMoves(results[8].data);
        await setMarksmanshipMoves(results[9].data);
        await setPolearmMoves(results[10].data);
        await setScytheMoves(results[11].data);
        await setStaffMoves(results[12].data);
        await setSummonMoves(results[13].data);
        await setSwordMoves(results[14].data);
        await setJobWeapons(results[15].data);
        await setWarWsLvl(results[16].data);
        await setThfWsLvl(results[17].data);
        await setDrkWsLvl(results[18].data);
        await setPldWsLvl(results[19].data);
        await setBstWsLvl(results[20].data);

        await setDrgWsLvl(results[21].data);
        await setMnkWsLvl(results[22].data);
        await setNinWsLvl(results[23].data);
        await setRdmWsLvl(results[24].data);
        await setRngWsLvl(results[25].data);
        await setSamWsLvl(results[26].data);
        await setSmnWsLvl(results[27].data);

        await setlvl1sc(results[28].data);
        await setlvl2sc(results[29].data);
        await setlvl3sc(results[30].data);

        await setDoneLoading(true);
      })
      .catch(
        //log the error
        (err) => console.warn("Something went wrong:", err)
      );

    // //drag and drop functions
    // const draggables = document.querySelectorAll(".jobtile");
    // const dropzones = document.querySelectorAll(".dropzone");

    // draggables.forEach((draggable) => {
    //   draggable.addEventListener("dragstart", () => {
    //     draggable.classList.add("dragging");
    //   });

    //   draggable.addEventListener("dragend", () => {
    //     draggable.classList.remove("dragging");
    //   });

    //   draggable.addEventListener("dblclick", (e) => {
    //     draggable.classList.add("selected");
    //     const clone = draggable.cloneNode(true);
    //     clone.classList.remove("selected");

    //     console.log(
    //       "CharA:",
    //       dropzones[0].firstElementChild.className === "jobtile",
    //       "CharB:",
    //       dropzones[1].childNodes.length
    //     );

    //     if (
    //       dropzones[0].firstElementChild.className === "jobtile" &&
    //       dropzones[1].firstElementChild.className !== "jobtile"

    //       // dropzones[0].childNodes.length > 0 &&
    //       // dropzones[1].childNodes.length < 2
    //     ) {
    //       dropzones[1].appendChild(clone);
    //       dropzones[1].removeChild(dropzones[1].firstChild);
    //     } else {
    //       dropzones[0].appendChild(clone);
    //       dropzones[0].removeChild(dropzones[0].firstChild);
    //     }
    //   });
    // });

    // dropzones.forEach((dropzone) => {
    //   dropzone.addEventListener("dragover", (e) => {
    //     e.preventDefault();
    //   });

    //   dropzone.addEventListener("drop", (e) => {
    //     const draggable = document.querySelector(".dragging");
    //     const clone = draggable.cloneNode(true);
    //     clone.classList.remove("dragging");
    //     console.log("appendchild", dropzone.childNodes.length);
    //     dropzone.appendChild(clone);

    //     if (dropzone.childNodes.length > 1) {
    //       console.log("removechild", dropzone.childNodes.length);
    //       dropzone.removeChild(dropzone.firstChild);
    //     }
    //   });
    // });
  }, []);

  useEffect(() => {
    if (doneLoading == true) {
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
      weapons.push(new Weapon("marksmanship", marksmanshipMoves, marksmanshipCSV));
      weapons.push(new Weapon("polearm", polearmMoves, polearmCSV));
      weapons.push(new Weapon("scythe", scytheMoves, scytheCSV));
      weapons.push(new Weapon("staff", staffMoves, staffCSV));
      weapons.push(new Weapon("summon", summonMoves, summonCSV));
      weapons.push(new Weapon("sword", swordMoves, swordCSV));

      let topFFXI = {};
      topFFXI["war"] = new Job("warrior", "war", util.getWeapons("warrior", weapons, jobWeaponMapping), warWsLvl);
      topFFXI["thf"] = new Job("thief", "thf", util.getWeapons("thief", weapons, jobWeaponMapping), thfWsLvl);
      topFFXI["drk"] = new Job("dark knight", "drk", util.getWeapons("dark knight", weapons, jobWeaponMapping), drkWsLvl);
      topFFXI["pld"] = new Job("paladin", "pld", util.getWeapons("paladin", weapons, jobWeaponMapping), pldWsLvl);
      topFFXI["bst"] = new Job("beast master", "bst", util.getWeapons("beast master", weapons, jobWeaponMapping), bstWsLvl);

      topFFXI["drg"] = new Job("dragoon", "drg", util.getWeapons("dragoon", weapons, jobWeaponMapping), drgWsLvl);
      topFFXI["mnk"] = new Job("monk", "mnk", util.getWeapons("monk", weapons, jobWeaponMapping), mnkWsLvl);
      topFFXI["nin"] = new Job("ninja", "nin", util.getWeapons("ninja", weapons, jobWeaponMapping), ninWsLvl);
      topFFXI["rdm"] = new Job("red mage", "rdm", util.getWeapons("red mage", weapons, jobWeaponMapping), rdmWsLvl);
      topFFXI["rng"] = new Job("ranger", "rng", util.getWeapons("ranger", weapons, jobWeaponMapping), rngWsLvl);
      topFFXI["sam"] = new Job("samurai", "sam", util.getWeapons("samurai", weapons, jobWeaponMapping), samWsLvl);

      topFFXI["smn"] = new Job("summoner", "snm", util.getWeapons("summoner", weapons, jobWeaponMapping), smnWsLvl);

      console.log(topFFXI);
      setFFXI(topFFXI);

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

          if (targetID === "chara" || targetID === "charaobj") {
            position = "left";
          } else {
            position = "right";
          }

          handleCharacterSelect(draggable, position, topFFXI);
        });
      });
    }
  }, [doneLoading]);

  const moveChanged = (e) => {
    let str = e.target.value.split("_");
    let jobName = str[0];
    let weaponName = str[1].trim();

    if (selectedJob1.name == jobName) {
      let weapons = selectedJob1.weapons.filter((w) => w.name == weaponName);
      setWeapon1(weapons[0].moves);
    } else if (selectedJob2.name == jobName) {
      let weapons = selectedJob2.weapons.filter((w) => w.name == weaponName);
      setWeapon2(weapons[0].moves);
    }
  };

  const selectPartyMemeber = (e) => {
    if (e.target.checked) {
      if (Object.keys(selectedJob1).length == 0) {
        console.log(e.target.value);
        setJob1(ffxi[e.target.value]);
        console.log(ffxi["pld"].weapons[0].moves);
        setWeapon1(ffxi[e.target.value].weapons[0].moves);
      } else if (Object.keys(selectedJob2).length == 0) {
        console.log(e.target.value);
        setJob2(ffxi[e.target.value]);
        setWeapon2(ffxi[e.target.value].weapons[0].moves);
      }
    } else {
      if (Object.keys(selectedJob2).length != 0) {
        setJob2({});
        setWeapon2([]);
      } else if (Object.keys(selectedJob1).length != 0) {
        setJob1({});
        setWeapon1([]);
      }
    }
  };

  const normalizeWeaponsSkillName = (wsName) => {
    wsName = wsName.replace("*", "");
    wsName = wsName.toLowerCase();
    wsName = wsName.trim();
    wsName = wsName.replace(" ", "-");
    return wsName;
  };
  const SkillchainResultsNew = (job1, job2, weapons1, weapons2) => {
    if (!job1.wsLevel || !job2.wsLevel || !weapons1 || !weapons2 || job1.wsLevel.length == 0 || job2.wsLevel.length == 0) {
      return [];
    }

    let skillchainsMap = {};

    for (let sc of lvl1sc) {
      skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
    }

    for (let sc of lvl2sc) {
      skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
    }

    for (let sc of lvl3sc) {
      skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
    }

    const weaponsSkillInfoJob1 = GetWeaponSkillInfoAtLevelForJob(job1, weapons1);
    console.log({ weaponsSkillInfoJob1 });

    const weaponsSkillInfoJob2 = GetWeaponSkillInfoAtLevelForJob(job2, weapons2);
    console.log({ weaponsSkillInfoJob2 });

    let skillchains = [];
    let skillChainsFormatted = {};

    for (const [key1, value1] of Object.entries(weaponsSkillInfoJob1)) {
      for (const [key2, value2] of Object.entries(weaponsSkillInfoJob2)) {
        let found = false;
        for (let i = 1; i <= 3; i++) {
          for (let j = 1; j <= 3; j++) {
            if (!found) {
              let elementKeyValue1 = "element" + i;
              let elementKeyValue2 = "element" + j;

              let compare = value1[elementKeyValue1] + " -> " + value2[elementKeyValue2];
              if (skillchainsMap[compare] != undefined) {
                let element = skillchainsMap[compare];
                skillchains.push(key1 + " -> " + key2 + " = " + skillchainsMap[compare]);

                if (!skillChainsFormatted[element]) {
                  skillChainsFormatted[element] = [];
                }

                let newSC = {
                  firstWs: key1,
                  secondWs: key2,
                  wsString: key1 + " -> " + key2 + " = " + skillchainsMap[compare],
                };
                let currentSCs = skillChainsFormatted[element];
                currentSCs.push(newSC);
                skillChainsFormatted[element] = currentSCs;

                found = true;
              }
            }
          }
        }
      }
    }
    //new comment

    return skillChainsFormatted;
  };

  const GetWeaponSkillInfoAtLevelForJob = (job, weapon) => {
    let selectJob1WsAtLvl = {};

    for (let i = 0; i < partyLevel; i++) {
      let wsAtLvl = job.wsLevel[i].ws;
      if (wsAtLvl.length > 0) {
        let wsAtLvlArr = wsAtLvl.split(",");
        wsAtLvlArr = wsAtLvlArr.map((ws) => normalizeWeaponsSkillName(ws));

        for (let ws of wsAtLvlArr) {
          let w1Elements = weapon.filter((w) => {
            let normalizedName = normalizeWeaponsSkillName(w.name);
            return normalizedName == ws;
          });
          let w1Element = w1Elements[0];

          if (w1Elements.length > 0) {
            selectJob1WsAtLvl[ws] = {
              exists: true,
              element1: w1Element.element1,
              element2: w1Element.element2,
              element3: w1Element.element3,
            };
          }
        }
      }
    }

    return selectJob1WsAtLvl;
  };

  let sc = SkillchainResultsNew(selectedJob1, selectedJob2, selectedWeapon1, selectedWeapon2);

  let cards = [];

  for (const [key, value] of Object.entries(sc)) {
    let card = (
      <MDBContainer>
        <MDBRow>
          <MDBCol size="col-md-1"></MDBCol>
          <MDBCol size="col-md-10">
            <MDBCard alignment="center">
              <MDBCardBody className="p-3 mb-2 bg-secondary bg-gradient text-white">
                <MDBCardTitle>
                  <p>
                    {key} {scMap[key]}
                    {/* <div class="orb"></div> */}
                  </p>
                </MDBCardTitle>

                {value.map((v) => {
                  return <MDBCardText>{v.wsString}</MDBCardText>;
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size="col-md-1"></MDBCol>
        </MDBRow>
      </MDBContainer>
    );
    cards.push(card);
  }

  let scOtherWay = SkillchainResultsNew(selectedJob2, selectedJob1, selectedWeapon2, selectedWeapon1);

  let cardsOtherWay = [];

  for (const [key, value] of Object.entries(scOtherWay)) {
    let card = (
      <MDBContainer>
        <MDBRow>
          <MDBCol size="col-md-1"></MDBCol>
          <MDBCol size="col-md-10">
            <MDBCard alignment="center">
              <MDBCardBody>
                <MDBCardTitle>
                  <p>
                    {key} {scMap[key]}
                    {/* <div class="orb"></div> */}
                  </p>
                </MDBCardTitle>

                {value.map((v) => {
                  return <MDBCardText>{v.wsString}</MDBCardText>;
                })}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size="col-md-1"></MDBCol>
        </MDBRow>
      </MDBContainer>
    );
    cardsOtherWay.push(card);
  }

  const handleCharacterSelect = (character, position, topFFXI) => {
    const clonedCharacterDiv = character.cloneNode(true);
    character.classList.remove("lastclicked");
    clonedCharacterDiv.classList.remove("lastclicked");
    clonedCharacterDiv.classList.remove("dragging");
    //clonedCharacterDiv.classList.remove("jobtile");

    leftrighttoggle = position;

    if (leftrighttoggle === "left") {
      let dropzone = document.querySelector(".chara");
      if (dropzone.hasChildNodes()) {
        dropzone.removeChild(dropzone.firstChild);
      }
      dropzone.appendChild(clonedCharacterDiv);
      console.log("DROPPED!");
      console.log(clonedCharacterDiv.id);

      setJob1(topFFXI[clonedCharacterDiv.id]);
      setWeapon1(topFFXI[clonedCharacterDiv.id].weapons[0].moves);

      // setJob1(ffxi[clonedCharacterDiv.id]);
      // setWeapon1(ffxi[clonedCharacterDiv.id].weapons[0].moves);
      clonedCharacterDiv.id = "charaobj";
      leftrighttoggle = "right";
    } else {
      let dropzone = document.querySelector(".charb");
      if (dropzone.hasChildNodes()) {
        dropzone.removeChild(dropzone.firstChild);
      }
      dropzone.appendChild(clonedCharacterDiv);

      setJob2(topFFXI[clonedCharacterDiv.id]);
      setWeapon2(topFFXI[clonedCharacterDiv.id].weapons[0].moves);

      // console.log(clonedCharacterDiv.id);
      // setJob2(ffxi[clonedCharacterDiv.id]);
      // setWeapon2(ffxi[clonedCharacterDiv.id].weapons[0].moves);
      leftrighttoggle = "left";
    }
    highlightTiles();
  };

  const highlightTiles = () => {
    const jobtiles = document.querySelectorAll(".jobtile");
    const dropzones = document.querySelectorAll(".dropzone");
    console.log(dropzones);
    var dropzoneValues = [];
    dropzones.forEach((dropzone) => {
      dropzoneValues.push(dropzone.firstChild.getAttribute("title"));
      console.log(dropzone.firstChild.getAttribute("title"));
    });

    hasDuplicates(jobtiles);
    function hasDuplicates(array) {
      for (var i = 0; i < array.length; i++) {
        var value = array[i].getAttribute("title");
        //console.log("Value:", value);
        //console.log("valuesSoFar", valuesSoFar);
        if (dropzoneValues.indexOf(value) !== -1) {
          //console.log("true");
          array[i].classList.add("selected");
        } else array[i].classList.remove("selected");
      }
    }
  };

  return (
    <div className="App">
      {/* <video autoplay muted id="myVideo">
        <source src="http://gdl.square-enix.com/ffxi/ffxi_bg_video/Tulia.mp4" type="video/mp4" />
      </video> */}

      <h1>FFXI Skillchain Calculator</h1>
      <h1>{selectedParty}</h1>
      <hr></hr>
      <MDBContainer>
        <h3>Your Party</h3>

        {/* <MDBRow>
          {Object.keys(ffxi).map((shortJob, i) => (
            <MDBCol size="md">
              <p>{ffxi[shortJob].name}</p>
              <input
                // disabled={Object.keys(selectedJob1).length == 0 && Object.keys(selectedJob2).length == 0}
                type="checkbox"
                name={ffxi[shortJob].name}
                value={shortJob}
                onChange={selectPartyMemeber}
              />

              <input
                // disabled={Object.keys(selectedJob1).length == 0 && Object.keys(selectedJob2).length == 0}
                type="checkbox"
                name={ffxi[shortJob].name}
                value={shortJob}
                onChange={selectPartyMemeber}
              />
            </MDBCol>
          ))}
        </MDBRow> */}

        <MDBRow>
          <CharacterTiles />
        </MDBRow>

        <div className="row gx-5 justify-content-center">
          <div className="dropzone col-6 chara" droppable="true" id="chara">
            Character A
          </div>
          <div className="dropzone col-6 charb" droppable="true" id="charb">
            Character B
          </div>
        </div>

        <hr></hr>

        <MDBRow>
          <MDBCol size="md">
            <JobWeaponSelect selectedJob={selectedJob1} moveChanged={moveChanged} />
          </MDBCol>

          <MDBCol size="md">
            <div style={{ width: 100, margin: "auto", padding: 20 }}>
              <MDBInput defaultValue={10} label="level" name="level" onChange={(e) => setPartyLevel(e.target.value)}></MDBInput>
            </div>
          </MDBCol>

          <MDBCol size="md">
            <JobWeaponSelect selectedJob={selectedJob2} moveChanged={moveChanged} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr></hr>
      <h3> Skillchains </h3>

      <hr />

      <div className="row">
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{selectedJob1.name && selectedJob2.name && selectedJob1.name + " -> " + selectedJob2.name}</h5>
          <div style={{ paddingTop: 20 }} />
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{selectedJob1.name && selectedJob2.name && selectedJob2.name + " -> " + selectedJob1.name}</h5>
          <>{cardsOtherWay}</>
        </div>
      </div>
    </div>
  );
}

export default App;
