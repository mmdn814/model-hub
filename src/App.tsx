/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Providers from "./pages/Providers";
import ModelDetails from "./pages/ModelDetails";
import Playground from "./pages/Playground";
import Pricing from "./pages/Pricing";
import Billing from "./pages/Billing";
import ApiKeys from "./pages/ApiKeys";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Assets from "./pages/Assets";
import { Requirements } from "./pages/Requirements";
import TeamMembers from "./pages/TeamMembers";
import AuditLogs from "./pages/AuditLogs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AssetProvider } from "./contexts/AssetContext";

export default function App() {
  return (
    <AssetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="providers" element={<Providers />} />
              <Route path="models" element={<Models />} />
              <Route path="models/:id" element={<ModelDetails />} />
              <Route path="models/:id/playground" element={<Playground />} />
              <Route path="assets" element={<Assets />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="billing" element={<Billing />} />
              <Route path="keys" element={<ApiKeys />} />
              <Route path="logs" element={<Logs />} />
              <Route path="team" element={<TeamMembers />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AssetProvider>
  );
}
