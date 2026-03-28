import { Grid, Typography, Box } from "@mui/material";
import { PeopleAltOutlined, WorkOutline, ChatBubbleOutline, AutoAwesomeMosaicOutlined, TrendingUp, TrendingDown } from "@mui/icons-material";
import { CommonCard } from "../Common";

const DASHBOARD_STATS = [
  { title: "Total Visitors", value: "24.5K", trend: "+12%", trendUp: true, icon: <PeopleAltOutlined className="text-blue-500!" fontSize="medium" />, bgColor: "bg-blue-100 dark:bg-blue-900/30" },
  { title: "Total Projects", value: "48", trend: "+5%", trendUp: true, icon: <WorkOutline className="text-purple-500!" fontSize="medium" />, bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  { title: "Total Messages", value: "1,204", trend: "-2%", trendUp: false, icon: <ChatBubbleOutline className="text-green-500!" fontSize="medium" />, bgColor: "bg-green-100 dark:bg-green-900/30" },
  { title: "Total Skills", value: "32", trend: "+8%", trendUp: true, icon: <AutoAwesomeMosaicOutlined className="text-orange-500!" fontSize="medium" />, bgColor: "bg-orange-100 dark:bg-orange-900/30" },
];

const StatsCards = () => {
  return (
    <Grid container spacing={3}>
      {DASHBOARD_STATS.map((stat, idx) => (
        <CommonCard key={idx} grid={{ xs: 12, sm: 6, md: 3 }} paperProps={{ className: "p-5 !rounded-2xl h-full shadow-sm dark:shadow-none hover:-translate-y-1 transition-transform duration-300" }} hideDivider>
          <Box className="flex justify-between items-start">
            <Box>
              <Typography className="text-gray-500! dark:text-gray-400! text-sm font-medium mb-1">{stat.title}</Typography>
              <Typography className="text-3xl font-bold text-gray-800! dark:text-gray-100! mb-2">{stat.value}</Typography>
              <Box className="flex items-center gap-1">
                {stat.trendUp ? <TrendingUp className="text-green-500! text-sm!" /> : <TrendingDown className="text-red-500! text-sm!" />}
                <Typography className={`text-xs font-semibold ${stat.trendUp ? "text-green-500!" : "text-red-500!"}`}>{stat.trend}</Typography>
                <Typography className="text-xs text-gray-400! dark:text-gray-500! ml-1">vs last week</Typography>
              </Box>
            </Box>
            <Box className={`p-3 rounded-xl ${stat.bgColor}`}>{stat.icon}</Box>
          </Box>
        </CommonCard>
      ))}
    </Grid>
  );
};

export default StatsCards;
