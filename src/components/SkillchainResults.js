import React, { Fragment, ReactDOM, ReactMotion, useState, useEffect } from "react";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

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

  let cards = [];
  let cardsOtherWay = [];

  for (const [key, value] of Object.entries(props.sc)) {
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

  for (const [key, value] of Object.entries(props.scOtherWay)) {
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
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{props.selectedJob1.name && props.selectedJob2.name && props.selectedJob1.name + " -> " + props.selectedJob2.name}</h5>
          <div style={{ paddingTop: 20 }} />
          <>{cards}</>
        </div>
        <div className="col-md-6">
          <h5 style={{ paddingTop: 30 }}>{props.selectedJob1.name && props.selectedJob2.name && props.selectedJob2.name + " -> " + props.selectedJob1.name}</h5>
          <>{cardsOtherWay}</>
        </div>
      </div>
    </Fragment>
  );
}

export default SkillchainResults;
