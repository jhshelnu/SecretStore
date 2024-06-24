import { useContext, useState } from "react";
import { Button, Input, SvgIcon } from "@mui/joy";
import { open } from "@tauri-apps/api/dialog";
import { desktopDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from "next/navigation";
import LockStateContext from "@/components/LockStateContext";

export default function FromExisting() {
    let router = useRouter();

    let [filePath, setFilePath] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState(false);

    const { setUnlocked } = useContext(LockStateContext);

    async function getFilePathFromFileDialog() {
        let selectedFilePath = await open({
            multiple: false,
            directory: false,
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

    function loadSecretStore() {
        if (filePath && password) {
            invoke("init_secretstore_from_file", {
                    filePath,
                    password,
            })
            .then(async () => {
                router.replace("/logins");
                setUnlocked(true);
            })
            .catch(() => {
                setPassword("");
                setError(true);
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
                Select SecretStore
            </Button>
            <Input
                type="password"
                size="lg"
                variant="soft"
                error={error}
                placeholder="Enter your master password..."
                sx={{
                    width: "18em"
                }}
                value={password}
                onInput={({ target }) => setPassword((target as HTMLInputElement).value)}
            />
            <Button onClick={loadSecretStore} disabled={!filePath || !password}>Submit</Button>
        </>
    );
}