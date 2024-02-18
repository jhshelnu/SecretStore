"use client";

import Login from "@/types/Login";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { SxProps } from "@mui/joy/styles/types";
import { invoke } from "@tauri-apps/api";
import { useRouter } from "next/navigation";

type Props = {
    login: Login
    sx?: SxProps,
}

export default function LoginDetailDropdownMenu({ login, sx }: Props) {
    const router = useRouter();

    async function deleteLogin() {
        await invoke("delete_login", { id: login.id });
        router.refresh();
    }

    return (
        <Dropdown>
            <MenuButton
                className="hover"
                slots={{ root: IconButton }}
                sx={{ ...sx, borderRadius: "10px" }}
            >
                <MoreVert />
            </MenuButton>
            <Menu
                className="bg-color-light"
            >
                <MenuItem onClick={deleteLogin}>Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}