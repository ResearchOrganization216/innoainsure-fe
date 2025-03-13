import { Dashboard } from "@/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
