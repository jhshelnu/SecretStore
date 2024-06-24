import { Box, Button, Input, Stack, SvgIcon, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import LockStateContext from "@/components/LockStateContext";
import { save } from "@tauri-apps/api/dialog";
import { desktopDir } from "@tauri-apps/api/path";
import { ErrorOutline } from "@mui/icons-material";
import { invoke } from "@tauri-apps/api/tauri";
import toast from "react-hot-toast";

export default function CreateNew() {
    let router = useRouter();

    let [filePath, setFilePath] = useState("");
    let [password, setPassword] = useState("");
    let [ confirmedPassword, setConfirmedPassword ] = useState("");

    const { setUnlocked } = useContext(LockStateContext);

    async function getFilePathFromFileDialog() {
        let selectedFilePath = await save({
            defaultPath: await desktopDir(),
            filters: [{
                name: "SecretStore files",
                extensions: ["secretstore"]
            }]
        }) as string;

        if (selectedFilePath) {
            setFilePath(selectedFilePath);
        }
    }

    function createSecretStore() {
        if (filePath && password && confirmedPassword && password === confirmedPassword) {
            invoke("create_secretstore", {
                filePath,
                password,
            })
            .then(async () => {
                router.replace("/logins");
                setUnlocked(true);
            })
            .catch(() => {
                setPassword("");
                setConfirmedPassword("");
                toast.error("Error creating SecretStore", { id: "creationError", duration: 2_000 });
            });
        }
    }

    return (
        <>
            <Button
                component="label"
                variant="soft"
                startDecorator={
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                    </SvgIcon>
                }
                onClick={getFilePathFromFileDialog}
                endDecorator={filePath ? "✅" : ""}
            >
                Create SecretStore
            </Button>
            <Input
                type="password"
                size="lg"
                variant="soft"
                placeholder="Enter your new master password..."
                sx={{
                    width: "18em"
                }}
                value={password}
                onInput={({ target }) => setPassword((target as HTMLInputElement).value)}
            />
            <Stack direction="row" alignItems="center" position="relative">
                <Input
                    type="password"
                    size="lg"
                    variant="soft"
                    placeholder="Confirm your new master password..."
                    sx={{
                        width: "18em"
                    }}
                    value={confirmedPassword}
                    onInput={({ target }) => setConfirmedPassword((target as HTMLInputElement).value)}
                />
                {(password && confirmedPassword && password !== confirmedPassword) &&
                    <Box display="flex" gap="0.3em" position="absolute" sx={{ left: "100%", marginLeft: "0.4em" }}>
                        <ErrorOutline color="warning"/>
                        <Typography color="warning">Mismatch</Typography>
                    </Box>
                }
            </Stack>
            <Button
                onClick={createSecretStore}
                disabled={!filePath || !password || !confirmedPassword || password !== confirmedPassword}
            >
                Submit
            </Button>
        </>
    );
}