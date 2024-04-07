"use client";

import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Box } from "@mui/joy";
import Login from "@/types/Login";
import LoginDetail from "@/components/LoginDetail";
import LoginsList from "@/components/LoginsList";
import LoginsSidebar from "@/components/LoginsSidebar";
import LoginFilter from "@/types/LoginFilter";

export default function Logins() {
    let [logins, setLogins] = useState<Login[]>([]);
    let [selectedLoginId, setSelectedLoginId] = useState<number | null>(null);
    let [filter, setFilter] = useState<LoginFilter>(LoginFilter.ALL);

    const selectedLogin = useMemo(() => {
        return logins.find(login => login.id === selectedLoginId) ?? null;
    }, [selectedLoginId, logins]);

    useEffect(() => {
        invoke(getMethodByFilter(filter))
            .then(data => setLogins(data as Login[]))
            .then(() => setSelectedLoginId(null))
            .catch(e => console.error(e));
    }, [filter]);

    function getMethodByFilter(filter: LoginFilter) {
        switch (filter) {
            case LoginFilter.ALL:
                return "get_logins";
            case LoginFilter.FAVORITES:
                return "get_favorite_logins";
            case LoginFilter.ARCHIVED:
                return "get_archived_logins";
        }
    }

    async function updateLogin(updatedLogin: Login) {
        const updatedLogins = logins.map(login => login.id === updatedLogin.id ? updatedLogin : login);
        invoke("update_login", { login: updatedLogin })
            .then(() => setLogins(updatedLogins));
            // it's on the caller of this method to handle errors
    }

    return (
        <Box display="flex" flexDirection="row" height="inherit">
            <LoginsSidebar filter={filter} setFilter={setFilter} />
            <LoginsList logins={logins} selectedLogin={selectedLogin} setSelectedLoginId={setSelectedLoginId} />
            {selectedLogin && <LoginDetail login={selectedLogin} updateLogin={updateLogin} />}
        </Box>
    );
}