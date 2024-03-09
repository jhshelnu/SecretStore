import { Box, Button, Typography, TypographySystem } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import toast from "react-hot-toast";
import { useState } from "react";
import { open } from "@tauri-apps/api/shell";
import { readText, writeText } from "@tauri-apps/api/clipboard";

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
    let [hovering, setHovering] = useState(false);

    let default_value_sx = props.variant === "password" ? { letterSpacing: "0.03em" } : {};
    let value_typography_level: keyof TypographySystem = props.variant === "password" ? "title-lg" : "body-md";

    let parsedURL = props.variant === "url" ? tryParseUrl(props.value) : null;
    let protocol = parsedURL?.protocol;
    let host = parsedURL?.host;

    // if the url is "amazon.com", parsedURL.pathname will return "/",
    // and we shouldn't show this trailing slash if it isn't part of the un-parsed URL
    let pathname= parsedURL?.pathname;
    if (pathname === "/" && !props.value.endsWith("/")) {
        pathname = "";
    }

    function tryParseUrl(url: string) {
        try {
            return new URL(url);
        } catch (_) {
            return null;
        }
    }

    async function copyValue() {
        await writeText(props.value);
        toast("Copied to clipboard", { id: "clipboard", duration: 2_000 });
        // after 90 seconds, clear the clipboard (unless the user has since copied something else)
        setTimeout(async () => {
            if (await readText() === props.value) {
                await writeText("");
            }
        }, 90_000);
    }

    async function openURL() {
        await open(props.value);
    }

    function getDisplayText() {
        switch (props.variant) {
            case "password": {
                return "\u2022".repeat(10);
            }
            case "url": {
                return parsedURL
                    ? <>{protocol + "//"}<span className="url-blue">{host}</span>{pathname}</>
                    : <>{props.value}</>
            }
            default: {
                return props.value
            }
        }
    }

    return (
        <Button
            className="bg-color-hoverable"
            sx={{ ...props.sx, display: "flex", justifyContent: "space-between", width: "inherit" }}
            data-first-child={props.first_in_group}
            data-last-child={props.last_in_group}
            onClick={props.variant === "url" ? openURL : copyValue}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            endDecorator={hovering && <Typography level="title-md">{props.variant === "url" ? "Open" : "Copy"}</Typography>}
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
                    level={value_typography_level}
                    color={props.variant === "url" ? "neutral" : undefined }
                    sx={{ ...default_value_sx, ...props.value_sx, fontSize: "15px", fontWeight: "400" }}
                >
                    {getDisplayText()}
                </Typography>
            </Box>
        </Button>
    );
}