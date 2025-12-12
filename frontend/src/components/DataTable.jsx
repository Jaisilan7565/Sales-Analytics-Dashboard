import React, { useState, useMemo } from "react";

const DataTable = ({ tableData }) => {
  const [selectedBrand, setSelectedBrand] = useState("");

  // Get distinct brands from tableData
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(tableData.map((row) => row.brand))];
    return uniqueBrands;
  }, [tableData]);

  // Filter tableData based on selected brand
  const filteredData = useMemo(() => {
    if (!selectedBrand) return tableData;
    return tableData.filter((row) => row.brand === selectedBrand);
  }, [selectedBrand, tableData]);

  // Compute grand totals for filtered data
  const filteredTotals = useMemo(() => {
    return filteredData.reduce(
      (totals, row) => {
        totals.sales += row.sales;
        totals.ad_cost += row.ad_cost;
        totals.impressions += row.impressions;
        totals.clicks += row.clicks;
        return totals;
      },
      { sales: 0, ad_cost: 0, impressions: 0, clicks: 0 }
    );
  }, [filteredData]);

  return (
    <div className="m-6 p-4 rounded-2xl shadow-lg border border-gray-200 bg-white/90">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Shoe Sale Summary</h2>

        {/* Brand Dropdown */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Brand :</label>
          <select
            className="border p-2 rounded"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0 shadow-sm">
            <tr>
              {["Shoe Name", "Sales", "Ad Cost", "Impressions", "Clicks"].map(
                (h) => (
                  <th
                    key={h}
                    className="border p-3 text-left font-semibold text-gray-700"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr
                key={i}
                className={`transition-all hover:bg-blue-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border p-3">{row.shoe_name}</td>
                <td className="border p-3 text-right">{row.sales}</td>
                <td className="border p-3 text-right">₹ {row.ad_cost}</td>
                <td className="border p-3 text-right">{row.impressions}</td>
                <td className="border p-3 text-right">{row.clicks}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-200 font-bold">
              <td className="border p-3">Grand Total</td>
              <td className="border p-3 text-right">{filteredTotals.sales}</td>
              <td className="border p-3 text-right">
                ₹ {filteredTotals.ad_cost}
              </td>
              <td className="border p-3 text-right">
                {filteredTotals.impressions}
              </td>
              <td className="border p-3 text-right">{filteredTotals.clicks}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
