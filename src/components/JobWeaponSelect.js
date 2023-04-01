import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdb-react-ui-kit";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
      <Grid container justify="center">
        <FormControl fullWidth>
          {/* TODO Why is default value not working? */}
          <InputLabel id="demo-simple-select-label">Weapon</InputLabel>
          <Select defaultValue={weapons[0]} onChange={(e) => props.moveChanged(e)}>
            {weapons.map((w) => {
              return (
                <MenuItem name={props.selectedJob.name} value={props.selectedJob.name + "_" + w}>
                  {w}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
