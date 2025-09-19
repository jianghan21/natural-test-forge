import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import APKUpload from "./pages/APKUpload";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetail from "./pages/ProjectDetail";
import NewTest from "./pages/NewTest";
import Results from "./pages/Results";
import ResultDetail from "./pages/ResultDetail";
import Plans from "./pages/Plans";
import NewPlan from "./pages/NewPlan";
import PlanDetail from "./pages/PlanDetail";
import Tests from "./pages/Tests";
import TestDetail from "./pages/TestDetail";
import Insights from "./pages/Insights";
import Coverage from "./pages/Coverage";
import Configuration from "./pages/Configuration";
import Settings from "./pages/Settings";
import UXFlowDiagram from "./pages/UXFlowDiagram";
import CloudDeviceSimulator from "./pages/CloudDeviceSimulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home pages without sidebar */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<APKUpload />} />
          
          {/* All other pages with sidebar */}
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/new" element={<Layout><NewProject /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
          
          {/* Project-scoped routes */}
          <Route path="/projects/:projectId/tests" element={<Layout><Tests /></Layout>} />
          <Route path="/projects/:projectId/tests/new" element={<Layout><NewTest /></Layout>} />
          <Route path="/projects/:projectId/tests/:id" element={<Layout><TestDetail /></Layout>} />
          <Route path="/projects/:projectId/tests/:id/edit" element={<Layout><NewTest /></Layout>} />
          
          <Route path="/projects/:projectId/plans" element={<Layout><Plans /></Layout>} />
          <Route path="/projects/:projectId/plans/new" element={<Layout><NewPlan /></Layout>} />
          <Route path="/projects/:projectId/plans/:id" element={<Layout><PlanDetail /></Layout>} />
          <Route path="/projects/:projectId/plans/:id/edit" element={<Layout><NewPlan /></Layout>} />
          
          <Route path="/projects/:projectId/results" element={<Layout><Results /></Layout>} />
          <Route path="/projects/:projectId/results/:id" element={<Layout><ResultDetail /></Layout>} />
          
          <Route path="/projects/:projectId/insights" element={<Layout><Insights /></Layout>} />
          <Route path="/projects/:projectId/coverage" element={<Layout><Coverage /></Layout>} />
          <Route path="/projects/:projectId/configuration" element={<Layout><Configuration /></Layout>} />
          
          {/* UX Flow Diagram */}
          <Route path="/ux-flow" element={<Layout><UXFlowDiagram /></Layout>} />
          
          {/* Cloud Device Simulator */}
          <Route path="/cloud-simulator" element={<CloudDeviceSimulator />} />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/tests" element={<Layout><Tests /></Layout>} />
          <Route path="/new-test" element={<Layout><NewTest /></Layout>} />
          <Route path="/results" element={<Layout><Results /></Layout>} />
          <Route path="/results/:id" element={<Layout><ResultDetail /></Layout>} />
          <Route path="/plans" element={<Layout><Plans /></Layout>} />
          <Route path="/plans/new" element={<Layout><NewPlan /></Layout>} />
          <Route path="/plans/:id" element={<Layout><PlanDetail /></Layout>} />
          <Route path="/plans/:id/edit" element={<Layout><NewPlan /></Layout>} />
          <Route path="/tests/:id" element={<Layout><TestDetail /></Layout>} />
          <Route path="/tests/:id/edit" element={<Layout><NewTest /></Layout>} />
          <Route path="/insights" element={<Layout><Insights /></Layout>} />
          <Route path="/coverage" element={<Layout><Coverage /></Layout>} />
          <Route path="/configuration" element={<Layout><Configuration /></Layout>} />
          
          {/* Global settings */}
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;