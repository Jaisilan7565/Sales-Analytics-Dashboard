import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllShoeSales } from "../services/shoeSaleServices";

const AnalyticsDashboard = () => {
  const {
    data: shoeSaleData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryFn: getAllShoeSales,
    queryKey: ["getAllShoeSales"],
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    console.log("Shoe Sale Data:", shoeSaleData);
  }, [shoeSaleData]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center bg-cyan-300 p-4">
        Analytics Dashboard
      </h1>
    </div>
  );
};

export default AnalyticsDashboard;
