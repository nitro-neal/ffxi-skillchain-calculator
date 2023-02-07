export default function JobWeaponSelect(props) {
  let selectedJob = props.jobSelect;

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
          return <option value={w}> {w} </option>;
        })}
      </select>
    </>
  );
}
