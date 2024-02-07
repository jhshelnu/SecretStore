'use client'

import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {Card} from "@mui/joy";

interface Login {
    id: number,
    name: string,
    username: string,
    password: string,
    url: string,
}

export default function Logins() {
    let [logins, setLogins] = useState<Login[]>([])


    useEffect(() => {
        invoke("get_secretstore_items")
            .then(data => setLogins(data as Login[]))
            .catch(e => console.error(e))
    }, []);

    return (
        <div className="flex">
            <div id="logins-list" className="flex flex-col w-1/3 min-w-9 h-screen bg-gray-600">
                {logins.map(login =>
                    <Card key={login.id} variant="soft" color="neutral" size="md" orientation="horizontal" className="h-20 mb-3">
                        <b>{login.name}</b>
                        <br/>
                        <div>{login.username}</div>
                    </Card>
                )}
            </div>
        </div>
    )
}