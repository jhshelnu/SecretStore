'use client'

import {useState} from "react"
import {Button, Input, SvgIcon} from "@mui/joy";
import {open} from "@tauri-apps/api/dialog";
import {desktopDir} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api";
import {useRouter} from "next/navigation";

export default function FromExisting() {
    let router = useRouter();

    let [filePath, setFilePath] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState('')

    async function getFilePathFromFileDialog() {
        let selectedFilePath = await open({
            multiple: false,
            directory: false,
            defaultPath: await desktopDir(),
        }) as string

        if (selectedFilePath) {
            setFilePath(selectedFilePath)
        }
    }

    function loadSecretStore() {
        if (filePath && password) {
            invoke("init_secretstore_from_file", {
                    filePath,
                    password,
            })
            .then(() => router.replace("/logins"))
            .catch(e => {
                setPassword('')
                setError(e)
            });
        }
    }

    return (
        <div className="m-auto my-auto w-1/2 h-1/2">
            {error && <h1 className="text-red-500">{error}</h1>}
            <div className="flex">
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
                >
                    Select Secretsfile
                </Button>
                {filePath && <h6 className="text-green-500 h-auto my-auto mx-4">{filePath}</h6>}
            </div>
            <Input
                className="my-8"
                type="password"
                size="md"
                placeholder="Enter your master password..."
                value={password}
                onInput={({ target }) => setPassword((target as HTMLInputElement).value)}
            />
            <Button onClick={loadSecretStore} disabled={!filePath || !password}>Submit</Button>
        </div>
    );
}