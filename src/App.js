import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";

import crystal from "./crystal.png";

import Box from "@mui/material/Box";
import JobWeaponSelect from "./components/JobWeaponSelect.js";
import CharacterTiles from "./components/CharacterTiles.js";
import SkillchainResults from "./components/SkillchainResults.js";
import SkillchainFilter from "./components/SkillchainFilter.js";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";

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
  const [selectedWeaponName1, setWeaponName1] = useState([]);
  const [selectedWeaponName2, setWeaponName2] = useState([]);
  const [isShown, setIsShown] = useState(false);

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
        setWeapon2,
        setWeaponName1,
        setWeaponName2
      );

      setFFXI(retObj.topFFXI);
      setlvl1sc(retObj.lvl1sc);
      setlvl2sc(retObj.lvl2sc);
      setlvl3sc(retObj.lvl3sc);
    });

    console.log("DONE LOADING");
  }, []);

  const weaponChanged = (e, oneOrTwo) => {
    console.log(e.target.value);
    console.log(oneOrTwo);

    let str = e.target.value.split("_");
    let jobName = str[0];
    let weaponName = str[1];
    console.log("Weapon Change Function Fired");
    console.log("Name:", weaponName);

    if (oneOrTwo == 1) {
      let weapons = selectedJob1.weapons.filter(
        (w) => w.name == weaponName.trim()
      );
      setWeaponName1(util.formatWeaponName(weaponName));
      setWeapon1(weapons[0].moves);
    } else {
      let weapons = selectedJob2.weapons.filter(
        (w) => w.name == weaponName.trim()
      );
      setWeaponName2(util.formatWeaponName(weaponName));
      setWeapon2(weapons[0].moves);
    }
  };

  let sc = scCalc.getSkillchainResults(
    selectedJob1,
    selectedJob2,
    selectedWeapon1,
    selectedWeapon2,
    lvl1sc,
    lvl2sc,
    lvl3sc,
    partyLevel
  );
  let scOtherWay = scCalc.getSkillchainResults(
    selectedJob2,
    selectedJob1,
    selectedWeapon2,
    selectedWeapon1,
    lvl1sc,
    lvl2sc,
    lvl3sc,
    partyLevel
  );

  return (
    <div className="App ffxi-font" id="bg">
      <header>
        <div class="nav-container">
          <MDBContainer>
            <MDBRow>
              <MDBCol className="col-sm-1">
                <a href="/" class="nav-link ffxi-font">
                  Home
                </a>
              </MDBCol>
              <MDBCol className="col-sm-1">
                <a href="/chatbot" class="nav-link ffxi-font">
                  Chatbot
                </a>
              </MDBCol>

              <MDBCol className="col-sm-1"></MDBCol>
              <MDBCol className="col-sm-1"></MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </header>

      <h1 className="ffxi-font" style={{ paddingTop: "30px" }}>
        <img style={{ maxWidth: "50px" }} src={crystal}></img>FFXI Skillchain
        Calculator
        <img style={{ maxWidth: "50px" }} src={crystal}></img>
      </h1>
      <hr></hr>

      <Box>
        {/* <Slide direction="right" in={true}> */}
        <MDBContainer>
          <MDBRow>
            <CharacterTiles />
          </MDBRow>

          <MDBRow>
            <MDBCol size="md" className="d-flex justify-content-center">
              <div className="gx-5 col-6 characterselect">
                <div className="dropzone chara" droppable="true" id="chara">
                  <p>Drag Party Member Here</p>
                </div>
                <JobWeaponSelect
                  selectedJob={selectedJob1}
                  moveChanged={(e) => weaponChanged(e, "1")}
                />
              </div>

              <MDBBtn
                size="sm"
                color="danger"
                style={{ marginLeft: -40, marginTop: 20 }}
                floating
                tag="a"
                onClick={(e) => {
                  setJob1({});
                  setWeapon1({});
                  util.resetCharacterTile("left");
                }}
              >
                <MDBIcon fas icon="close" />
              </MDBBtn>
            </MDBCol>

            <MDBCol size="md" className="d-flex justify-content-center">
              <div className="gx-5 col-6 characterselect">
                <div className="dropzone charb" droppable="true" id="charb">
                  <p>Drag Party Member Here</p>
                </div>
                <JobWeaponSelect
                  selectedJob={selectedJob2}
                  moveChanged={(e) => weaponChanged(e, "2")}
                />
              </div>
              <MDBBtn
                size="sm"
                color="danger"
                style={{ marginLeft: -50, marginTop: 20 }}
                floating
                tag="a"
                onClick={(e) => {
                  setJob2({});
                  setWeapon2({});
                  util.resetCharacterTile("right");
                }}
              >
                <MDBIcon fas icon="close" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          <hr></hr>
        </MDBContainer>
        {/* </Slide> */}
      </Box>
      <hr></hr>
      <h3> Skillchains </h3>

      <hr />
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

      {Object.keys(selectedJob1).length !== 0 &&
        Object.keys(selectedJob2).length !== 0 && (
          <SkillchainResults
            ffxi={ffxi}
            sc={sc}
            scOtherWay={scOtherWay}
            selectedJob1={selectedJob1}
            selectedJob2={selectedJob2}
            selectedWeaponName1={selectedWeaponName1}
            selectedWeaponName2={selectedWeaponName2}
          />
        )}
    </div>
  );
}

export default App;
