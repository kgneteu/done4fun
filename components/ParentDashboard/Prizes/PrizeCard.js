import {Card, CardActions, CardContent} from "@mui/material";
import SVG from "../../SVG";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import {DynamicIcon} from "../../UI/DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";
import {RoundButton} from "../Tasks/RoundButton";

export function PrizeCard({prize, onPrizeEdit, onPrizeDelete}) {
    return (
        <Card sx={{width: "240px"}}>
            <CardContent>
                <DynamicIcon type={'prizes'} name={prize.icon} color={stringToColor(prize.name)}/>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {prize.name}
                </Typography>
            </CardContent>

            <CardActions disableSpacing={true}>
                <CasinoIcon color={"disabled"}/>{prize.points}
                <Box sx={{flexGrow: 1}}/>
                <RoundButton onClick={onPrizeEdit} color={'primary'} size={'small'}>
                    <EditIcon/>
                </RoundButton>

                <RoundButton onClick={onPrizeDelete} color={'error'} sx={{ml:1}} size={'small'}>
                    <DeleteIcon/>
                </RoundButton>
            </CardActions>
        </Card>);
}

PrizeCard.propTypes = {
    prize: PropTypes.any,
    onPrizeEdit: PropTypes.func,
    onPrizeDelete: PropTypes.func
};
