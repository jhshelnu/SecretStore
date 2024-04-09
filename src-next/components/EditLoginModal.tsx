import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Box, Button, IconButton, Input, Modal, ModalDialog, Stack, Typography } from "@mui/joy";
import { Close } from "@mui/icons-material";
import LoginIcon from "@/components/LoginIcon";
import Login from "@/types/Login";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    existingLogin?: Login,
    onSave: (login: Login) => void
}

export default function EditLoginModal({ open, setOpen, existingLogin, onSave }: Props) {
    const [name, setName] = useState(existingLogin?.name ?? "");
    const [username, setUsername] = useState(existingLogin?.username ?? "");
    const [password, setPassword] = useState(existingLogin?.password ?? "");
    const [url, setURL] = useState(existingLogin?.url ?? "");

    function setFormField(e: FormEvent, setter: Dispatch<SetStateAction<string>>) {
        setter((e.target as HTMLInputElement).value);
    }

    async function handleOnSave() {
        if (existingLogin) {
            existingLogin = { ...existingLogin, name, username, password, url };
            onSave(existingLogin);
        } else {
            onSave({ name, username, password, url, favorite: false, archived: false });
        }
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
                  <Typography level="h3">{existingLogin ? "Update Login" : "New Login"}</Typography>
                  <IconButton
                      className="hover"
                      sx={{ position: "absolute", right: "1.1em", borderRadius: "10px" }}
                      onClick={() => setOpen(false)}
                  >
                      <Close fontSize="medium" />
                  </IconButton>
              </Box>
              <Stack
                  component="form"
                  sx={{ marginX: "2em", marginTop: "1em" }}
                  spacing={2}
              >
                  <Stack
                      direction="row"
                      alignContent="center"
                      spacing={4}
                  >
                      <LoginIcon url={url} />
                      <Input placeholder="name" value={name} onInput={e => setFormField(e, setName)} required />
                  </Stack>
                  <Input placeholder="username" value={username} onInput={e => setFormField(e, setUsername)} required />
                  <Input placeholder="password" value={password} onInput={e => setFormField(e, setPassword)} required />
                  <Input placeholder="website" value={url} onInput={e => setFormField(e, setURL)} required />
              </Stack>
              <Box
                  position="absolute"
                  className="bg-color"
                  sx={{
                      height: "5em",
                      width: "inherit",
                      bottom: 0,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                  }}
              >
                  <Button
                      disabled={!name || !username || !password || !url}
                      sx={{ marginRight: "1.5em", borderRadius: "12px" }}
                      onClick={handleOnSave}
                  >
                      Save
                  </Button>
              </Box>
          </ModalDialog>
        </Modal>
    );
}