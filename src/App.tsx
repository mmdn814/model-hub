/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import ModelDetails from "./pages/ModelDetails";
import Billing from "./pages/Billing";
import ApiKeys from "./pages/ApiKeys";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="models" element={<Models />} />
          <Route path="models/:id" element={<ModelDetails />} />
          <Route path="billing" element={<Billing />} />
          <Route path="keys" element={<ApiKeys />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
