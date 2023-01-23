import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Spinner } from "./components/Spinner";
import AuthLayout from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AdminPage } from "./pages/AdminPage";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

const queryClient = new QueryClient();

export function WrapperApp() {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </>
  );
}
