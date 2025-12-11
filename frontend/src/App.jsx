import React from "react";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 1000 * 60 * 5, // 5 minutes
  //       retry: 1,
  //     },
  //   },
  // });

  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <AnalyticsDashboard />
      {/* <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider> */}
    </>
  );
};

export default App;
