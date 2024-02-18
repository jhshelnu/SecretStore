import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Box, Button, IconButton, Input, Modal, ModalDialog, Typography } from "@mui/joy";
import { Close } from "@mui/icons-material";
import { invoke } from "@tauri-apps/api";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateLoginModal({ open, setOpen }: Props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setURL] = useState("");

    function setFormField(e: FormEvent, setter: Dispatch<SetStateAction<string>>) {
        setter((e.target as HTMLInputElement).value);
    }

    async function createLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await invoke("create_new_login", { name, username, password, url });
        location.reload();
    }

    return (
        <Modal
            slotProps={{ backdrop: { sx: { backdropFilter: "brightness(85%)" } } }} // slightly dim the area behind the modal
            open={open}
            onClose={(_, reason) => {
                // prevents clicking outside the modal to close it
                if (reason !== "backdropClick") {
                    setOpen(false);
                }
            }}
        >
          <ModalDialog
              className="bg-color-light"
              sx={{ padding: 0, width: "60vw", height: "85vh", borderRadius: "15px", overflow: "hidden" }}
          >
              <Box
                  className="bg-color"
                  sx={{ height: "5em", display: "flex", flexDirection: "horizontal", justifyContent: "center", alignItems: "center" }}
              >
                  <Typography level="h3">New Item</Typography>
                  <IconButton
                      className="hover"
                      sx={{ position: "absolute", right: "1.1em", borderRadius: "10px" }}
                      onClick={() => setOpen(false)}
                  >
                      <Close fontSize="medium" />
                  </IconButton>
              </Box>
              <form onSubmit={createLogin}>
                  <Input placeholder="name" value={name} onInput={e => setFormField(e, setName)} required />
                  <Input placeholder="username" value={username} onInput={e => setFormField(e, setUsername)} required />
                  <Input placeholder="password" value={password} onInput={e => setFormField(e, setPassword)} required />
                  <Input placeholder="website" value={url} onInput={e => setFormField(e, setURL)} required />
                  <Button type="submit" disabled={!name || !username || !password || !url}>Create</Button>
              </form>
          </ModalDialog>
        </Modal>
    );
}