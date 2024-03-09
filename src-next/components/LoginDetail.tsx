import { Box, ButtonGroup, Card, Typography } from "@mui/joy";
import Login from "@/types/Login";
import LoginDetailField from "@/components/LoginDetailField";
import LoginDetailDropdownMenu from "@/components/LoginDetailDropdownMenu";
import LoginIcon from "@/components/LoginIcon";

type Props = {
    login: Login
}

export default function LoginDetail({ login }: Props) {
    return (
        <Box
            paddingX="1em"
            paddingTop=".5em"
            sx={{
                width: 1
            }}
        >
            <Box>
                <LoginDetailDropdownMenu login={login} sx={{ float: "right" }} />
            </Box>
            <Card
                orientation="horizontal"
                className="bg-color"
                variant="soft"
            >
                <LoginIcon
                    url={login.url}
                    width="3.8em"
                    height="3.8em"
                />
                <Typography level="h3" alignSelf="center">{login.name}</Typography>
            </Card>

            <ButtonGroup
                orientation="vertical"
                sx={{ "--ButtonGroup-radius": "6px" }}
            >
                <LoginDetailField
                    first_in_group={true}
                    label="username"
                    value={login.username}
                    value_sx={{ color: "white" }}
                />

                <LoginDetailField
                    last_in_group={true}
                    variant="password"
                    label="password"
                    value={login.password} />
            </ButtonGroup>

            <LoginDetailField
                variant="url"
                label="website"
                value={login.url}
                sx={{ marginTop: ".8em" }} />
        </Box>
    );
}