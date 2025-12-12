import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllShoeSales } from "../services/shoeSaleServices";
import LineChart from "../components/LineChart";
import SummaryTile from "../components/SummaryTile";
import DataTable from "../components/DataTable";

const AnalyticsDashboard = () => {
  const { data: shoeSaleData } = useQuery({
    queryFn: getAllShoeSales,
    queryKey: ["getAllShoeSales"],
    refetchOnWindowFocus: true,
  });

  const metricOptions = [
    { key: "sales", label: "Sales", color: "rgb(75, 192, 192)" },
    { key: "clicks", label: "Clicks", color: "rgb(255, 99, 132)" },
    { key: "impressions", label: "Impressions", color: "rgb(54, 162, 235)" },
    { key: "ad_cost", label: "Ad Cost", color: "rgb(255, 159, 64)" },
  ];

  const [selectedShoe, setSelectedShoe] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState(["sales"]);
  const [startDate, setStartDate] = useState("2025-09-01");
  const [endDate, setEndDate] = useState("2025-10-01");

  // Filter by Date Range
  const filteredData = useMemo(() => {
    if (!shoeSaleData?.data) return [];

    return shoeSaleData.data.filter((item) => {
      const date = item.date.split("T")[0];
      return date >= startDate && date <= endDate;
    });
  }, [shoeSaleData, startDate, endDate]);

  // Filter out Duplicate Shoes for Selector
  const uniqueShoes = useMemo(() => {
    const map = new Map();

    filteredData.forEach((item) => {
      if (!map.has(item.shoe_name)) {
        map.set(item.shoe_name, item);
      }
    });

    return [...map.values()];
  }, [filteredData]);

  // Auto-select first shoe once data loads
  useEffect(() => {
    if (uniqueShoes.length && !selectedShoe) {
      setSelectedShoe(uniqueShoes[0].shoe_name);
    }
  }, [uniqueShoes, selectedShoe]);

  // Calculate Grand Totals
  const summary = useMemo(() => {
    let totalSales = 0,
      totalAdCost = 0,
      totalImpressions = 0,
      totalClicks = 0;

    filteredData.forEach((i) => {
      totalSales += i.sales || 0;
      totalAdCost += i.ad_cost || 0;
      totalImpressions += i.impressions || 0;
      totalClicks += i.clicks || 0;
    });

    return { totalSales, totalAdCost, totalImpressions, totalClicks };
  }, [filteredData]);

  // Data for Summary Table
  const tableData = useMemo(() => {
    const map = new Map();

    filteredData.forEach((item) => {
      if (!map.has(item.shoe_name)) {
        map.set(item.shoe_name, {
          brand: item.brand,
          shoe_name: item.shoe_name,
          sales: 0,
          ad_cost: 0,
          impressions: 0,
          clicks: 0,
        });
      }

      const row = map.get(item.shoe_name);
      row.sales += item.sales || 0;
      row.ad_cost += item.ad_cost || 0;
      row.impressions += item.impressions || 0;
      row.clicks += item.clicks || 0;
    });

    return [...map.values()];
  }, [filteredData]);

  // Chart Data for Selected Shoe & Metrics
  const chartData = useMemo(() => {
    return filteredData
      .filter((i) => i.shoe_name === selectedShoe)
      .map((i) => {
        const row = { date: i.date.split("T")[0] };

        selectedMetrics.forEach((m) => {
          row[m] = i[m];
        });

        return row;
      });
  }, [filteredData, selectedShoe, selectedMetrics]);

  // Toggle max 2 metrics
  const handleMetricChange = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else if (selectedMetrics.length < 2) {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-300">
        <h1 className="font-bold text-2xl">Brand Sales Analytics</h1>
        <span className="text-gray-600">
          Track your shoe sales performance and advertising metrics
        </span>
      </div>

      {/* Date Picker */}
      <div className="rounded-lg m-4 border-2 border-gray-200 shadow-md p-4 md:flex gap-4 items-center">
        <span className="font-semibold text-sm">Date Range:</span>

        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />

          <span className="text-gray-800">to</span>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        <SummaryTile label="Total Sales" value={summary.totalSales} />
        <SummaryTile label="Total Ad Cost" value={`₹ ${summary.totalAdCost}`} />
        <SummaryTile
          label="Total Impressions"
          value={summary.totalImpressions}
        />
        <SummaryTile label="Total Clicks" value={summary.totalClicks} />
      </div>

      {/* Line Chart */}
      <div className="m-6 p-4 rounded-lg shadow-md border-2 border-gray-200">
        <div className="md:flex space-y-4 md:space-y-0 justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Trend Analysis</h2>

          {/* Shoe Selector */}
          <div>
            <span className="font-semibold mr-2">Shoe:</span>
            <select
              value={selectedShoe}
              onChange={(e) => setSelectedShoe(e.target.value)}
              className="border p-2 rounded"
            >
              {uniqueShoes.map((item) => (
                <option key={item.shoe_name} value={item.shoe_name}>
                  {item.shoe_name}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Selector */}
          <div className="flex gap-4 flex-wrap">
            <span className="font-semibold">Metrics (Max 2):</span>
            <div className="flex justify-between gap-4 flex-wrap">
              {metricOptions.map((metric) => (
                <label key={metric.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.key)}
                    onChange={() => handleMetricChange(metric.key)}
                  />
                  {metric.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="md:h-150 flex justify-center">
          <LineChart
            data={chartData}
            xKey="date"
            yKeys={selectedMetrics}
            colors={selectedMetrics.map(
              (key) => metricOptions.find((m) => m.key === key)?.color
            )}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable tableData={tableData} />
    </div>
  );
};

export default AnalyticsDashboard;
