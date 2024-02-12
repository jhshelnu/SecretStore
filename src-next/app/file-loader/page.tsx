"use client";

import { Box, Button, ButtonGroup, Typography } from "@mui/joy";
import { useState } from "react";
import FromExisting from "@/app/file-loader/forms/FromExisting";
import CreateNew from "@/app/file-loader/forms/CreateNew";

enum FileLoadType {
    NEW, EXISTING
}

export default function FileLoader() {
    const [selectedFileLoadType, setSelectedFileLoadType] = useState<FileLoadType | null>(null);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap="1em">
            <Typography level="title-lg" fontSize="50px">SecretStore</Typography>

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