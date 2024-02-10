import {Box, Card, CardContent, List, Typography} from "@mui/joy";
import Login from "@/types/Login";
import {Dispatch, SetStateAction} from "react";

type Props = {
    logins: Login[],
    selectedLogin: Login | null,
    setSelectedLogin: Dispatch<SetStateAction<Login | null>>,
}

export default function LoginsList({ logins, selectedLogin, setSelectedLogin }: Props) {
    return (
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
    )
}