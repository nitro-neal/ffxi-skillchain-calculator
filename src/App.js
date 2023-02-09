import "./App.css";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import JobWeaponSelect from "./components/JobWeaponSelect.js";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

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

// skillchains
import lvl1skillchainsCSV from "./skillchain-info/lvl1skillchains.csv";

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
  lvl1skillchainsCSV,
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

  const [lvl1sc, setlvl1sc] = useState([]);

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

        await setlvl1sc(results[27].data);
        await setDoneLoading(true);
      })
      .catch(
        //log the error
        (err) => console.warn("Something went wrong:", err)
      );
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

      console.log(topFFXI);
      setFFXI(topFFXI);
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

  const swap = (e) => {
    let tmpJob = selectedJob1;
    let tmpWeapon = selectedWeapon1;

    setJob1(selectedJob2);
    setWeapon1(selectedWeapon2);

    setJob2(tmpJob);
    setWeapon2(tmpWeapon);
  };

  const selectPartyMemeber = (e) => {
    if (e.target.checked) {
      if (Object.keys(selectedJob1).length == 0) {
        setJob1(ffxi[e.target.value]);
        setWeapon1(ffxi[e.target.value].weapons[0].moves);
      } else if (Object.keys(selectedJob2).length == 0) {
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

  const SkillchainResults = (job1, job2, weaponOne, weaponTwo) => {
    let job1WsLvl = job1.wsLevel;
    let job2WsLvl = job2.wsLevel;

    if (!job1WsLvl || !job2WsLvl || !weaponOne || !weaponTwo || job1WsLvl.length == 0 || job2WsLvl.length == 0) {
      return [];
    }

    let lvl1skillchainsMap = {};

    for (let sc of lvl1sc) {
      lvl1skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
    }

    let skillchains = [];

    let selectJob1WsAtLvl = {};
    for (let i = 0; i < partyLevel; i++) {
      let wsAtLvl = job1WsLvl[i].ws;
      if (wsAtLvl.length > 0) {
        let wsAtLvlArr = wsAtLvl.split(",");

        wsAtLvlArr = wsAtLvlArr.map((ws) => ws.replace("*", ""));
        wsAtLvlArr = wsAtLvlArr.map((ws) => ws.toLowerCase());
        wsAtLvlArr = wsAtLvlArr.map((ws) => ws.trim());
        wsAtLvlArr = wsAtLvlArr.map((ws) => ws.replace(" ", "-"));

        for (let ws of wsAtLvlArr) {
          selectJob1WsAtLvl[ws] = true;
        }
      }
    }

    let weaponOneAtLvl = [];
    for (let w1 of weaponOne) {
      let w1NameFixed = w1.name;
      w1NameFixed = w1NameFixed.replace("*", "");
      w1NameFixed = w1NameFixed.toLowerCase();
      w1NameFixed = w1NameFixed.trim();
      w1NameFixed = w1NameFixed.replace(" ", "-");

      if (selectJob1WsAtLvl[w1NameFixed] == true) {
        weaponOneAtLvl.push(w1);
      }
    }

    for (let w1 of weaponOneAtLvl) {
      for (let w2 of weaponTwo) {
        let compare = w1.element1 + " -> " + w2.element1;
        if (lvl1skillchainsMap[compare] != undefined) {
          let names = w1.name + " -> " + w2.name;
          if (!skillchains.includes(names + " = " + lvl1skillchainsMap[compare])) {
            skillchains.push(names + " = " + lvl1skillchainsMap[compare]);
          }
        }
      }
    }
    return skillchains;
  };

  return (
    <div className="App">
      <h1>FFXI Skillchain Calculator</h1>
      <h1>{selectedParty}</h1>
      <hr></hr>
      <MDBContainer>
        <h3>Your Party</h3>

        <MDBRow>
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
            </MDBCol>
          ))}
        </MDBRow>

        <hr></hr>

        <MDBRow>
          <MDBCol size="md">
            <JobWeaponSelect selectedJob={selectedJob1} moveChanged={moveChanged} />
          </MDBCol>
          <MDBCol size="md">
            <button onClick={swap}> {"<-swap->"} </button>
          </MDBCol>
          <MDBCol size="md">
            <JobWeaponSelect selectedJob={selectedJob2} moveChanged={moveChanged} />
          </MDBCol>
        </MDBRow>
        <hr></hr>
        <MDBRow>
          <div style={{ width: 100, margin: "auto" }}>
            <MDBInput defaultValue={10} label="level" name="level" onChange={(e) => setPartyLevel(e.target.value)}></MDBInput>
          </div>
        </MDBRow>
      </MDBContainer>
      <hr></hr>
      <h3> Skillchains </h3>

      <p> Results </p>
      <div>
        {SkillchainResults(selectedJob1, selectedJob2, selectedWeapon1, selectedWeapon2, lvl1sc).map(function (sc, i) {
          return <p>{sc}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
