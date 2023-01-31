import './App.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import axe from './skillchain-info/axe.csv';
import sword from './skillchain-info/sword.csv';
import lvl1skillchains from './skillchain-info/lvl1skillchains.csv';

// let axe = 
//   `lvl,name,element1,element2,element3
//   5,Raging Axe,Detonation,Impaction,-
//   40,Smash Axe,Induration,Reverberation,-
//   70,Gale Axe,Detonation,-,-
//   100,Avalanche Axe,Scission,Impaction,-
//   150,Spinning Axe,Liquefaction,Scission,Impaction
//   175,Rampage,Scission,-,-
//   200,Calamity,Scission,Impaction,-
//   225,Mistral Axe,Fusion,-,-
//   240,Decimation,Fusion,Reverberation,-
//   290,Bora Axe,Scission,Detonation,-
//   357,Ruinator,Distortion,Detonation,-`

// let sword = 
//   `lvl,name,element1,element2,element3
//   5,Fast Blade,Scission,-
//   30,Burning Blade,Liquefaction,-
//   50,Red Lotus Blade,Liquefaction,Detonation
//   75,Flat Blade,Impaction,-
//   100,Shining Blade,Scission,-
//   125,Seraph Blade,Scission,-
//   150,Circle Blade,Reverberation,Impaction
//   175,Spirits Within,-,-
//   200,Vorpal Blade,Scission,Impaction
//   225,Swift Blade,Gravitation,-
//   240,Savage Blade,Fragmentation,Scission
//   300,Sanguine Blade,-,-
//   357,Requiescat,Gravitation,Scission`


// let lvl1skillchains =
// `ws1,ws2,result
// Impaction,Liquefaction,Liquefaction
// Scission,Liquefaction,Liquefaction
// Reverberation,Impaction,Impaction
// Induration,Impaction,Impaction
// Impaction,Detonation,Detonation
// Compression,Detonation,Detonation
// Scission,Detonation,Detonation
// Liquefaction,Scission,Scission
// Detonation,Scission,Scission
// Transfixion,Reverberation,Reverberation
// Scission,Reverberation,Reverberation
// Reverberation,Induration,Induration
// Induration,Compression,Compression
// Transfixion,Compression,Compression
// Compression,Transfixion,Transfixion`



function SkillchainResults(weaponOne, weaponTwo, lvl1sc) {
  let lvl1skillchainsMap = {}

  for (let sc of lvl1sc) {
    console.log(sc)
    lvl1skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result
  }

  let skillchains = []
  for(let w1 of weaponOne) {
    console.log(w1)
    for(let w2 of weaponTwo) {

      let compare = w1.element1 + " -> " + w2.element1
      if (lvl1skillchainsMap[compare] != undefined) {

        let names = w1.name + " -> " + w2.name
        if (!skillchains.includes(names + " = " + lvl1skillchainsMap[compare])) {
          skillchains.push(names + " = " + lvl1skillchainsMap[compare])
        }
      }
    }
  }
  return skillchains
}

function App() {
  const [axeMoves, setAxeMoves] = useState([]);
  const [swordMoves, setSwordMoves] = useState([]);
  const [lvl1sc, setlvl1sc] = useState([]);

  useEffect(() => {       
    console.log(axe) 
    Papa.parse(axe, {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results)
        setAxeMoves(results.data)
      },
    });

    Papa.parse(sword, {
      download: true,
      header: true,
      complete: (results) => {
        setSwordMoves(results.data)
      },
    });

    Papa.parse(lvl1skillchains, {
      download: true,
      header: true,
      complete: (results) => {
        setlvl1sc(results.data)
      },
    });
  }, []);


  return (
    <div className="App">
      <p> Skillchains </p>
      <p> Axe moves </p>
        <tbody>
          {axeMoves && axeMoves.map(function(am, i){
              return <p>{i} - {am.name}</p>;
          })}
        </tbody>

      <p> Sword moves </p>
      <tbody>
        {axeMoves && axeMoves.map(function(sm, i){
            return <p>{i} - {sm.name}</p>;
        })}
      </tbody>

      <p> Results </p>
      <div>
        {SkillchainResults(axeMoves, swordMoves, lvl1sc).map(function(sc, i){
            return <p>{sc}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
