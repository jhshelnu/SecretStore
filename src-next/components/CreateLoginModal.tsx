import { Dispatch, SetStateAction } from "react";
import { Box, IconButton, Modal, ModalDialog, Typography } from "@mui/joy";
import { Close } from "@mui/icons-material";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateLoginModal({ open, setOpen }: Props) {
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
          </ModalDialog>
        </Modal>
    );
}