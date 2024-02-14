import { Box, IconButton, Typography } from "@mui/joy";
import { Close, HorizontalRule, CheckBoxOutlineBlankSharp, Lock } from "@mui/icons-material";
import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";

export default function TitleBar() {
    const [ isMaximized, setMaximized ] = useState(false);
    appWindow.isMaximized().then(setMaximized).catch(console.error);

    return (
        <Box
            data-tauri-drag-region="true"
            sx={{
                marginTop: 0,
                marginX: 0,
                width: 1,
                height: "3.45em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: ".1em solid black",
            }}
        >
            <Typography level="h4" marginLeft="1em">SecretStore</Typography>
            <Box sx={{ height: 1 }}>
                <IconButton
                    className="title-button"
                    sx={{ height: 1, width: "3em", borderRadius: 0, marginX: "1em" }}
                >
                    <Lock/>
                </IconButton>
                <IconButton
                    className="title-button"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={async () => await appWindow.minimize()}
                >
                    <HorizontalRule/>
                </IconButton>
                <IconButton
                    className="title-button"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={async () => {
                        await appWindow.toggleMaximize();
                        setMaximized(await appWindow.isMaximized());
                    }}
                >
                    {isMaximized
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 25 25">
                            <path fill="currentColor" d="M4 8h4V4h12v12h-4v4H4zm12 0v6h2V6h-8v2zM6 12v6h8v-6z"></path>
                          </svg>
                        : <CheckBoxOutlineBlankSharp sx={{ width: ".6em" }}/>}
                </IconButton>
                <IconButton
                    className="title-button-close"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={() => appWindow.close()}
                >
                    <Close/>
                </IconButton>
            </Box>
        </Box>
    );
}