export default function JobWeaponSelect(props) {
  // let selectedJob = props.jobSelect;

  let selectedJob;

  for (let jw of props.jobWeapon) {
    // console.log("IN LOOP");
    // console.log(jw);
    if (jw.name == props.selectedPartyMember) {
      selectedJob = jw;
    }
  }

  let weapons = selectedJob.weapons;
  weapons = weapons.split(",");
  weapons.map((w) => {
    return w.trim();
  });

  for (let weapon in weapons) {
    <option value={weapon}>{weapon}</option>;
  }

  return (
    <>
      <p>{selectedJob.name}</p>
      <select onChange={(e) => props.moveChanged(e)}>
        {weapons.map((w) => {
          return (
            <option name={selectedJob.name} value={selectedJob.name + "_" + w}>
              {w}
            </option>
          );
        })}
      </select>
    </>
  );
}
