import { Box } from "@mui/joy";
import { useMemo } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type props = {
    url: string,
    width?: string | number,
    height?: string | number,
    loading?: "eager" | "lazy",
    favorite?: boolean,
}

export default function LoginIcon({ url, width, height, loading, favorite }: props) {
    const faviconUrl = useMemo(() => {
        try {
            const parsedUrl = new URL(url);
            return `${parsedUrl.protocol}//${parsedUrl.hostname}/favicon.ico`;
        } catch (_) {
            return null;
        }
    }, [url]);

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                component="img"
                width={width ?? "3em"}
                height={height ?? "3em"}
                loading={loading}
                src={faviconUrl ?? "/icon.png"}
                onError={({ currentTarget }) => {
                    currentTarget.src = "/icon.png";
                }}
            />
            {favorite && <StarRoundedIcon sx={{ position: "absolute", bottom: "0", right: "0" }} htmlColor="#ffab00" />}
        </Box>
    );
}