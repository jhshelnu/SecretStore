import Login from "@/types/Login";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { invoke } from "@tauri-apps/api";
import toast from "react-hot-toast";

type Props = {
    login: Login,
    updateLogin: (login: Login) => Promise<void>,
    openEditDialog: () => void,
}

export default function LoginDetailDropdownMenu({ login, updateLogin, openEditDialog }: Props) {
    async function toggleFavorite() {
        try {
            // swap the favorite status
            await updateLogin({ ...login, favorite: !login.favorite });
        } catch (e) {
            toast.error(`Error ${!login.favorite ? "adding login to favorites" : "removing login from favorites"}`, { id: "favoriteError", duration: 2_000 });
        }
    }

    async function toggleArchived() {
        try {
            // swap the archived status, this also clears the favorite status
            await updateLogin({ ...login, archived: !login.archived, favorite: false });
            // todo: add success toast message
        } catch (e) {
            toast.error(`Error ${!login.archived ? "archiving login" : "removing login from archive"}`, { id: "favoriteError", duration: 2_000 });
        }
    }

    async function deleteLogin() {
        // todo: consider adding confirmation dialog with success toast
        await invoke("delete_login", { id: login.id });
        location.reload();
    }

    return (
        <Dropdown>
            <MenuButton
                className="hover"
                slots={{ root: IconButton }}
                sx={{ float: "right", borderRadius: "10px" }}
            >
                <MoreVert />
            </MenuButton>
            <Menu
                className="bg-color-light"
                sx={{
                    borderRadius: "10px",
                    paddingX: "6px",
                    boxShadow: "0px 3px 10px -1px rgb(10, 10, 10)"
                }}
                placement="bottom-end"
            >
                {!login.archived &&
                    <MenuItem className="solid-hover" sx={{ borderRadius: "6px" }} onClick={toggleFavorite}>
                        {login.favorite ? "Remove from Favorites" : "Add to Favorites"}
                    </MenuItem>
                }
                {!login.archived &&
                    <MenuItem className="solid-hover" sx={{ borderRadius: "6px" }} onClick={openEditDialog}>
                        Edit
                    </MenuItem>
                }
                <MenuItem className="solid-hover" sx={{ borderRadius: "6px" }} onClick={toggleArchived}>{login.archived ? "Remove from Archived" : "Archive"}</MenuItem>
                <MenuItem className="solid-hover" sx={{ borderRadius: "6px" }} onClick={deleteLogin}>Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}