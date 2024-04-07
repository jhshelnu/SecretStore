import LoginFilter from "@/types/LoginFilter";
import { Dispatch, SetStateAction } from "react";
import { Button, Stack } from "@mui/joy";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type Props = {
    filter: LoginFilter,
    setFilter: Dispatch<SetStateAction<LoginFilter>>
}

export default function LoginsSidebar({ filter, setFilter }: Props) {
    return (
        <Stack width="15em" minWidth="15em" height="inherit" sx={{ paddingLeft: ".75em" }}>
            {/* todo: extract this to a reusable LoginsSideBarButton component */}
            <Button
                startDecorator={<StorageRoundedIcon />}
                className={filter == LoginFilter.ALL ? "bg-color-selected" : "bg-color-hoverable"}
                onClick={() => setFilter(LoginFilter.ALL)}
                sx={{ marginTop: ".75em", justifyContent: "flex-start" }}
            >
                All Items
            </Button>
            <Button
                startDecorator={<StarRoundedIcon htmlColor="#ffab00" />}
                className={filter == LoginFilter.FAVORITES ? "bg-color-selected" : "bg-color-hoverable"}
                onClick={() => setFilter(LoginFilter.FAVORITES)}
                sx={{ justifyContent: "flex-start" }}
            >
                Favorites
            </Button>
        </Stack>
    );
}