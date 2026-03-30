import { Grid, Typography, Box } from "@mui/material";
import { StatsCards, VisitorsAnalytics, RecentMessages, QuickActions, RecentActivity } from "../../Components/Dashboard";

const Dashboard = () => {
  return (
    <Box className="w-full min-h-screen relative p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-transparent overflow-x-clip">
      {/* BACKGROUND EFFECTS */}
      {/* <CommonBgEffect /> */}

      <Box className="relative z-10 w-full flex flex-col gap-6">
        {/* Header */}
        <Box className="mb-2">
          <Typography className="text-2xl font-bold text-gray-800! dark:text-white! mb-1">Overview</Typography>
          <Typography className="text-sm text-gray-500! dark:text-gray-400!">Monitor your portfolio performance and activities.</Typography>
        </Box>

        {/* Top Section - Stats Cards */}
        <StatsCards />

        {/* Main Section - Visitors Analytics Graph */}
        <VisitorsAnalytics />

        {/* Secondary Section - Recent Messages vs Quick Actions */}
        <Grid container spacing={3}>
          {/* Left Column - Recent Messages */}
          <RecentMessages />

          {/* Right Column - Quick Actions */}
          <QuickActions />
        </Grid>

        {/* Bottom Section - Recent Activity Feed */}
        <RecentActivity />
      </Box>
    </Box>
  );
};

export default Dashboard;
