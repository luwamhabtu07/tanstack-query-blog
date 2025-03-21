import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogList from "./screens/BlogList"; // Blog listing page

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogList />
    </QueryClientProvider>
  );
}
