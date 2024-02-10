import {Box, Button, ListItem, Typography, TypographySystem} from "@mui/joy";
import {SxProps} from "@mui/joy/styles/types";

type Props = {
    label: string,
    value: string,
    variant?: "password" | "url",
    sx?: SxProps,
    value_sx?: SxProps,
    first_in_group?: boolean,
    last_in_group?: boolean,
}

export default function LoginDetailField(props: Props) {
    let default_value_sx = props.variant === "password" ? { letterSpacing: "0.03em" } : {};
    let value_typography_level = props.variant === "password" ? "title-lg" : "body-md";

    let parsedURL = props.variant === "url" ? new URL(props.value) : null;
    let protocol = parsedURL?.protocol;
    let host = parsedURL?.host;

    // if the url is "amazon.com", parsedURL.pathname will return "/",
    // and we shouldn't show this trailing slash if it isn't part of the un-parsed URL
    let pathname= parsedURL?.pathname;
    if (pathname === "/" && !props.value.endsWith("/")) {
        pathname = "";
    }

    return (
        <Button
            className="bg-color-hoverable"
            sx={{...props.sx, display: "flex", justifyContent: "flex-start", width: "inherit" }}
            data-first-child={props.first_in_group}
            data-last-child={props.last_in_group}
        >
            <Box>
                <Typography
                    sx={{ float: "left" }}
                    level="body-xs"
                    className="purple"
                >
                    {props.label}
                </Typography>
                <Typography
                    // @ts-ignore
                    level={value_typography_level}
                    color={props.variant === "url" ? "neutral" : undefined }
                    sx={{ ...default_value_sx, ...props.value_sx, fontSize: "15px", fontWeight: "400" }}
                >
                    {props.variant === "password" && "\u2022".repeat(10)}
                    {props.variant === "url" && <>{protocol}//<span className="url-blue">{host}</span>{pathname}</>}
                    {!props.variant && props.value}
                </Typography>
            </Box>
        </Button>
    )
}