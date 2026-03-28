import { Typography, Avatar, Box } from "@mui/material";
import { CommonCard } from "../Common";

const RECENT_MESSAGES = [
  { id: 1, name: "Alice Johnson", message: "Hi! I really love your portfolio. Are you open for freelance work?", date: "10 mins ago", avatar: "AJ", color: "bg-blue-100 text-blue-600" },
  { id: 2, name: "David Smith", message: "Could you share more details about your latest project?", date: "2 hours ago", avatar: "DS", color: "bg-purple-100 text-purple-600" },
  { id: 3, name: "Emily Davis", message: "Great work! Let's connect on LinkedIn.", date: "1 day ago", avatar: "ED", color: "bg-green-100 text-green-600" },
  { id: 4, name: "Michael Brown", message: "Do you have experience with React Native?", date: "2 days ago", avatar: "MB", color: "bg-orange-100 text-orange-600" },
];

const RecentMessages = () => {
  return (
    <CommonCard grid={{ xs: 12, md: 6 }} title="Recent Messages" topContent={<Typography className="text-blue-500! cursor-pointer text-sm font-medium hover:underline">View All</Typography>} paperProps={{ className: "!rounded-2xl h-full shadow-sm dark:shadow-none" }}>
      <Box className="flex flex-col p-2 sm:p-4 gap-2">
        {RECENT_MESSAGES.map((msg) => (
          <Box key={msg.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 cursor-pointer">
            <Avatar className={`${msg.color} !font-bold`}>{msg.avatar}</Avatar>
            <Box className="flex-1 min-w-0 mt-0.5">
              <Box className="flex justify-between items-center mb-1">
                <Typography className="font-semibold text-gray-800! dark:text-gray-200! text-sm truncate">{msg.name}</Typography>
                <Typography className="text-xs text-gray-400! whitespace-nowrap ml-2">{msg.date}</Typography>
              </Box>
              <Typography className="text-sm text-gray-500! dark:text-gray-400! truncate">{msg.message}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CommonCard>
  );
};

export default RecentMessages;
