import { Box, Card, CardContent, List, Typography } from "@mui/joy";
import Login from "@/types/Login";
import { Dispatch, SetStateAction } from "react";
import LoginIcon from "@/components/LoginIcon";

type Props = {
    logins: Login[],
    selectedLogin: Login | null,
    setSelectedLoginId: Dispatch<SetStateAction<number | null>>,
}

export default function LoginsList({ logins, selectedLogin, setSelectedLoginId }: Props) {
    return (
        <Box display="flex" flexDirection="column" marginTop=".3em" marginX=".75em" justifyContent="start" gap="2" >
            {/* todo: turn off flex-grow or add item count to this list. currently it is pushed off the page because of flex-grow */}
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
                        onClick={() => setSelectedLoginId(login.id ?? null)}
                    >
                        <LoginIcon
                            url={login.url}
                            loading="lazy"
                            width="2.5em"
                            height="2.5em"
                            favorite={login.favorite}
                        />
                        <CardContent orientation="vertical">
                            <Typography level="title-md">{login.name}</Typography>
                            <Typography level="body-sm">{login.username}</Typography>
                        </CardContent>
                    </Card>
                )}
            </List>
            {logins.length > 0 &&
                <Typography level="body-sm" alignSelf="center">
                    {logins.length} {logins.length === 1 ? "item" : "items"}
                </Typography>
            }
        </Box>
    );
}