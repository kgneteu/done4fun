import Grid from "@mui/material/Grid";
import KidCard from "./KidCard";
import * as React from "react";

const KidsList = ({users, pager, onKidSelect}) => (
    <>
        <Grid container spacing={2} justifyContent={"center"}>
            {users.map(user => <Grid item key={user.id}><KidCard user={user} onKidSelect={onKidSelect}/></Grid>)}
        </Grid>
        {pager}
    </>
);

export default KidsList
