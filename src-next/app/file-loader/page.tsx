'use client'

import {Button} from "@mui/joy"
import {useRouter} from "next/navigation";

export default function FileLoader() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-1/2">
            <h1 className="text-white text-4xl object-center">SecretStore</h1>
            <Button
                component="label"
                variant="soft"
                onClick={() => router.replace("/file-loader/from-existing")}>
                Open existing Secretsfile
            </Button>
        </div>
    )
}