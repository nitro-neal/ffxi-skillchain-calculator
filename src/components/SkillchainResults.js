import React, {
  Fragment,
  ReactDOM,
  ReactMotion,
  useState,
  useEffect,
} from "react";
import "../App.css";
import arrow from "./img/arrow2tran.png";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

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
  const lvl1SC = [
    "Transfixion",
    "Induration",
    "Compression",
    "Detonation",
    "Liquefaction",
    "Impaction",
    "Reverberation",
    "Scission",
  ];

  let cards = [];
  let cardsOtherWay = [];

  let titleCard = [];
  let titleCardOtherWay = [];

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

  if (props.selectedJob1.name && props.selectedJob2.name) {
    console.log("weapon 1", props.selectedWeaponName1);
    console.log("weapon 2", props.selectedWeaponName2);

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
            <MDBCardImage
              className="col img-fluid"
              src={arrow}
              alt="..."
              style={{ maxWidth: "7em", maxHeight: "7em" }}
            />
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
            <MDBCardImage
              className="col img-fluid"
              src={arrow}
              alt="..."
              style={{ maxWidth: "7em", maxHeight: "7em" }}
            />
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
                      {util.formatWeaponSkillName(v.wsString)}
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
                  return (
                    <MDBCardText className="resultcard">
                      {util.formatWeaponSkillName(v.wsString)}
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

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <>{titleCard}</>
          <div style={{ paddingTop: 20 }} />
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <>{titleCardOtherWay}</>
          <div style={{ paddingTop: 20 }} />
          <>{cardsOtherWay}</>
        </div>
      </div>
    </Fragment>
  );
}

export default SkillchainResults;
