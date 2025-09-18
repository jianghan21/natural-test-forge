import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Home and Projects */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            
            {/* Project-scoped routes */}
            <Route path="/projects/:projectId/tests" element={<Tests />} />
            <Route path="/projects/:projectId/tests/new" element={<NewTest />} />
            <Route path="/projects/:projectId/tests/:id" element={<TestDetail />} />
            <Route path="/projects/:projectId/tests/:id/edit" element={<NewTest />} />
            
            <Route path="/projects/:projectId/plans" element={<Plans />} />
            <Route path="/projects/:projectId/plans/new" element={<NewPlan />} />
            <Route path="/projects/:projectId/plans/:id" element={<PlanDetail />} />
            <Route path="/projects/:projectId/plans/:id/edit" element={<NewPlan />} />
            
            <Route path="/projects/:projectId/results" element={<Results />} />
            <Route path="/projects/:projectId/results/:id" element={<ResultDetail />} />
            
            <Route path="/projects/:projectId/insights" element={<Insights />} />
            <Route path="/projects/:projectId/coverage" element={<Coverage />} />
            <Route path="/projects/:projectId/configuration" element={<Configuration />} />
            
            {/* UX Flow Diagram */}
            <Route path="/ux-flow" element={<UXFlowDiagram />} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/new-test" element={<NewTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/results/:id" element={<ResultDetail />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/new" element={<NewPlan />} />
            <Route path="/plans/:id" element={<PlanDetail />} />
            <Route path="/plans/:id/edit" element={<NewPlan />} />
            <Route path="/tests/:id" element={<TestDetail />} />
            <Route path="/tests/:id/edit" element={<NewTest />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/coverage" element={<Coverage />} />
            <Route path="/configuration" element={<Configuration />} />
            
            {/* Global settings */}
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
