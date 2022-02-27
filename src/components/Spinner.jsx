import { Spin, Typography } from "antd";
import React from "react";

const Spinner = ({ css, size, loading }) => {
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // height: "100%",
                flexDirection: "column",
            }}
        >
            <Spin size="large" />

            <Typography.Text style={{ paddingTop: 20 }}>
                Loading...
            </Typography.Text>
        </div>
    );
};

export default Spinner;
