'use client'

import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {Card, CardContent, Typography} from "@mui/joy";

interface Login {
    id: number,
    name: string,
    username: string,
    password: string,
    url: string,
}

export default function Logins() {
    let [logins, setLogins] = useState<Login[]>([])
    let [selectedLogin, setSelectedLogin] = useState<Login | null>(null);

    useEffect(() => {
        invoke("get_secretstore_items")
            .then(data => setLogins(data as Login[]))
            .catch(e => console.error(e))
    }, []);

    return (
        <div className="flex">
            <div id="logins-list" className="flex flex-col h-screen">
                {logins.map(login =>
                    <Card
                        key={login.id}
                        variant="soft"
                        size="md"
                        orientation="horizontal"
                        className={`${login == selectedLogin ? "bg-color-selected" : "bg-color-hoverable"} py-2`}
                        onClick={() => setSelectedLogin(login)}
                    >
                        <img
                            src={`${login.url}/favicon.ico`}
                            loading="lazy"
                            alt=""
                            className="w-8 h-8 my-auto"
                        />
                        <CardContent orientation="vertical" className="w-60">
                            <Typography level="title-md" className="pb-0 mb-0">{login.name}</Typography>
                            <Typography level="body-sm">{login.username}</Typography>
                        </CardContent>
                    </Card>
                )}
                <Typography level="body-sm" className="mx-auto">
                    {logins.length} {logins.length === 1 ? 'item' : 'items'}
                </Typography>
            </div>
            <div className="w-full h-screen">
                {selectedLogin &&
                    <Card
                        orientation="horizontal"
                        className="h-screen bg-color"
                        variant="soft"
                    >
                        <img
                            src={`${selectedLogin.url}/favicon.ico`}
                            loading="lazy"
                            alt=""
                            className="w-10 h-10"
                        />
                        <Typography level="title-lg" className="h-auto">{selectedLogin.name}</Typography>
                    </Card>
                }
            </div>
        </div>
    )
}