"use client";

import { Box, Button, ButtonGroup, Typography } from "@mui/joy";
import { useState } from "react";
import dynamic from "next/dynamic";

enum FileLoadType {
    NEW, EXISTING
}

export default function FileLoader() {
    // these forms rely on native tauri api's which are not available server-side or during build-time
    const FromExisting = dynamic(() => import("./forms/FromExisting"), { ssr: false });
    const CreateNew = dynamic(() => import("./forms/CreateNew"), { ssr: false });

    const [selectedFileLoadType, setSelectedFileLoadType] = useState<FileLoadType | null>(null);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="1em" paddingTop="4em">
            <ButtonGroup
                orientation="horizontal"
                sx={{ "--ButtonGroup-radius": "25px" }}
            >
                <Button
                    className={selectedFileLoadType == FileLoadType.NEW ? "bg-color-selected" : "bg-color-hoverable"}
                    onClick={() => setSelectedFileLoadType(FileLoadType.NEW)}
                >
                    <Typography level="body-md">Create New File</Typography>
                </Button>
                <Button
                    className={selectedFileLoadType == FileLoadType.EXISTING ? "bg-color-selected" : "bg-color-hoverable"}
                    onClick={() => setSelectedFileLoadType(FileLoadType.EXISTING)}
                >
                    <Typography level="body-md">Open existing File</Typography>
                </Button>
            </ButtonGroup>

            {selectedFileLoadType == FileLoadType.NEW && <CreateNew />}
            {selectedFileLoadType == FileLoadType.EXISTING && <FromExisting />}
        </Box>
    );
}