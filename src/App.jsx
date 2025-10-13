import { ToastContainer } from "react-toastify"
import { AppRouterProvider } from "./routes/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient =  new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
  