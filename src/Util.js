export function hi() {
  console.log("hi");
}

export function getWeapons(jobName, allWeapons, jobWeaponMappings) {
  let retJobWeapons = [];
  let jobWeapons = [];

  for (let jwm of jobWeaponMappings) {
    if (jwm.name == jobName) {
      jobWeapons = jwm.weapons.split(",");
      break;
    }
  }

  jobWeapons = jobWeapons.map((jw) => jw.trim());
  jobWeapons = jobWeapons.map((jw) => jw.replace(" ", ""));

  for (let weapon of jobWeapons) {
    let wpn = allWeapons.filter((w) => w.name.toLowerCase() == weapon.toLowerCase());
    if (wpn[0]) {
      retJobWeapons.push(wpn[0]);
    }
  }

  return retJobWeapons;
}

export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
