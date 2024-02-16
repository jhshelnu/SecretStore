import { Box, Button, IconButton, Typography } from "@mui/joy";
import { Close, HorizontalRule, CheckBoxOutlineBlankSharp, Lock, Add } from "@mui/icons-material";
import { appWindow } from "@tauri-apps/api/window";
import { useContext } from "react";
import LockStateContext from "@/components/LockStateContext";
import { useRouter } from "next/navigation";
import { invoke } from "@tauri-apps/api";

export default function TitleBar() {
    const router = useRouter();

    const { isUnlocked, setUnlocked } = useContext(LockStateContext);

    async function lockVault() {
        setUnlocked(false);
        router.replace("/");
        await invoke("close_secretstore");
    }

    return (
        <Box
            data-tauri-drag-region="true"
            sx={{
                marginTop: 0,
                marginX: 0,
                height: "3.45em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: ".1em solid black",
            }}
        >
            <Typography
                level="h4"
                marginLeft="1em"
                data-tauri-drag-region="true"
                sx={{ userSelect: "none" }}
            >
                SecretStore
            </Typography>
            <Box
                data-tauri-drag-region="true"
                sx={{ display: "flex", alignItems: "flex-end", height: 1 }}
            >
                {isUnlocked &&
                    <IconButton
                        className="hover"
                        sx={{ alignSelf: "center", paddingX: ".1em", paddingY: ".5em", width: "2em", borderRadius: "10px", marginX: "1em" }}
                        onClick={lockVault}
                    >
                        <Lock fontSize="small" />
                    </IconButton>
                }
                {isUnlocked &&
                    <Button
                        className="bg-color-selected"
                        sx={{ alignSelf: "center", marginRight: "1.5em", minHeight: 0, height: "2.2em", borderRadius: "8px", paddingLeft: ".6em" }}
                    >
                        <Typography level="body-md" startDecorator={<Add fontSize="medium" />} marginY="0">New Item</Typography>
                    </Button>
                }
                <IconButton
                    className="title-button"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={async () => await appWindow.minimize()}
                >
                    <HorizontalRule fontSize="small" />
                </IconButton>
                <IconButton
                    className="title-button"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={async () => {
                        await appWindow.toggleMaximize();
                    }}
                >
                    <CheckBoxOutlineBlankSharp sx={{ width: ".6em" }}/>
                </IconButton>
                <IconButton
                    className="title-button-close"
                    sx={{ height: 1, width: "3em", borderRadius: 0 }}
                    onClick={() => appWindow.close()}
                >
                    <Close fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}