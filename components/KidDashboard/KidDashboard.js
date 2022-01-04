import {useState} from "react";
import Grid from "@mui/material/Grid";
import KidsPane from "../ParentDashboard/KidsPane";
import KidPane from "../ParentDashboard/KidPane";
import * as React from "react";


function KidDashboard() {
  const [view, setView] = useState(0);
  const [selectedKid, setSelectedKid] = useState(3);

  function kidSelectedHandler(id) {
    setSelectedKid(id)
    setView(1)
  }

  return (
      <Grid>
        {/*{view == 0 && <KidsPane onKidSelect={kidSelectedHandler}/>}*/}
        {view == 0 && <KidPane kidId={selectedKid}/>}
      </Grid>
  );
}
export default KidDashboard;
