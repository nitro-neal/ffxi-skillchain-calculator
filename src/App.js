import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import React, { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";

import crystal from "./crystal.png";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import JobWeaponSelect from "./components/JobWeaponSelect.js";
import CharacterTiles from "./components/CharacterTiles.js";
import SkillchainResults from "./components/SkillchainResults.js";
import SkillchainFilter from "./components/SkillchainFilter.js";
// Job images for mobile preview
import warImg from "./components/img/war.webp";
import bstImg from "./components/img/bst.webp";
import drgImg from "./components/img/drg.webp";
import drkImg from "./components/img/drk.webp";
import mnkImg from "./components/img/mnk.webp";
import ninImg from "./components/img/nin.webp";
import pldImg from "./components/img/pld.webp";
import rdmImg from "./components/img/rdm.webp";
import rngImg from "./components/img/rng.webp";
import samImg from "./components/img/sam.webp";
import smnImg from "./components/img/smn.webp";
import thfImg from "./components/img/thf.webp";

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

  const jobImageMap = {
    war: warImg,
    mnk: mnkImg,
    rdm: rdmImg,
    thf: thfImg,
    pld: pldImg,
    drk: drkImg,
    bst: bstImg,
    rng: rngImg,
    smn: smnImg,
    snm: smnImg,
    sam: samImg,
    nin: ninImg,
    drg: drgImg,
  };

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
      {/* Title */}
      <h1 className="ffxi-font app-title" style={{ paddingTop: "30px" }}>
        <img className="title-icon" style={{ maxWidth: "50px" }} src={crystal} alt="crystal" />
        <span className="title-text">FFXI Skillchain Calculator</span>
        <img className="title-icon" style={{ maxWidth: "50px" }} src={crystal} alt="crystal" />
      </h1>
      <hr></hr>

      <Box>
        {/* Desktop/Tablet (drag & drop) */}
        <MDBContainer className="d-none d-md-block">
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

        {/* Mobile: dropdown pickers */}
        <MDBContainer className="d-block d-md-none">
          <MDBRow className="justify-content-center">
            <MDBCol className="col-12">
              <p style={{ marginBottom: 8 }}>Pick two jobs</p>
            </MDBCol>
            <MDBCol className="col-12 mb-3 d-flex justify-content-center">
              <div className="gx-5 characterselect" style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 8, fontWeight: 600 }}>Party Member 1</div>
                {selectedJob1 && selectedJob1.shortName && jobImageMap[selectedJob1.shortName] && (
                  <img
                    className="mobile-job-image"
                    src={jobImageMap[selectedJob1.shortName]}
                    alt={util.formatJobName(selectedJob1.name)}
                  />
                )}
                <FormControl fullWidth>
                  <InputLabel id="job1-label">Job 1</InputLabel>
                  <Select
                    labelId="job1-label"
                    value={Object.keys(ffxi || {}).find((k) => ffxi[k] === selectedJob1) || ""}
                    onChange={(e) => {
                      const key = e.target.value;
                      if (ffxi && ffxi[key]) {
                        const job = ffxi[key];
                        setJob1(job);
                        if (job.weapons && job.weapons[0]) {
                          setWeapon1(job.weapons[0].moves);
                          setWeaponName1(util.formatWeaponName(job.weapons[0].name));
                        } else {
                          setWeapon1([]);
                          setWeaponName1("");
                        }
                      }
                    }}
                  >
                    {Object.keys(ffxi || {}).map((k) => (
                      <MenuItem key={k} value={k}>
                        {util.formatJobName(ffxi[k].name)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div style={{ marginTop: 12 }}>
                  <JobWeaponSelect
                    selectedJob={selectedJob1}
                    moveChanged={(e) => weaponChanged(e, "1")}
                  />
                </div>
              </div>
            </MDBCol>

            <MDBCol className="col-12 mb-3 d-flex justify-content-center">
              <div className="gx-5 characterselect" style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 8, fontWeight: 600 }}>Party Member 2</div>
                {selectedJob2 && selectedJob2.shortName && jobImageMap[selectedJob2.shortName] && (
                  <img
                    className="mobile-job-image"
                    src={jobImageMap[selectedJob2.shortName]}
                    alt={util.formatJobName(selectedJob2.name)}
                  />
                )}
                <FormControl fullWidth>
                  <InputLabel id="job2-label">Job 2</InputLabel>
                  <Select
                    labelId="job2-label"
                    value={Object.keys(ffxi || {}).find((k) => ffxi[k] === selectedJob2) || ""}
                    onChange={(e) => {
                      const key = e.target.value;
                      if (ffxi && ffxi[key]) {
                        const job = ffxi[key];
                        setJob2(job);
                        if (job.weapons && job.weapons[0]) {
                          setWeapon2(job.weapons[0].moves);
                          setWeaponName2(util.formatWeaponName(job.weapons[0].name));
                        } else {
                          setWeapon2([]);
                          setWeaponName2("");
                        }
                      }
                    }}
                  >
                    {Object.keys(ffxi || {}).map((k) => (
                      <MenuItem key={k} value={k}>
                        {util.formatJobName(ffxi[k].name)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div style={{ marginTop: 12 }}>
                  <JobWeaponSelect
                    selectedJob={selectedJob2}
                    moveChanged={(e) => weaponChanged(e, "2")}
                  />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
          <hr />
        </MDBContainer>
      </Box>
      <hr></hr>
      <h3> Skillchains </h3>

      <hr />
      <MDBCol size="md">
        <div style={{ width: 100, margin: "auto", padding: 20 }}>
          <MDBInput
            type="number"
            defaultValue={30}
            label="level"
            name="level"
            onChange={(e) => setPartyLevel(parseInt(e.target.value, 10) || 0)}
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
