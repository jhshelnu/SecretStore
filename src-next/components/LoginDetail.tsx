import {Box, Card, List, ListDivider, ListItem, ListItemButton, Typography} from "@mui/joy";
import Login from "@/types/Login";

type Props = {
    login: Login
}

export default function LoginDetail({ login }: Props) {
    return (
        <Box
            paddingX="1em"
            sx={{
                width: 1
            }}
        >
            <Card
                orientation="horizontal"
                className="bg-color"
                variant="soft"
            >
                <Box
                    component="img"
                    src={`${login.url}/favicon.ico`}
                    loading="lazy"
                    alt=""
                    sx={{
                        width: '3.8em',
                        height: '3.8em'
                    }}
                />
                <Typography level="h3" alignSelf="center">{login.name}</Typography>
            </Card>
            <List
                size="sm"
                variant="outlined"
                sx={{
                    width: 1,
                    borderRadius: "md"
                }}
            >
                <ListItem>
                    <Box
                        sx={{
                            marginLeft: "0.5em"
                        }}
                    >
                        <Typography level="body-xs" className="purple">username</Typography>
                        <Typography level="body-md" sx={{ color: "white" }}>{login.username}</Typography>
                    </Box>
                </ListItem>
                <ListDivider/>
                <ListItem>
                    <Box
                        sx={{
                            marginLeft: "0.5em"
                        }}
                    >
                        <Typography level="body-xs" className="purple">password</Typography>
                        <Typography level="title-lg" sx={{ letterSpacing: "0.03em" }}>{"\u2022".repeat(10)}</Typography>
                    </Box>
                </ListItem>
            </List>
        </Box>
    )
}