import './App.css';
import React, { useState, useEffect } from 'react';

import axe from './skillchain-info/axe.csv';
import sword from './skillchain-info/sword.csv';
import lvl1skillchains from './skillchain-info/lvl1skillchains.csv';

import Papa from 'papaparse';

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
    Papa.parse(axe, {
      download: true,
      header: true,
      complete: (results) => {
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
