import { Box } from "@mui/joy";
import { useMemo } from "react";

type props = {
    url: string,
    width?: string | number,
    height?: string | number,
    loading?: "eager" | "lazy",
}

export default function LoginIcon({ url, width, height, loading }: props) {
    const faviconUrl = useMemo(() => {
        try {
            const parsedUrl = new URL(url);
            return `${parsedUrl.protocol}//${parsedUrl.hostname}/favicon.ico`;
        } catch (_) {
            return null;
        }
    }, [url]);

    return (
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
    );
}