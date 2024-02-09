'use client'

import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {Box, Card, CardContent, List, Typography} from "@mui/joy";

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
        <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="column">
                <List>
                    {logins.map(login =>
                        <Card
                            key={login.id}
                            variant="soft"
                            size="md"
                            orientation="horizontal"
                            className={login == selectedLogin ? "bg-color-selected" : "bg-color-hoverable"}
                            sx={{
                                width: "15em"
                            }}
                            onClick={() => setSelectedLogin(login)}
                        >
                            <Box
                                component="img"
                                src={`${login.url}/favicon.ico`}
                                loading="lazy"
                                alt=""
                                sx={{
                                    width: '2.5em',
                                    height: '2.5em'
                                }}
                            />
                            <CardContent orientation="vertical">
                                <Typography level="title-md">{login.name}</Typography>
                                <Typography level="body-sm">{login.username}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </List>
                <Typography level="body-sm" alignSelf="center">
                    {logins.length} {logins.length === 1 ? 'item' : 'items'}
                </Typography>
            </Box>
            <Box>
                {selectedLogin &&
                    <Card
                        orientation="horizontal"
                        className="bg-color"
                        variant="soft"
                    >
                        <Box
                            component="img"
                            src={`${selectedLogin.url}/favicon.ico`}
                            loading="lazy"
                            alt=""
                            sx={{
                                width: '3.8em',
                                height: '3.8em'
                            }}
                        />
                        <Typography level="h3" alignSelf="center">{selectedLogin.name}</Typography>
                    </Card>
                }
            </Box>
        </Box>
    )
}