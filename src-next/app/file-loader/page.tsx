'use client'

import {Box, Button, Typography} from "@mui/joy"
import {useRouter} from "next/navigation";

export default function FileLoader() {
    const router = useRouter();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap="1em">
            <Typography level="title-lg" fontSize="50px">SecretStore</Typography>
            <Button
                component="label"
                variant="soft"
                onClick={() => router.replace("/file-loader/from-existing")}>
                Open existing Secretsfile
            </Button>
        </Box>
    )
}