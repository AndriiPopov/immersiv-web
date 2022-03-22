import { Button, Popconfirm, Select, Table } from "antd";
import React from "react";
import toast from "react-hot-toast";
import propertyService from "services/property.service";

const PropertiesTable = (props) => {
    const {
        properties,
        project,
        setProperties,
        admin,
        setEditModalOpen,
        transferOrientationToString,
    } = props;

    const { Option } = Select;

    const onChange = async (value, id) => {
        const response = await propertyService.saveStatus(project.id, id, {
            Availability: value,
        });
        if (response.data) {
            toast.success("Saved");
            setProperties(response.data);
        }
    };

    const deleteProperty = async (propertyId) => {
        const response = await propertyService.deleteProperty(
            project.id,
            propertyId
        );
        if (response.data) setProperties(response.data);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "name",
            sorter: (a, b) => (a.Name > b.Name ? 1 : -1),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Availability",
            dataIndex: "Availability",
            key: "availability",
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
            sorter: (a, b) => (a.Availability > b.Availability ? 1 : -1),
            sortDirections: ["descend", "ascend"],
            onFilter: (value, record) =>
                record.Availability.indexOf(value) === 0,
        },
        {
            title: "Surface",
            dataIndex: "Surface",
            key: "surface",
            sorter: (a, b) => a.Surface - b.Surface,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Price",
            dataIndex: "Price",
            key: "price",
            sorter: (a, b) => a.Price - b.Price,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Bedrooms",
            dataIndex: "BedroomsCount",
            key: "bedrooms",
            sorter: (a, b) => a.BedroomsCount - b.BedroomsCount,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Bathrooms",
            dataIndex: "BathroomsCount",
            key: "bathrooms",
            sorter: (a, b) => a.BathroomsCount - b.BathroomsCount,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Orientation",
            dataIndex: "Orientation",
            key: "orientation",
            render: (orientation, property) =>
                transferOrientationToString(property).Orientation,
            sorter: (a, b) =>
                transferOrientationToString(a).Orientation >
                transferOrientationToString(b).Orientation
                    ? 1
                    : -1,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "",
            render: (_, property) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                        type="link"
                        onClick={() => setEditModalOpen(property)}
                    >
                        Edit
                    </Button>
                    {admin && (
                        <Popconfirm
                            title="Are you sure to delete this property?"
                            onConfirm={() => deleteProperty(property.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="text" danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            ),
        },
    ];
    return (
        <Table
            dataSource={properties.sort((a, b) => {
                return a.Name > b.Name ? 1 : -1;
            })}
            columns={columns}
        />
    );
};

export default PropertiesTable;
