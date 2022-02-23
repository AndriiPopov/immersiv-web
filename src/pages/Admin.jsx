import Dashboard from "components/Dashboard/Dashboard";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import adminService from "services/admin.service";
import constantService from "services/constant.service";
import projectService from "services/project.service";

const Admin = () => {
    const [constant, setConstant] = useState(null);
    const [admins, setAdmins] = useState(null);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        projectService.getProject().then((response) => {
            setProjects(response.data);
        });
        adminService.getAdmin().then((response) => {
            setAdmins(response.data);
        });
        constantService.getConstant().then((response) => {
            if (response.data.length) setConstant(response.data[0]);
        });
    }, []);
    return (
        <Layout loading={!constant || !admins || !projects}>
            <Dashboard
                data={{
                    constant,
                    setConstant,
                    admins,
                    setAdmins,
                    projects,
                    setProjects,
                }}
            />
        </Layout>
    );
};

export default Admin;
