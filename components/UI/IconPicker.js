import {FormControl, InputLabel, OutlinedInput, Select} from "@mui/material";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

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

export function IconPicker(props) {
    return (
        <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                input={<OutlinedInput label={props.label}/>}
                MenuProps={MenuProps}

                renderValue={(selected) => (
                    <Image width={32} height={32} src={`/images/icons/${props.group}/${selected}.svg`}/>
                )}
            >
                {[...Array(63).keys()].map((index) => (
                    <IconButton key={index} value={index + 1}>
                        <Image width={32} height={32} src={`/images/icons/${props.group}/${index + 1}.svg`}/>
                    </IconButton>
                ))}
            </Select>
        </FormControl>
    )
}
