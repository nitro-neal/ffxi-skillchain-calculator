import "./App.css";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import JobWeaponSelect from "./components/JobWeaponSelect.js";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

// skillchains
import lvl1skillchainsCSV from "./skillchain-info/lvl1skillchains.csv";

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

function App() {
  // CSVs
  const [lvl1sc, setlvl1sc] = useState([]);

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
  const [scythMoves, setScytheMoves] = useState([]);
  const [staffMoves, setStaffMoves] = useState([]);
  const [summonMoves, setSummonMoves] = useState([]);
  const [swordMoves, setSwordMoves] = useState([]);

  const [jobWeapon, setJobWeapons] = useState([]);

  const [warWsLvl, setWarWsLvl] = useState([]);
  const [thfWsLvl, setThfWsLvl] = useState([]);

  // UI
  const [partyLevel, setPartyLevel] = useState(10);
  const [selectedJob1, setJob1] = useState([]);
  const [selectedJob2, setJob2] = useState([]);
  const [selectedWeapon1, setWeapon1] = useState([]);
  const [selectedWeapon2, setWeapon2] = useState([]);

  useEffect(() => {
    // Parse Weapons
    Papa.parse(archeryCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setArcheryMoves(results.data);
      },
    });

    Papa.parse(axeCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setAxeMoves(results.data);
      },
    });

    Papa.parse(clubCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setClubMoves(results.data);
      },
    });

    Papa.parse(daggerCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setDaggerMoves(results.data);
      },
    });

    Papa.parse(greatAxeCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setGreatAxeMoves(results.data);

        // TODO: Move this somewhere else
        setWeapon1(results.data);
      },
    });

    Papa.parse(greatKatanaCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setGreatKatanaMoves(results.data);
      },
    });

    Papa.parse(greatSwordCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setGreatSwordMoves(results.data);
      },
    });

    Papa.parse(handToHandCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setHandToHandMoves(results.data);
      },
    });

    Papa.parse(katanaCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setKatanaMoves(results.data);
      },
    });

    Papa.parse(marksmanshipCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setMarksmanshipMoves(results.data);
      },
    });

    Papa.parse(polearmCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setPolearmMoves(results.data);
      },
    });

    Papa.parse(scytheCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setScytheMoves(results.data);
      },
    });

    Papa.parse(staffCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setStaffMoves(results.data);
      },
    });

    Papa.parse(summonCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setSummonMoves(results.data);
      },
    });

    Papa.parse(swordCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setSwordMoves(results.data);

        // TODO: Move this somewhere else
        setWeapon2(results.data);
      },
    });

    Papa.parse(lvl1skillchainsCSV, {
      download: true,
      header: true,
      complete: (results) => {
        setlvl1sc(results.data);
      },
    });

    Papa.parse(jobWeaponCSV, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results);
        setJobWeapons(results.data);
      },
    });

    Papa.parse(warWsCSV, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results.data);
        console.log(results);
        setWarWsLvl(results.data);

        // TODO: Move this somewhere else
        setJob1(results.data);
      },
    });

    Papa.parse(thfWsCSV, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results);
        setThfWsLvl(results.data);

        // TODO: Move this somewhere else
        setJob2(results.data);
      },
    });
  }, []);

  const moveChanged = (e) => {
    let weapon = e.target.value.trim();

    if (weapon == "archery") {
      setWeapon1(archeryMoves);
    }

    if (weapon == "axe") {
      setWeapon1(axeMoves);
    }

    if (weapon == "club") {
      setWeapon1(clubMoves);
    }

    if (weapon == "dagger") {
      setWeapon1(daggerMoves);
    }

    if (weapon == "great axe") {
      setWeapon1(greatAxeMoves);
    }

    if (weapon == "great katana") {
      setWeapon1(greatKatanaMoves);
    }

    if (weapon == "great sword") {
      setWeapon1(greatSwordMoves);
    }

    if (weapon == "hand to hand") {
      setWeapon1(handToHandMoves);
    }

    if (weapon == "katana") {
      setWeapon1(katanaMoves);
    }

    if (weapon == "marksmanship") {
      setWeapon1(marksmanshipMoves);
    }

    if (weapon == "polearm") {
      setWeapon1(polearmMoves);
    }

    if (weapon == "scythe") {
      setWeapon1(scythMoves);
    }

    if (weapon == "staff") {
      setWeapon1(staffMoves);
    }

    if (weapon == "summon") {
      setWeapon1(summonMoves);
    }

    if (weapon == "sword") {
      setWeapon1(swordMoves);
    }
  };

  const SkillchainResults = (job1WsLvl, job2WsLvl, weaponOne, weaponTwo) => {
    if (
      !job1WsLvl ||
      !job2WsLvl ||
      !weaponOne ||
      !weaponTwo ||
      job1WsLvl.length == 0 ||
      job2WsLvl.length == 0
    ) {
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
          if (
            !skillchains.includes(names + " = " + lvl1skillchainsMap[compare])
          ) {
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
      <hr></hr>
      <MDBContainer>
        <h3>Your Party</h3>
        <MDBRow>
          {jobWeapon &&
            jobWeapon.map(function (jw, i) {
              return (
                <MDBCol size="md">
                  <JobWeaponSelect jobSelect={jw} moveChanged={moveChanged} />
                </MDBCol>
              );
            })}
        </MDBRow>
        <hr></hr>
        <MDBRow>
          <div style={{ width: 100, margin: "auto" }}>
            <MDBInput
              defaultValue={10}
              label="level"
              name="level"
              onChange={(e) => setPartyLevel(e.target.value)}
            ></MDBInput>
          </div>
        </MDBRow>
      </MDBContainer>
      <hr></hr>
      <h3> Skillchains </h3>
      <p> Axe moves </p>

      <p> Results </p>
      <div>
        {SkillchainResults(
          selectedJob1,
          selectedJob2,
          selectedWeapon1,
          selectedWeapon2,
          lvl1sc
        ).map(function (sc, i) {
          return <p>{sc}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
