import { Select, Table } from "antd";
import React from "react";
import toast from "react-hot-toast";
import propertyService from "services/property.service";

const PropertiesTable = (props) => {
    const { properties, project, setProperties } = props;

    const { Option } = Select;

    const onChange = async (value, id) => {
        const response = await propertyService.saveStatus(project.id, id, {
            status: value,
        });
        if (response.data) {
            toast.success("Saved");
            setProperties(response.data);
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, property) => (
                <Select
                    value={status}
                    onChange={(value) => onChange(value, property.id)}
                    style={{ width: "100%" }}
                >
                    <Option value="available">Available</Option>
                    <Option value="reserved">Reserved</Option>
                    <Option value="sold">Sold</Option>
                </Select>
            ),
        },
    ];
    return (
        <Table
            dataSource={properties.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            })}
            columns={columns}
        />
    );
};

export default PropertiesTable;
