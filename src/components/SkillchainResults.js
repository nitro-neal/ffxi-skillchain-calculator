import React, { Fragment, ReactDOM, ReactMotion, useState, useEffect } from "react";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

import * as util from "../Util.js";

function SkillchainResults(props) {
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

  const orderedSC = {};

  for (const [key, value] of Object.entries(props.sc)) {
    if (lvl3SC.includes(key)) {
      orderedSC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(props.sc)) {
    if (lvl2SC.includes(key)) {
      orderedSC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(props.sc)) {
    if (lvl1SC.includes(key)) {
      orderedSC[key] = value;
    }
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
                  return <MDBCardText className="resultcard">{util.formatWeaponSkillName(v.wsString)}</MDBCardText>;
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
  for (const [key, value] of Object.entries(props.scOtherWay)) {
    if (lvl3SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(props.scOtherWay)) {
    if (lvl2SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
  }

  for (const [key, value] of Object.entries(props.scOtherWay)) {
    if (lvl1SC.includes(key)) {
      orderedOtherWaySC[key] = value;
    }
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
                  return <MDBCardText className="resultcard">{util.formatWeaponSkillName(v.wsString)}</MDBCardText>;
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
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{props.selectedJob1.name && props.selectedJob2.name && util.formatJobName(props.selectedJob1.name) + " -> " + util.formatJobName(props.selectedJob2.name)}</h5>
          <div style={{ paddingTop: 20 }} />
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{props.selectedJob1.name && props.selectedJob2.name && util.formatJobName(props.selectedJob2.name) + " -> " + util.formatJobName(props.selectedJob1.name)}</h5>
          <div style={{ paddingTop: 20 }} />
          <>{cardsOtherWay}</>
        </div>
      </div>
    </Fragment>
  );
}

export default SkillchainResults;
