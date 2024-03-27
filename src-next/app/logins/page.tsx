"use client";

import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Box } from "@mui/joy";
import Login from "@/types/Login";
import LoginDetail from "@/components/LoginDetail";
import LoginsList from "@/components/LoginsList";

export default function Logins() {
    let [logins, setLogins] = useState<Login[]>([]);
    let [selectedLoginId, setSelectedLoginId] = useState<number | null>(null);

    const selectedLogin = useMemo(() => {
        return logins.find(login => login.id === selectedLoginId) ?? null;
    }, [selectedLoginId, logins]);

    useEffect(() => {
        invoke("get_logins")
            .then(data => setLogins(data as Login[]))
            .catch(e => console.error(e));
    }, []);

    async function updateLogin(updatedLogin: Login) {
        const updatedLogins = logins.map(login => login.id === updatedLogin.id ? updatedLogin : login);
        invoke("update_login", { login: updatedLogin })
            .then(() => setLogins(updatedLogins));
            // it's on the caller of this method to handle errors
    }

    return (
        <Box display="flex" flexDirection="row">
            <LoginsList logins={logins} selectedLogin={selectedLogin} setSelectedLoginId={setSelectedLoginId} />
            {selectedLogin && <LoginDetail login={selectedLogin} updateLogin={updateLogin} />}
        </Box>
    );
}