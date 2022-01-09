import {useRouter} from "next/router";
import {FormControl, FormGroup, FormLabel, ToggleButton} from "@mui/material";
import {useTranslation} from "next-i18next";
import Box from "@mui/material/Box";

const getWeekDays = locale => {
    const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, {weekday: 'short'}).substr(0, 2));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

export function DaySelect({mode = 0, name, value, onChange}) {
    const router = useRouter();
    const {t} = useTranslation()
    const updateValue = (ev, item) => {
        const newValue = value ^ (2 ** item);
        ev.target.value = newValue;
        ev.target.name = name;
        if (onChange) onChange(ev)
    };

    return (
        <FormControl sx={{
            borderColor: (theme)=>theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
            borderRadius: "4px",
            borderWidth: 1,
            p: 1
        }}>
            <FormControl component="fieldset"

            >
                <FormLabel component="legend">{t("Select days")}:</FormLabel>
                <FormGroup row name={name} variant={"outlined"}>
                    {[...Array(mode == 0 ? 7 : 31).keys()].map(item => (
                        <ToggleButton color={"primary"}
                            key={item + 1}
                            value={item + 1}
                            selected={value & (2 ** item)}
                            onChange={(e) => updateValue(e, item)}
                            sx={{width: "3rem"}}
                        >
                            {mode == 0 ? getWeekDays(router.locale)[item] : item + 1}
                        </ToggleButton>
                    ))}
                </FormGroup>
            </FormControl>
         </FormControl>
    )
}
