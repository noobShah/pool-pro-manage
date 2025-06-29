
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";
import { Clients } from "./components/Clients";
import { Contractors } from "./components/Contractors";
import { Documents } from "./components/Documents";
import { Accounts } from "./components/Accounts";
import { Reports } from "./components/Reports";
import { Marketing } from "./components/Marketing";
import { Settings } from "./components/Settings";
import { Materials } from "./components/Materials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="projects" element={<Projects />} />
            <Route path="clients" element={<Clients />} />
            <Route path="contractors" element={<Contractors />} />
            <Route path="documents" element={<Documents />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="reports" element={<Reports />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="materials" element={<Materials />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
