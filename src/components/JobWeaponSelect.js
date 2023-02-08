export default function JobWeaponSelect(props) {
  if (Object.keys(props.selectedJob).length == 0) {
    return (
      <>
        <p>select party memmber</p>
      </>
    );
  }

  let weapons = [];

  for (let w of props.selectedJob.weapons) {
    weapons.push(w.name);
  }

  return (
    <>
      <p>{props.selectedJob.name}</p>
      <select onChange={(e) => props.moveChanged(e)}>
        {weapons.map((w) => {
          return (
            <option name={props.selectedJob.name} value={props.selectedJob.name + "_" + w}>
              {w}
            </option>
          );
        })}
      </select>
    </>
  );
}
