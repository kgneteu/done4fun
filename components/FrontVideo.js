import Box from "@mui/material/Box";

export function FrontVideo() {
    return (
        <Box sx={{
            position: "relative",
            marginLeft: "-1rem",
            marginRight: "-1rem",
            backgroundColor:"red",
            "& video": {
                display:"block",
                minWidth: "100%",
                border: "1px solid yellow",
                boxSizing: "content-box"
            }
        }}>
            <Box sx={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 50,
            }}/>
            <video src={'/video/kids.mp4'} autoPlay loop muted></video>
        </Box>
    )
}
