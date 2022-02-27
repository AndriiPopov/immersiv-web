import {
    Button,
    Modal,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import projectService from "services/project.service";
import { ProjectListItem } from "./ProjectListItem";

export const Projects = (props) => {
    const { data, menuTab } = props;

    const [editId, setEditId] = useState("");
    const [editState, setEditState] = useState(null);

    const save = async () => {
        const response = editId
            ? await projectService.saveProject(editId, editState)
            : await projectService.createProject(editState);

        if (response.data) data.setProjects(response.data);
        closeModal();
    };

    const closeModal = () => {
        setEditId("");
        setEditState(null);
    };
    return menuTab === "project" ? (
        <>
            <Button
                onClick={() => {
                    setEditId(false);
                    setEditState({ published: true });
                }}
            >
                Add project
            </Button>
            {data.projects
                .sort((a, b) => (a.url > b.url ? 1 : -1))
                .map((project) => (
                    <ProjectListItem
                        project={project}
                        key={project.url}
                        setEditId={setEditId}
                        setEditState={setEditState}
                        data={data}
                    />
                ))}

            <Modal open={!!editState}>
                {!!editState && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 800,
                            maxWidth: "100%",
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <TextField
                            value={editState.name}
                            onChange={(e) =>
                                setEditState({
                                    ...editState,
                                    name: e.target.value,
                                })
                            }
                            label="Name"
                            style={{ marginTop: "20px", width: "100%" }}
                        />
                        <TextField
                            value={editState.url}
                            onChange={(e) =>
                                setEditState({
                                    ...editState,
                                    url: e.target.value,
                                })
                            }
                            label="Url"
                            style={{ marginTop: "20px", width: "100%" }}
                        />
                        <TextField
                            value={editState.projectId}
                            onChange={(e) =>
                                setEditState({
                                    ...editState,
                                    projectId: e.target.value,
                                })
                            }
                            label="Project id"
                            style={{ marginTop: "20px", width: "100%" }}
                        />
                        <TextField
                            value={editState.modelId}
                            onChange={(e) =>
                                setEditState({
                                    ...editState,
                                    modelId: e.target.value,
                                })
                            }
                            label="Model id"
                            style={{ marginTop: "20px", width: "100%" }}
                        />
                        <FormControlLabel
                            label="Published"
                            control={
                                <Checkbox
                                    checked={editState.published}
                                    onChange={(e) =>
                                        setEditState({
                                            ...editState,
                                            published: e.target.checked,
                                        })
                                    }
                                />
                            }
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
