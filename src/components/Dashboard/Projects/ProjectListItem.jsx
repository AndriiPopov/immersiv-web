import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Menu,
    MenuItem,
} from "@mui/material";
import React from "react";
import VisibleIcon from "@mui/icons-material/Visibility";
import VisibleOffIcon from "@mui/icons-material/VisibilityOff";
import StarIcon from "@mui/icons-material/Star";
import MoreIcon from "@mui/icons-material/MoreVert";

import projectService from "services/project.service";

export const ProjectListItem = (props) => {
    const { project, data, setEditId, setEditState } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                        }}
                    >
                        <MoreIcon />
                    </IconButton>
                }
            >
                <ListItemButton
                    onClick={() => {
                        setEditId(project.url);
                        setEditState(project);
                    }}
                >
                    <ListItemIcon>
                        {project.featured ? (
                            <StarIcon />
                        ) : project.published ? (
                            <VisibleIcon />
                        ) : (
                            <VisibleOffIcon />
                        )}
                    </ListItemIcon>
                    <ListItemText
                        primary={project.name}
                        secondary={project.url}
                    />
                </ListItemButton>
            </ListItem>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        setEditState(project);
                        setEditId(project.url);
                        setAnchorEl(null);
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        const response = await projectService.saveProject(
                            project.url,
                            { ...project, featured: true }
                        );

                        if (response.data) data.setProjects(response.data);
                        setAnchorEl(null);
                    }}
                >
                    Set as featured
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        const response = await projectService.deleteProject(
                            project.url
                        );

                        if (response.data) data.setProjects(response.data);
                        setAnchorEl(null);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};
