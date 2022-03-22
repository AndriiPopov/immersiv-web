import LayoutHOC from "layout/Layout";
import React, { useEffect, useState } from "react";

import { Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";

import { useUser } from "context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

import { Chart } from "react-google-charts";

import gaService from "services/ga.service";

const AnalyticClient = (props) => {
    const { id } = useParams();
    const { logout, isLoggedIn, authData } = useUser();
    const navigate = useNavigate();
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        if (
            !isLoggedIn ||
            (!authData?.super &&
                id.toString() !== authData?.projectId.toString())
        ) {
            logout();
            navigate("/login");
            return null;
        }
    }, [isLoggedIn, authData?.super, authData?.projectId]);

    useEffect(() => {
        gaService
            .getGA(id, {
                dateRanges: [
                    {
                        startDate: "2020-03-31",
                        endDate: "today",
                    },
                ],
                dimensions: [
                    {
                        name: "city",
                    },
                ],
                metrics: [
                    {
                        name: "activeUsers",
                    },
                ],
            })
            .then((response) => {
                console.log(response.data);
                setChartData(response.data);
            });
    }, []);

    return (
        <LayoutHOC>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => navigate(`/p-admin/${id}`)}
                    title={"Analytics"}
                    style={{ boxShadow: "1px 1px 10px 1px #ccc" }}
                />

                <Content
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "16px",
                        maxWidth: "800px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {chartData && (
                        <Chart chartType="LineChart" data={chartData} />
                    )}
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default AnalyticClient;
