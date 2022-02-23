import Spinner from "components/Spinner";
import history from "helpers/history";
import Layout from "layout/Layout";
import Login from "pages/Login";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "routes/protected.route";

const Home = lazy(() => import("pages/Home"));
const Project = lazy(() => import("pages/Project"));
const Admin = lazy(() => import("pages/Admin"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
// const Preview = lazy(() => import("pages/Preview"));

function App() {
    return (
        <Router history={history}>
            <Suspense
                fallback={
                    <Layout>
                        <Spinner size={100} />
                    </Layout>
                }
            >
                <>
                    <Toaster position="top-right" />
                    <Switch>
                        <Route exact path={"/"}>
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <ProtectedRoute exact path="/admin">
                            <Admin />
                        </ProtectedRoute>
                        <Route path="/reset-password">
                            <ResetPassword />
                        </Route>
                        <Route exact path="/:id/">
                            <Project />
                        </Route>
                        {/* 
                        
                        <Route exact path="/preview/:id/">
                            <Preview />
                        </Route> */}
                        <Route path="*">
                            <h1>404 Error Found</h1>
                        </Route>
                    </Switch>
                </>
            </Suspense>
        </Router>
    );
}

export default App;
