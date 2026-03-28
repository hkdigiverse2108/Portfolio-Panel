import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { type FC } from "react";
import type { CommonLineChartProps } from "../../Types";

const CommonLineChart: FC<CommonLineChartProps> = ({ height = 400, BoxClass = "w-full p-2 sm:p-4", sx, ...props }) => {
  return (
    <Box className={BoxClass} sx={{ height }}>
      <LineChart
        margin={{ top: 30, bottom: 50, left: 50, right: 30 }}
        sx={{
          ".MuiLineElement-root": { strokeWidth: 3 },
          ".MuiAreaElement-root": { fillOpacity: 0.15 },
          ".MuiChartsAxis-line": { stroke: "#9ca3af" },
          ".MuiChartsAxis-tick": { stroke: "#9ca3af" },
          ".MuiChartsAxis-tickLabel": { fill: "#6b7280" },
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
};

export default CommonLineChart;
