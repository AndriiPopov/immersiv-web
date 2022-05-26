import LayoutHOC from "layout/Layout";
import React, { useEffect, useState } from "react";

import { DatePicker, Layout, PageHeader } from "antd";

import { Content } from "antd/lib/layout/layout";

import { useNavigate, useParams } from "react-router-dom";

import projectService from "services/project.service";
import moment from "moment";
import gaService from "services/ga.service";
import toast from "react-hot-toast";
import { ChartItem } from "components/DashboardItem/DataItems";
import useLoginCheck from "hooks/useLoginCheck";

const AnalyticClient = (props) => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [dateData, setDateData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [sourceData, setSourceData] = useState(null);
    const [period, setPeriod] = useState([
        moment().subtract(7, "day").format(),
        moment().format(),
    ]);
    const navigate = useNavigate();

    useLoginCheck();

    useEffect(() => {
        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, []);

    useEffect(() => {
        if (period.length === 2 && project?.id) {
            setDateData(null);
            setCityData(null);
            setDeviceData(null);
            setSourceData(null);
            getMetricData();
        }
    }, [period[0], period[1], project?.id]);

    const getMetricData = () => {
        gaService
            .getGA(
                project.id,
                "ga:users,ga:newUsers,ga:pageviews,ga:sessions,ga:sessionDuration",
                "ga:date",
                period
            )
            .then((res) => {
                setDateData(res.data.data);
            })
            .catch((err) => {
                toast.error("Users analytics data not loaded");
            });

        gaService
            .getGA(project.id, "ga:users", "ga:city", period)
            .then((res) => {
                setCityData(res.data.data);
            })
            .catch((err) => {
                toast.error("Location analytics data not loaded");
            });

        gaService
            .getGA(project.id, "ga:users", "ga:deviceCategory", period)
            .then((res) => {
                setDeviceData(res.data.data);
            })
            .catch((err) => {
                toast.error("Device analytics data not loaded");
            });

        gaService
            .getGA(project.id, "ga:users", "ga:source", period)
            .then((res) => {
                setSourceData(res.data.data);
            })
            .catch((err) => {
                toast.error("Source analytics data not loaded");
            });
    };

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
                    title={
                        <>
                            Analytics
                            <br />
                            <DatePicker.RangePicker
                                size="large"
                                defaultValue={[
                                    moment().subtract(7, "day"),
                                    moment(),
                                ]}
                                onChange={(m) =>
                                    setPeriod([m[0].format(), m[1].format()])
                                }
                                allowClear={false}
                            />
                        </>
                    }
                    style={{ borderBottom: "1px #ccc solid" }}
                />
                {project && (
                    <Content
                        style={{
                            flex: 1,
                            overflow: "auto",
                            paddingTop: "100px",
                            padding: "16px",

                            width: "100%",
                            margin: "auto",
                        }}
                    >
                        <div
                            style={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChartItem
                                data={dateData}
                                title="Users"
                                xKey="start"
                                valKey="value"
                                column={1}
                            />
                            <ChartItem
                                data={dateData}
                                title="New users"
                                xKey="start"
                                valKey="value"
                                column={2}
                            />
                            <ChartItem
                                data={dateData}
                                title="Page views"
                                xKey="start"
                                valKey="value"
                                column={3}
                            />
                            <ChartItem
                                data={dateData}
                                title="Sessions"
                                xKey="start"
                                valKey="value"
                                column={4}
                            />
                            <ChartItem
                                data={dateData}
                                title="Session duration (minutes)"
                                xKey="start"
                                valKey="value"
                                column={5}
                                seconds
                            />
                            <ChartItem
                                data={deviceData}
                                title="Device type"
                                xKey="start"
                                valKey="value"
                                type="PieChart"
                                column={1}
                                seconds
                                isDate={false}
                            />
                            <ChartItem
                                data={sourceData}
                                title="Source"
                                xKey="start"
                                valKey="value"
                                type="BarChart"
                                column={1}
                                isDate={false}
                            />
                            <ChartItem
                                data={cityData}
                                title="Source"
                                xKey="start"
                                valKey="value"
                                type="Table"
                                column={1}
                                isDate={false}
                            />
                        </div>
                    </Content>
                )}
            </Layout>
        </LayoutHOC>
    );
};

export default AnalyticClient;
