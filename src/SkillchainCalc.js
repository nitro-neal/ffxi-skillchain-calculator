export function normalizeWeaponsSkillName(wsName) {
  wsName = wsName.replace("*", "");
  wsName = wsName.toLowerCase();
  wsName = wsName.trim();
  wsName = wsName.replace(" ", "-");
  return wsName;
}

export function getSkillchainResults(job1, job2, weapons1, weapons2, lvl1sc, lvl2sc, lvl3sc, partyLevel) {
  console.log("SkillchainResultsNew CALLED");
  console.log(job1);
  console.log(job2);
  console.log(weapons1);
  console.log(weapons2);

  if (!job1.wsLevel || !job2.wsLevel || !weapons1 || !weapons2 || job1.wsLevel.length == 0 || job2.wsLevel.length == 0) {
    return [];
  }

  let skillchainsMap = {};

  for (let sc of lvl1sc) {
    skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
  }

  for (let sc of lvl2sc) {
    skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
  }

  for (let sc of lvl3sc) {
    skillchainsMap[sc.ws1 + " -> " + sc.ws2] = sc.result;
  }

  const weaponsSkillInfoJob1 = GetWeaponSkillInfoAtLevelForJob(job1, weapons1, partyLevel);
  console.log({ weaponsSkillInfoJob1 });

  const weaponsSkillInfoJob2 = GetWeaponSkillInfoAtLevelForJob(job2, weapons2, partyLevel);
  console.log({ weaponsSkillInfoJob2 });

  let skillchains = [];
  let skillChainsFormatted = {};

  for (const [key1, value1] of Object.entries(weaponsSkillInfoJob1)) {
    for (const [key2, value2] of Object.entries(weaponsSkillInfoJob2)) {
      let found = false;
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          if (!found) {
            let elementKeyValue1 = "element" + i;
            let elementKeyValue2 = "element" + j;

            let compare = value1[elementKeyValue1] + " -> " + value2[elementKeyValue2];
            if (skillchainsMap[compare] != undefined) {
              let element = skillchainsMap[compare];
              skillchains.push(key1 + " -> " + key2 + " = " + skillchainsMap[compare]);

              if (!skillChainsFormatted[element]) {
                skillChainsFormatted[element] = [];
              }

              let newSC = {
                firstWs: key1,
                secondWs: key2,
                wsString: key1 + " -> " + key2 + " = " + skillchainsMap[compare],
              };
              let currentSCs = skillChainsFormatted[element];
              currentSCs.push(newSC);
              skillChainsFormatted[element] = currentSCs;

              found = true;
            }
          }
        }
      }
    }
  }

  return skillChainsFormatted;
}

const GetWeaponSkillInfoAtLevelForJob = (job, weapon, partyLevel) => {
  let selectJob1WsAtLvl = {};
  // Ensure partyLevel is a number and within bounds of wsLevel array
  const levelCount = Array.isArray(job.wsLevel) ? job.wsLevel.length : 0;
  const maxIdx = Math.min(parseInt(partyLevel, 10) || 0, levelCount);

  for (let i = 0; i < maxIdx; i++) {
    if (!job.wsLevel[i]) continue;
    let wsAtLvl = job.wsLevel[i].ws;
    if (wsAtLvl.length > 0) {
      let wsAtLvlArr = wsAtLvl.split(",");
      wsAtLvlArr = wsAtLvlArr.map((ws) => normalizeWeaponsSkillName(ws));

      for (let ws of wsAtLvlArr) {
        let w1Elements = weapon.filter((w) => {
          let normalizedName = normalizeWeaponsSkillName(w.name);
          return normalizedName == ws;
        });
        let w1Element = w1Elements[0];

        if (w1Elements.length > 0) {
          selectJob1WsAtLvl[ws] = {
            exists: true,
            element1: w1Element.element1,
            element2: w1Element.element2,
            element3: w1Element.element3,
          };
        }
      }
    }
  }

  return selectJob1WsAtLvl;
};
