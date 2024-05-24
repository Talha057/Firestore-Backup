import LoginScreen from "./Screens/LoginScreen";
import AdminPanel from "./Screens/AdminPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./public&privateRoute";
import RestoreScreen from "./Screens/restoreScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LoginScreen />} path="/" exact />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AdminPanel />} path="/managebackup" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<RestoreScreen />} path="/restore" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
