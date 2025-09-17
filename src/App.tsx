import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-test" element={<NewTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/results/:id" element={<ResultDetail />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/new" element={<NewPlan />} />
            <Route path="/plans/:id" element={<PlanDetail />} />
            <Route path="/plans/:id/edit" element={<NewPlan />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/tests/:id" element={<TestDetail />} />
            <Route path="/tests/:id/edit" element={<NewTest />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/coverage" element={<Coverage />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
