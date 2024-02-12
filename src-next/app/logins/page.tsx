"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Box } from "@mui/joy";
import Login from "@/types/Login";
import LoginDetail from "@/components/LoginDetail";
import LoginsList from "@/components/LoginsList";

export default function Logins() {
    let [logins, setLogins] = useState<Login[]>([]);
    let [selectedLogin, setSelectedLogin] = useState<Login | null>(null);

    useEffect(() => {
        invoke("get_secretstore_items")
            .then(data => setLogins(data as Login[]))
            .catch(e => console.error(e));
    }, []);

    return (
        <Box display="flex" flexDirection="row">
            <LoginsList logins={logins} selectedLogin={selectedLogin} setSelectedLogin={setSelectedLogin} />
            {selectedLogin && <LoginDetail login={selectedLogin}/>}
        </Box>
    );
}