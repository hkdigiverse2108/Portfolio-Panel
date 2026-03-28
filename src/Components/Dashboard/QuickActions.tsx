import { Grid, Typography, Box } from "@mui/material";
import { AddCircleOutline, PersonOutline, BuildOutlined, SettingsOutlined } from "@mui/icons-material";
import { CommonCard } from "../Common";

const QUICK_ACTIONS = [
  { title: "Add Project", icon: <AddCircleOutline fontSize="large" />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { title: "Edit Profile", icon: <PersonOutline fontSize="large" />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { title: "Add Skill", icon: <BuildOutlined fontSize="large" />, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
  { title: "Manage Content", icon: <SettingsOutlined fontSize="large" />, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
];

const QuickActions = () => {
  return (
    <CommonCard grid={{ xs: 12, md: 6 }} title="Quick Actions" paperProps={{ className: "!rounded-2xl h-full shadow-sm dark:shadow-none bg-white! dark:bg-[#111111]!" }}>
      <Grid container spacing={2} className="p-3 sm:p-5">
        {QUICK_ACTIONS.map((action, idx) => (
          <Grid size={{ xs: 6 }} key={idx}>
            <Box className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gray-50/70 dark:bg-gray-800/20 hover:bg-white dark:hover:bg-gray-800/40 transition-all border border-gray-100 dark:border-gray-700/50 hover:shadow-md cursor-pointer group">
              <Box className={`p-2.5 sm:p-3.5 rounded-full mb-2 group-hover:scale-110 transition-transform ${action.bg} ${action.color}`}>{action.icon}</Box>
              <Typography className="font-semibold text-gray-700! dark:text-gray-300! text-[11px] sm:text-xs text-center uppercase tracking-wider">{action.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </CommonCard>
  );
};

export default QuickActions;
