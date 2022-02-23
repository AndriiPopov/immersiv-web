import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import constantService from "services/constant.service";

export const Constant = (props) => {
    const { data, menuTab } = props;

    const [editState, setEditState] = useState(data.constant);
    useEffect(() => {
        setEditState(data.constant);
    }, [data.constant]);
    const save = async () => {
        const response = await constantService.saveConstant(editState);
        if (response.data) data.setConstant(response.data);
    };

    return menuTab === "constant" ? (
        <Box
            sx={{
                width: 400,
                bgcolor: "background.paper",

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
            <TextField
                value={editState.phone}
                onChange={(e) =>
                    setEditState({
                        ...editState,
                        phone: e.target.value,
                    })
                }
                label="Phone"
                style={{ marginTop: "20px", width: "100%" }}
            />
            <TextField
                value={editState.call}
                onChange={(e) =>
                    setEditState({
                        ...editState,
                        call: e.target.value,
                    })
                }
                label="International phone number"
                style={{ marginTop: "20px", width: "100%" }}
            />

            <div style={{ marginTop: "50px" }}>
                <Button onClick={save}>Save</Button>
                <Button onClick={() => setEditState(data.constant)}>
                    Cancel
                </Button>
            </div>
        </Box>
    ) : null;
};
