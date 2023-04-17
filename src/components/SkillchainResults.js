import React, { Fragment, ReactDOM, ReactMotion, useState, useEffect } from "react";
import "../App.css";
import arrow from "./img/arrow2tran.png";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from "mdb-react-ui-kit";

import * as util from "../Util.js";

import SkillchainFilter from "../components/SkillchainFilter.js";

function SkillchainResults(props) {
  const [selectedFilteredMoves, setSelectedFilteredMoves] = React.useState([]);

  let filteredMoves;
  let filteredMovesOtherWay;

  if (selectedFilteredMoves.length !== 0) {
    filteredMoves = util.filterByBothMoves(props.sc, selectedFilteredMoves);

    for (const [key, value] of Object.entries(filteredMoves)) {
      if (value.length == 0) {
        delete filteredMoves[key];
      }
    }

    filteredMovesOtherWay = util.filterByBothMoves(props.scOtherWay, selectedFilteredMoves);

    for (const [key, value] of Object.entries(filteredMovesOtherWay)) {
      if (value.length == 0) {
        delete filteredMovesOtherWay[key];
      }
    }
  } else {
    filteredMoves = props.sc;
    filteredMovesOtherWay = props.scOtherWay;
  }

  const changeFilter = (e) => {
    setSelectedFilteredMoves(e);
  };

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

  const lvl3SC = ["Light II", "Darkness II", "Light", "Darkness"];
  const lvl2SC = ["Fusion", "Fragmentation", "Gravitation", "Distortion"];
  const lvl1SC = ["Transfixion", "Induration", "Compression", "Detonation", "Liquefaction", "Impaction", "Reverberation", "Scission"];

  let cards = [];
  let cardsOtherWay = [];

  let titleCard = [];
  let titleCardOtherWay = [];

  if (props.selectedJob1.name && props.selectedJob2.name) {
    let title = (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol size="col-md" className="row titlecard">
            <MDBCol>
              <div style={{ fontSize: "35px" }} className="col">
                {util.formatJobName(props.selectedJob1.name)}
              </div>
              <div>{util.formatJobName(props.selectedWeaponName1)}</div>
            </MDBCol>
            <MDBCardImage className="col img-fluid" src={arrow} alt="..." style={{ maxWidth: "7em", maxHeight: "7em" }} />
            <MDBCol>
              <div style={{ fontSize: "35px" }} className="col">
                {util.formatJobName(props.selectedJob2.name)}
              </div>
              <div>{util.formatJobName(props.selectedWeaponName2)}</div>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
    titleCard.push(title);

    let titleOW = (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol size="col-md" className="row titlecard">
            <MDBCol>
              <div style={{ fontSize: "35px" }} className="col">
                {util.formatJobName(props.selectedJob2.name)}
              </div>
              <div>{util.formatJobName(props.selectedWeaponName2)}</div>
            </MDBCol>
            <MDBCardImage className="col img-fluid" src={arrow} alt="..." style={{ maxWidth: "7em", maxHeight: "7em" }} />
            <MDBCol>
              <div style={{ fontSize: "35px" }} className="col">
                {util.formatJobName(props.selectedJob1.name)}
              </div>
              <div>{util.formatJobName(props.selectedWeaponName1)}</div>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
    titleCardOtherWay.push(titleOW);
  }

  const orderedSC = {};

  for (const [key, value] of Object.entries(filteredMoves)) {
    if (lvl3SC.includes(key)) {
      orderedSC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filteredMoves)) {
    if (lvl2SC.includes(key)) {
      orderedSC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filteredMoves)) {
    if (lvl1SC.includes(key)) {
      orderedSC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(orderedSC)) {
    let grouped = util.groupByFirstWs(value);
    orderedSC[key] = grouped;
  }

  for (const [key, value] of Object.entries(orderedSC)) {
    let card = (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol size="col-md-1"></MDBCol>
          <MDBCol size="col-md-10 resultcard">
            <MDBCard alignment="center">
              <MDBCardBody>
                <MDBCardTitle>
                  <p>
                    {key} {scMap[key]}
                  </p>
                </MDBCardTitle>

                {value.map((v) => {
                  return (
                    <MDBCardText className="resultcard">
                      {v.map((o, index) => {
                        if (index == v.length - 1) {
                          return <p style={{ marginBottom: 0 }}>{util.formatWeaponSkillName(o.wsString)}</p>;
                        } else {
                          return <p>{util.formatWeaponSkillName(o.wsString)}</p>;
                        }
                      })}
                    </MDBCardText>
                  );
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

  const orderedOtherWaySC = {};
  for (const [key, value] of Object.entries(filteredMovesOtherWay)) {
    if (lvl3SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filteredMovesOtherWay)) {
    if (lvl2SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filteredMovesOtherWay)) {
    if (lvl1SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(orderedOtherWaySC)) {
    let grouped = util.groupByFirstWs(value);
    orderedOtherWaySC[key] = grouped;
  }

  for (const [key, value] of Object.entries(orderedOtherWaySC)) {
    let card = (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol size="col-md-1"></MDBCol>
          <MDBCol size="col-md-10 resultcard">
            <MDBCard alignment="center">
              <MDBCardBody>
                <MDBCardTitle>
                  <p>
                    {key} {scMap[key]}
                  </p>
                </MDBCardTitle>

                {value.map((v) => {
                  return (
                    <MDBCardText className="resultcard">
                      {v.map((o, index) => {
                        if (index == v.length - 1) {
                          return <p style={{ marginBottom: 0 }}>{util.formatWeaponSkillName(o.wsString)}</p>;
                        } else {
                          return <p>{util.formatWeaponSkillName(o.wsString)}</p>;
                        }
                      })}
                    </MDBCardText>
                  );
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

  let selectedJob2Ws = [];
  let selectedJob1Ws = [];
  for (const [key, value] of Object.entries(props.sc)) {
    for (let ws of value) {
      if (ws.firstWs) {
        selectedJob1Ws.push(ws.firstWs);
      }
    }
  }

  for (const [key, value] of Object.entries(props.scOtherWay)) {
    for (let ws of value) {
      if (ws.secondWs) {
        selectedJob1Ws.push(ws.secondWs);
      }
    }
  }

  for (const [key, value] of Object.entries(props.sc)) {
    for (let ws of value) {
      if (ws.secondWs) {
        selectedJob2Ws.push(ws.secondWs);
      }
    }
  }

  for (const [key, value] of Object.entries(props.scOtherWay)) {
    for (let ws of value) {
      if (ws.firstWs) {
        selectedJob2Ws.push(ws.firstdWs);
      }
    }
  }

  // dedupe
  selectedJob1Ws = Array.from(new Set(selectedJob1Ws));
  selectedJob1Ws = selectedJob1Ws.filter((value) => value !== undefined);

  selectedJob2Ws = Array.from(new Set(selectedJob2Ws));
  selectedJob2Ws = selectedJob2Ws.filter((value) => value !== undefined);

  let allWs = selectedJob1Ws.concat(selectedJob2Ws);
  allWs = allWs.filter((value) => value !== undefined);

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <>{titleCard}</>
        </div>
        <div className="col-md-6">
          <>{titleCardOtherWay}</>
        </div>
      </div>

      <SkillchainFilter selectedJob1={props.selectedJob1.name} selectedJob2={props.selectedJob2.name} selectedJobWs={allWs} selectedJob1Ws={selectedJob1Ws} selectedJob2Ws={selectedJob2Ws} changeFilter={changeFilter} />

      <div className="row">
        <div className="col-md-6">
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <>{cardsOtherWay}</>
        </div>
      </div>
    </Fragment>
  );
}

export default SkillchainResults;
