import LoginFilter from "@/types/LoginFilter";
import { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/joy";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LoginsSidebarButton from "@/components/LoginsSideBarButton";

type Props = {
    filter: LoginFilter,
    setFilter: Dispatch<SetStateAction<LoginFilter>>
}

export default function LoginsSidebar({ filter, setFilter }: Props) {
    return (
        <Stack width="15em" minWidth="15em" height="inherit" sx={{ paddingLeft: ".75em", paddingTop: ".75em" }}>
            <LoginsSidebarButton
                startDecorator={<StorageRoundedIcon />}
                targetFilter={LoginFilter.ALL}
                targetFilterText="All Items"
                filter={filter}
                setFilter={setFilter} />

            <LoginsSidebarButton
                startDecorator={<StarRoundedIcon htmlColor="#ffab00" />}
                targetFilter={LoginFilter.FAVORITES}
                targetFilterText="Favorites"
                filter={filter}
                setFilter={setFilter} />

            <LoginsSidebarButton
                startDecorator={<InventoryIcon />}
                targetFilter={LoginFilter.ARCHIVED}
                targetFilterText="Archived"
                filter={filter}
                setFilter={setFilter} />
        </Stack>
    );
}