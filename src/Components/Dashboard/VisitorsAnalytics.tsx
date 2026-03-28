import { Grid } from "@mui/material";
import { useState } from "react";
import { CommonDateRangeSelector } from "../../Attribute";
import { DateConfig } from "../../Utils";
import { CommonCard, CommonLineChart } from "../Common";
import { useAppSelector } from "../../Store/hooks";


const VisitorsAnalytics = () => {
  const { isToggleTheme } = useAppSelector((state) => state.layout);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const fyStart = currentMonth < 3 ? `${currentYear - 1}-04-01` : `${currentYear}-04-01`;
  const fyEnd = currentMonth < 3 ? `${currentYear}-03-31` : `${currentYear + 1}-03-31`;

  const [range, setRange] = useState({
    start: DateConfig.utc(fyStart).startOf("day") || DateConfig.utc().startOf("day"),
    end: DateConfig.utc(fyEnd).endOf("day") || DateConfig.utc().endOf("day"),
  });

  const durationDays = range.end.diff(range.start, "day");
  const isMonthView = durationDays > 15;

  const topContent = (
    <Grid size={{ xs: 12, sm: 8, md: 5 }}>
      <CommonDateRangeSelector value={range} onChange={setRange} />
    </Grid>
  );

  return (
    <CommonCard title="Visitors Analytics" topContent={topContent} grid={{ xs: 12 }} paperProps={{ className: "!rounded-2xl shadow-sm dark:shadow-none bg-white! dark:bg-[#111111]!" }}>
      <CommonLineChart
        xAxis={[
          {
            data: !isMonthView ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Week 1", "Week 2", "Week 3", "Week 4"],
            scaleType: "point",
          },
        ]}
        series={[
          {
            data: !isMonthView ? [120, 180, 150, 300, 250, 400, 350] : [1000, 1200, 1500, 2300],
            area: true,
            color: isToggleTheme === "dark" ? "#D4AF37" : "#101828",
            label: "Visitors",
            showMark: true,
          },
        ]}
      />
    </CommonCard>
  );
};

export default VisitorsAnalytics;
