import {
    Button,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Select,
    Table,
    Typography,
} from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import propertyService from "services/property.service";

const { Option } = Select;

const transferOrientationToObject = (data) => {
    if (!data.Orientation) return data;
    const o = {};
    if (data.Orientation.indexOf("N") !== -1) o.N = true;
    else if (data.Orientation.indexOf("S") !== -1) o.S = true;
    if (data.Orientation.indexOf("E") !== -1) o.E = true;
    else if (data.Orientation.indexOf("W") !== -1) o.W = true;
    return { ...data, Orientation: o };
};

const transferOrientationToString = (data) => {
    let o = "";
    if (data.Orientation.N) o = o + "N";
    else if (data.Orientation.S) o = o + "S";
    if (data.Orientation.E) o = o + "E";
    else if (data.Orientation.W) o = o + "W";
    return { ...data, Orientation: o };
};

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    property,
    index,
    children,
    ...restProps
}) => {
    let inputNode = <InputNumber />;

    switch (inputType) {
        case "number":
            inputNode = <InputNumber />;
            break;
        case "orientation":
            inputNode = (
                <Select>
                    <Option value="N">North</Option>
                    <Option value="NE">North-East</Option>
                    <Option value="E">East</Option>
                    <Option value="SE">South-East</Option>
                    <Option value="S">South</Option>
                    <Option value="SW">South-West</Option>
                    <Option value="W">West</Option>
                    <Option value="NW">North-West</Option>
                </Select>
            );
            break;
        case "availability":
            inputNode = (
                <Select>
                    <Option value="available">Available</Option>
                    <Option value="reserved">Reserved</Option>
                    <Option value="sold">Sold</Option>
                </Select>
            );
            break;
        default:
            inputNode = <Input />;
    }
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                        width: "100%",
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const PropertiesTable = (props) => {
    const { properties, project, setProperties, admin, setEditModalOpen } =
        props;
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [editingKey, setEditingKey] = useState("");

    const [form] = Form.useForm();
    const isEditing = (property) => property.id === editingKey;

    const edit = (property) => {
        form.setFieldsValue(property);
        setEditingKey(property.id);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const values = await form.validateFields();
            const response = await propertyService.saveProperty(
                project.id,
                key,
                transferOrientationToObject(values)
            );

            if (response.data) {
                toast.success("Saved");
                setProperties(response.data);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const deleteProperty = async () => {
        const response = await propertyService.deleteProperty(
            project.id,
            selectedProperties
        );
        if (response.data) setProperties(response.data);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            sorter: (a, b) => (a.Name > b.Name ? 1 : -1),
            sortDirections: ["descend", "ascend"],
            editable: admin,
            inputType: "text",
            width: 100,
        },
        {
            title: "Availability",
            dataIndex: "Availability",
            sorter: (a, b) => (a.Availability > b.Availability ? 1 : -1),
            sortDirections: ["descend", "ascend"],
            onFilter: (value, property) =>
                property.Availability.indexOf(value) === 0,
            editable: true,
            inputType: "availability",
            width: 100,
            render: (_, property) => capitalize(property.Availability),
        },
        {
            title: "Surface",
            dataIndex: "Surface",
            sorter: (a, b) => a.Surface - b.Surface,
            sortDirections: ["descend", "ascend"],
            editable: admin,
            inputType: "number",
            width: 100,
        },
        {
            title: "Price",
            dataIndex: "Price",
            sorter: (a, b) => a.Price - b.Price,
            sortDirections: ["descend", "ascend"],
            editable: true,
            inputType: "number",
            width: 100,
        },
        {
            title: "Bedrooms",
            dataIndex: "BedroomsCount",
            key: "bedrooms",
            sortDirections: ["descend", "ascend"],
            editable: admin,
            inputType: "number",
            width: 100,
        },
        {
            title: "Bathrooms",
            dataIndex: "BathroomsCount",
            sorter: (a, b) => a.BathroomsCount - b.BathroomsCount,
            sortDirections: ["descend", "ascend"],
            editable: admin,
            inputType: "number",
            width: 100,
        },
        ...(project.url.toLowerCase() === "Imperial_Square".toLowerCase()
            ? []
            : [
                  {
                      title: "Frontage",
                      dataIndex: "Frontage",
                      sorter: (a, b) => a.Frontage - b.Frontage,
                      sortDirections: ["descend", "ascend"],
                      editable: admin,
                      inputType: "number",
                      width: 100,
                  },
                  {
                      title: "Depth",
                      dataIndex: "Depth",
                      sorter: (a, b) => a.Depth - b.Depth,
                      sortDirections: ["descend", "ascend"],
                      editable: admin,
                      inputType: "number",
                      width: 100,
                  },
              ]),
        {
            title: "Orientation",
            dataIndex: "Orientation",

            sorter: (a, b) =>
                transferOrientationToString(a).Orientation >
                transferOrientationToString(b).Orientation
                    ? 1
                    : -1,
            sortDirections: ["descend", "ascend"],
            editable: admin,
            inputType: "orientation",
            width: 100,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            width: 80,
            render: (_, property) => {
                const editable = isEditing(property);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(property.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>

                        <Typography.Link onClick={cancel}>
                            Cancel
                        </Typography.Link>
                    </span>
                ) : (
                    <span>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(property)}
                        >
                            Edit
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (property) => ({
                property,
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(property),
            }),
        };
    });

    const onAddProperty = async () => {
        const response = await propertyService.createProperty(
            project.id,
            properties.length ? properties[properties.length - 1].id : ""
        );
        if (response.data) {
            toast.success("Added");
            setProperties(response.data.newProperties);
            setEditingKey(response.data.newProperty.id);
            form.setFieldsValue(
                transferOrientationToString(response.data.newProperty)
            );
            document.querySelector("div.ant-table-body").scrollTop = 1000000;
        }
    };
    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    size="small"
                    bordered
                    dataSource={properties.map((i) => {
                        const d = transferOrientationToString(i);
                        return { ...d, key: d.id };
                    })}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    rowSelection={
                        admin
                            ? {
                                  type: "checkbox",
                                  onChange: (_, selectedRows) => {
                                      setSelectedProperties(
                                          selectedRows.map((i) => i.id)
                                      );
                                  },
                              }
                            : null
                    }
                    pagination={false}
                    tableLayout="fixed"
                    scroll={{
                        y: "calc(100vh - 230px)",
                    }}
                />
            </Form>
            {admin && (
                <Button
                    onClick={onAddProperty}
                    style={{ margin: "16px" }}
                    type="primary"
                >
                    Add property
                </Button>
            )}
            {!!selectedProperties.length && admin && (
                <Typography.Link
                    onClick={() => deleteProperty()}
                    type="danger"
                    disabled={editingKey}
                >
                    Delete
                </Typography.Link>
            )}
        </>
    );
};

export default PropertiesTable;
