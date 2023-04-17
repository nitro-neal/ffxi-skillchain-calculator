import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";

import * as util from "../Util.js";

import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/RefreshTwoTone";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomMenuItem = styled(MenuItem)({
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

export default function SkillchainResults(props) {
  const [selectedWs, setSelectedWs] = React.useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedWs(typeof value === "string" ? value.split(",") : value);
    let what = typeof value === "string" ? value.split(",") : value;
    props.changeFilter(what);

    // window.scroll({
    //   top: document.body.offsetHeight + 500,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };

  const resetWeponSkillFilter = (e) => {
    setSelectedWs([]);
    props.changeFilter([]);
  };

  return (
    <div>
      {props.selectedJobWs && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex" }}></div>
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-checkbox-label"> Weaponskills Filter</InputLabel>
              <Select labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={selectedWs} onChange={handleChange} input={<OutlinedInput label="Tag" />} renderValue={(selected) => selected.join(", ")} MenuProps={MenuProps}>
                <MenuItem key="selectedJob1" value="selectedJob1">
                  <h2>{util.formatJobName(props.selectedJob1)}</h2>
                </MenuItem>
                {props.selectedJob1Ws.map((ws) => (
                  <MenuItem key={ws} value={ws}>
                    <Checkbox checked={selectedWs.indexOf(ws) > -1} />
                    <ListItemText primary={util.formatWeaponSkillName(ws)} />
                  </MenuItem>
                ))}
                <MenuItem key="selectedJob2" value="selectedJob2">
                  <h2>{util.formatJobName(props.selectedJob2)}</h2>
                </MenuItem>
                {props.selectedJob2Ws.map((ws) => (
                  <MenuItem key={ws} value={ws}>
                    <Checkbox checked={selectedWs.indexOf(ws) > -1} />
                    <ListItemText primary={util.formatWeaponSkillName(ws)} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton aria-label="refresh" onClick={resetWeponSkillFilter}>
              <RefreshIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
