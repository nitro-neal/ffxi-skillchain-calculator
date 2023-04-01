import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";

import Box from "@mui/material/Box";
import JobWeaponSelect from "./components/JobWeaponSelect.js";
import CharacterTiles from "./components/CharacterTiles.js";
import SkillchainResults from "./components/SkillchainResults.js";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

import * as util from "./Util.js";
import * as scCalc from "./SkillchainCalc.js";

function App() {
  // Globalsz
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
      util.initDroppable(retObj.topFFXI, leftrighttoggle, setJob1, setJob2, setWeapon1, setWeapon2);

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

  let sc = scCalc.getSkillchainResults(selectedJob1, selectedJob2, selectedWeapon1, selectedWeapon2, lvl1sc, lvl2sc, lvl3sc, partyLevel);
  let scOtherWay = scCalc.getSkillchainResults(selectedJob2, selectedJob1, selectedWeapon2, selectedWeapon1, lvl1sc, lvl2sc, lvl3sc, partyLevel);

  return (
    <div className="App ffxi-font" id="bg">
      <h1 className="ffxi-font">FFXI Skillchain Calculator</h1>
      <hr></hr>

      <Box>
        <Slide direction="up" in={true}>
          <MDBContainer>
            <MDBRow>
              <CharacterTiles />
            </MDBRow>

            <p>Your Party</p>

            <MDBRow>
              <MDBCol size="md">
                <div className="row gx-5 justify-content-center">
                  <div className="dropzone col-6 chara" droppable="true" id="chara">
                    <p>Drag Party Member Here</p>
                  </div>
                </div>
                <JobWeaponSelect selectedJob={selectedJob1} moveChanged={weaponChanged} />
              </MDBCol>

              <MDBCol size="md">
                <div className="row gx-5 justify-content-center">
                  <div className="dropzone col-6 charb" droppable="true" id="charb">
                    <p>Drag Party Member Here</p>
                  </div>
                </div>
                <JobWeaponSelect selectedJob={selectedJob2} moveChanged={weaponChanged} />
              </MDBCol>
            </MDBRow>

            <MDBCol size="md">
              <div style={{ width: 100, margin: "auto", padding: 20 }}>
                <MDBInput defaultValue={30} label="level" name="level" onChange={(e) => setPartyLevel(e.target.value)}></MDBInput>
              </div>
            </MDBCol>

            <hr></hr>
          </MDBContainer>
        </Slide>
      </Box>
      <hr></hr>
      <h3> Skillchains </h3>

      <hr />

      <SkillchainResults sc={sc} scOtherWay={scOtherWay} selectedJob1={selectedJob1} selectedJob2={selectedJob2} />
    </div>
  );
}

export default App;
