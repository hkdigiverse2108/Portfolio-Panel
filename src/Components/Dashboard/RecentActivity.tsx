import { Grid, Typography, Box } from "@mui/material";
import { CommonCard } from "../Common";

const RECENT_ACTIVITY = [
  { id: 1, text: "New message received from Alice Johnson", time: "10 mins ago", color: "border-blue-500" },
  { id: 2, text: "Project 'E-Commerce App' was added", time: "2 hours ago", color: "border-purple-500" },
  { id: 3, text: "Profile details updated", time: "1 day ago", color: "border-green-500" },
  { id: 4, text: "New skill 'React Native' added", time: "3 days ago", color: "border-orange-500" },
];

const RecentActivity = () => {
  return (
    <Grid container spacing={3}>
      <CommonCard grid={{ xs: 12 }} title="Recent Activity" paperProps={{ className: "!rounded-2xl shadow-sm dark:shadow-none" }}>
        <Box className="p-5 sm:p-6 relative ml-2 sm:ml-4">
          {/* Timeline continuous line */}
          <Box className="absolute left-[11px] sm:left-[27px] top-8 bottom-6 w-[2px] bg-gray-100 dark:bg-gray-800"></Box>

          <Box className="flex flex-col gap-6 relative">
            {RECENT_ACTIVITY.map((activity) => (
              <Box key={activity.id} className="flex items-start gap-5 group">
                <Box className={`w-6 h-6 rounded-full bg-white dark:bg-gray-dark border-[5px] flex-shrink-0 z-10 shadow-sm transition-transform group-hover:scale-110 ${activity.color}`}></Box>
                <Box className="pt-0.5">
                  <Typography className="font-medium text-gray-800! dark:text-gray-200! text-sm sm:text-base">{activity.text}</Typography>
                  <Typography className="text-xs sm:text-sm text-gray-400! mt-1">{activity.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </CommonCard>
    </Grid>
  );
};

export default RecentActivity;
