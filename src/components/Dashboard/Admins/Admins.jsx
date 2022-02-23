import {
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
    ListItem,
    IconButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import adminService from "services/admin.service";
import DeleteIcon from "@mui/icons-material/Delete";
import LockedIcon from "@mui/icons-material/Lock";
import UnlockedIcon from "@mui/icons-material/LockOpen";

export const Admins = (props) => {
    const { data, menuTab } = props;

    const [editState, setEditState] = useState(null);

    const save = async () => {
        const response = await adminService.createAdmin(editState);

        if (response.data) data.setAdmins(response.data);
        closeModal();
    };

    const closeModal = () => {
        setEditState(null);
    };

    const deleteAdmin = async (id) => {
        const response = await adminService.deleteAdmin(id);

        if (response.data) data.setAdmins(response.data);
    };
    return menuTab === "admin" ? (
        <>
            <Button
                onClick={() => {
                    setEditState({ published: true });
                }}
            >
                Add admin
            </Button>
            {data.admins
                .sort((a, b) => (a.email > b.email ? 1 : -1))
                .map((admin) => (
                    <ListItem
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => deleteAdmin(admin.email)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemIcon>
                            {admin.locked ? <LockedIcon /> : <UnlockedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={admin.email} />
                    </ListItem>
                ))}

            <Modal open={!!editState}>
                {!!editState && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <TextField
                            value={editState.email}
                            onChange={(e) =>
                                setEditState({
                                    ...editState,
                                    email: e.target.value,
                                })
                            }
                            label="Email"
                            style={{ marginTop: "20px", width: "100%" }}
                        />

                        <div style={{ marginTop: "50px" }}>
                            <Button onClick={save}>Save</Button>
                            <Button onClick={closeModal}>Cancel</Button>
                        </div>
                    </Box>
                )}
            </Modal>
        </>
    ) : null;
};
