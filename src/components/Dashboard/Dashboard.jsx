import React, { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LogoutIcon from "@mui/icons-material/Logout";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import { Projects } from "./Projects/Projects";
import { Constant } from "./Constant/Constant";
import { Admins } from "./Admins/Admins";
import { useUser } from "context/UserContext";
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";

const Dashboard = (props) => {
    const { data } = props;
    const { logout } = useUser();

    const [menuTab, setMenuTab] = useState("project");

    useEffect(() => {
        if (menuTab === "logout") {
            setMenuTab("project");
            logout();
        }
    }, [menuTab]);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {`Dashboard -> ${
                            menuTab === "admin"
                                ? "Admins"
                                : menuTab === "project"
                                ? "Projects"
                                : "General info"
                        }`}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2, pb: 7, pt: 13 }}>
                <CssBaseline />
                <Projects data={data} menuTab={menuTab} />
                <Admins data={data} menuTab={menuTab} />
                <Constant data={data} menuTab={menuTab} />
                <Paper
                    sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                    elevation={3}
                >
                    <BottomNavigation
                        showLabels
                        value={menuTab}
                        onChange={(event, newValue) => {
                            setMenuTab(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="Projects"
                            icon={<DashboardIcon />}
                            value="project"
                        />
                        <BottomNavigationAction
                            label="Info"
                            icon={<InfoIcon />}
                            value="constant"
                        />
                        <BottomNavigationAction
                            label="Admins"
                            icon={<PeopleIcon />}
                            value="admin"
                        />
                        <BottomNavigationAction
                            label="Logout"
                            icon={<LogoutIcon />}
                            value="logout"
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
    );
};

export default Dashboard;
