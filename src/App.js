import "./App.css";
import React, { useState, useEffect } from "react";

import JobWeaponSelect from "./components/JobWeaponSelect.js";
import CharacterTiles from "./components/CharacterTiles.js";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

import * as util from "./Util.js";

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

  // Globals
  const [ffxi, setFFXI] = useState({});
  const [lvl1sc, setlvl1sc] = useState([]);
  const [lvl2sc, setlvl2sc] = useState([]);
  const [lvl3sc, setlvl3sc] = useState([]);

  // Character Selection
  let [leftrighttoggle, setleftrighttoggle] = useState("left");

  // UI
  const [partyLevel, setPartyLevel] = useState(30);
  const [selectedJob1, setJob1] = useState({});
  const [selectedJob2, setJob2] = useState({});
  const [selectedWeapon1, setWeapon1] = useState([]);
  const [selectedWeapon2, setWeapon2] = useState([]);

  useEffect(() => {
    // Async promise runs in background
    util.init().then((retObj) => {
      console.log("Init Promise Finished!");
      console.log({ ffix: retObj });

      // Select Charcter functions
      util.initDroppable(
        retObj.topFFXI,
        leftrighttoggle,
        setJob1,
        setJob2,
        setWeapon1,
        setWeapon2
      );

      setFFXI(retObj.topFFXI);
      setlvl1sc(retObj.lvl1sc);
      setlvl2sc(retObj.lvl2sc);
      setlvl3sc(retObj.lvl3sc);
    });

    console.log("DONE LOADING");
  }, []);

  const weaponChanged = (e) => {
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

  const normalizeWeaponsSkillName = (wsName) => {
    wsName = wsName.replace("*", "");
    wsName = wsName.toLowerCase();
    wsName = wsName.trim();
    wsName = wsName.replace(" ", "-");
    return wsName;
  };

  const SkillchainResultsNew = (job1, job2, weapons1, weapons2) => {
    console.log("SkillchainResultsNew CALLED");
    console.log(job1);
    console.log(job2);
    console.log(weapons1);
    console.log(weapons2);

    if (
      !job1.wsLevel ||
      !job2.wsLevel ||
      !weapons1 ||
      !weapons2 ||
      job1.wsLevel.length == 0 ||
      job2.wsLevel.length == 0
    ) {
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

    const weaponsSkillInfoJob1 = GetWeaponSkillInfoAtLevelForJob(
      job1,
      weapons1
    );
    console.log({ weaponsSkillInfoJob1 });

    const weaponsSkillInfoJob2 = GetWeaponSkillInfoAtLevelForJob(
      job2,
      weapons2
    );
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

              let compare =
                value1[elementKeyValue1] + " -> " + value2[elementKeyValue2];
              if (skillchainsMap[compare] != undefined) {
                let element = skillchainsMap[compare];
                skillchains.push(
                  key1 + " -> " + key2 + " = " + skillchainsMap[compare]
                );

                if (!skillChainsFormatted[element]) {
                  skillChainsFormatted[element] = [];
                }

                let newSC = {
                  firstWs: key1,
                  secondWs: key2,
                  wsString:
                    key1 + " -> " + key2 + " = " + skillchainsMap[compare],
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

  let sc = SkillchainResultsNew(
    selectedJob1,
    selectedJob2,
    selectedWeapon1,
    selectedWeapon2
  );

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

  let scOtherWay = SkillchainResultsNew(
    selectedJob2,
    selectedJob1,
    selectedWeapon2,
    selectedWeapon1
  );

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

  return (
    <div className="App" id="bg">
      {/* <video autoplay muted id="myVideo">
        <source
          src="http://gdl.square-enix.com/ffxi/ffxi_bg_video/Tulia.mp4"
          type="video/mp4"
        />
      </video> */}

      <h1>FFXI Skillchain Calculator</h1>
      <hr></hr>
      <MDBContainer>
        <h3>Your Party</h3>

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
            <JobWeaponSelect
              selectedJob={selectedJob1}
              moveChanged={weaponChanged}
            />
          </MDBCol>

          <MDBCol size="md">
            <div style={{ width: 100, margin: "auto", padding: 20 }}>
              <MDBInput
                defaultValue={30}
                label="level"
                name="level"
                onChange={(e) => setPartyLevel(e.target.value)}
              ></MDBInput>
            </div>
          </MDBCol>

          <MDBCol size="md">
            <JobWeaponSelect
              selectedJob={selectedJob2}
              moveChanged={weaponChanged}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr></hr>
      <h3> Skillchains </h3>

      <hr />

      <div className="row">
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>
            {selectedJob1.name &&
              selectedJob2.name &&
              selectedJob1.name + " -> " + selectedJob2.name}
          </h5>
          <div style={{ paddingTop: 20 }} />
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>
            {selectedJob1.name &&
              selectedJob2.name &&
              selectedJob2.name + " -> " + selectedJob1.name}
          </h5>
          <>{cardsOtherWay}</>
        </div>
      </div>
    </div>
  );
}

export default App;
