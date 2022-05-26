import React, { useEffect } from "react";

import propertyService from "services/property.service";
import PropertiesTable from "components/ProjectView/Components/PropertiesTable";
import projectService from "services/project.service";
import useLoginCheck from "hooks/useLoginCheck";

const Properties = (props) => {
    const { admin, id, project, properties, setProject, setProperties } = props;

    useEffect(() => {
        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
        });

        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, []);

    useLoginCheck();

    return (
        properties &&
        project && (
            <PropertiesTable
                properties={properties}
                setProperties={setProperties}
                project={project}
                admin={admin}
            />
        )
    );
};

export default Properties;
