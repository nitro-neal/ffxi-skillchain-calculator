import React, { Fragment, ReactDOM, ReactMotion, useState, useEffect } from "react";
import "../App.css";

import war from "./img/war.webp";
import bst from "./img/bst.webp";
import drg from "./img/drg.webp";
import drk from "./img/drk.webp";
import mnk from "./img/mnk.webp";
import nin from "./img/nin.webp";
import pld from "./img/pld.webp";
import rdm from "./img/rdm.webp";
import rng from "./img/rng.webp";
import sam from "./img/sam.webp";
import smn from "./img/smn.webp";
import thf from "./img/thf.webp";
import whm from "./img/whm.webp";
import blm from "./img/blm.webp";
import brd from "./img/brd.webp";

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBRipple, MDBCardHeader, MDBCardFooter } from "mdb-react-ui-kit";
import { Slide, imageListClasses } from "@mui/material";

function CharacterTiles() {
  const [jobtiles, setjobtiles] = useState([
    { Name: "Warrior", id: "war", value: "war", img: war },
    { Name: "Monk", id: "mnk", value: "mnk", img: mnk },
    { Name: "Red Mage", id: "rdm", value: "rdm", img: rdm },
    { Name: "Thief", id: "thf", value: "thf", img: thf },
    { Name: "Ranger", id: "rng", value: "rng", img: rng },
    { Name: "Summoner", id: "smn", value: "smn", img: smn },
    { Name: "Paladin", id: "pld", value: "pld", img: pld },
    { Name: "Dark Knight", id: "drk", value: "drk", img: drk },
    { Name: "Beast Master", id: "bst", value: "bst", img: bst },
    { Name: "Samurai", id: "sam", value: "sam", img: sam },
    { Name: "Ninja", id: "nin", value: "nin", img: nin },
    { Name: "Dragoon", id: "drg", value: "drg", img: drg },
  ]);

  const topROW = [];
  const bottomROW = [];

  for (let i = 0; i < jobtiles.length / 2; i++) {
    topROW.push(
      <div draggable="true" className="jobtile col" value={jobtiles[i].value} id={jobtiles[i].id} title={jobtiles[i].Name}>
        <MDBCard>
          <MDBCardImage className="img-fluid" src={jobtiles[i].img} position="top" alt="..." style={{ maxWidth: "15em", maxHeight: "15em" }} />
          <MDBCardBody>
            <MDBCardTitle>{jobtiles[i].Name}</MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }

  for (let i = jobtiles.length / 2; i < jobtiles.length; i++) {
    bottomROW.push(
      <div draggable="true" className="jobtile col" value={jobtiles[i].value} id={jobtiles[i].id} title={jobtiles[i].Name}>
        <MDBCard>
          <MDBCardImage className="img-fluid" src={jobtiles[i].img} position="top" alt="..." style={{ maxWidth: "15em", maxHeight: "15em" }} />
          <MDBCardBody>
            <MDBCardTitle>{jobtiles[i].Name}</MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }

  return (
    <Fragment>
      <Slide timeout={400} direction="right" in={true}>
        <div className="row">{topROW}</div>
      </Slide>

      <Slide timeout={400} direction="left" in={true}>
        <div className="row">{bottomROW}</div>
      </Slide>
    </Fragment>
  );
}

export default CharacterTiles;
