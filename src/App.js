import history from "helpers/history";
import Layout from "layout/Layout";
import Admins from "pages/Admins";
import AnalyticClient from "pages/AnalyticClient";
import Constants from "pages/Constants";
import CreateProject from "pages/CreateProject";
import Login from "pages/Login";
import ProjectDetails from "pages/ProjectDetails";
import Projects from "pages/Projects";
import PropertiesAdmin from "pages/PropertiesAdmin";
import PropertiesClient from "pages/PropertiesClient";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const Project = lazy(() => import("pages/Project"));

const ResetPassword = lazy(() => import("pages/ResetPassword"));
// const Preview = lazy(() => import("pages/Preview"));

function App() {
    return (
        <BrowserRouter history={history}>
            <Suspense
                fallback={<Layout>{/* <Spinner size={100} /> */}</Layout>}
            >
                <>
                    <Toaster position="top-right" />
                    <Routes>
                        <Route exact path={"/"} element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/admin"
                            element={<Projects />}
                        ></Route>
                        <Route
                            exact
                            path="/admin/projects/:id"
                            element={<ProjectDetails />}
                        ></Route>
                        <Route
                            exact
                            path="/admin/projects/create"
                            element={<CreateProject />}
                        ></Route>
                        <Route
                            exact
                            path="/admin/projects/:id/properties"
                            element={<PropertiesAdmin />}
                        ></Route>
                        <Route
                            exact
                            path="/admin/contant"
                            element={<Constants />}
                        ></Route>
                        <Route
                            exact
                            path="/admin/admins"
                            element={<Admins />}
                        ></Route>

                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        ></Route>
                        <Route
                            exact
                            path="/p/:id"
                            element={<Project />}
                        ></Route>
                        <Route
                            exact
                            path="/p-admin/:id"
                            element={<PropertiesClient />}
                        ></Route>

                        <Route
                            exact
                            path="/p-admin/:id/analytics"
                            element={<AnalyticClient />}
                        ></Route>

                        <Route
                            path="*"
                            element={<h1>404 Error Found</h1>}
                        ></Route>
                    </Routes>
                </>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
