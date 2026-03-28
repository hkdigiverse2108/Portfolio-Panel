import { ImagePath, ThemeTitle } from "../../Constants";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen relative px-4 overflow-hidden bg-gray-50 dark:bg-gray-dark">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* GOLDEN RAYS */}
        <div className="golden-ray-static top-[40%] left-[-25%]"></div>
        <div className="golden-ray-static top-[60%] left-[-25%] opacity-40"></div>

        {/* PATTERNS */}
        <img src={`${ImagePath}logo/grid-01.svg`} alt="pattern" className="absolute right-0 top-0 w-full max-w-[300px] xl:max-w-[500px] opacity-20 dark:opacity-10" />
        <img src={`${ImagePath}logo/grid-01.svg`} alt="pattern" className="absolute bottom-0 left-0 w-full max-w-[300px] rotate-180 xl:max-w-[500px] opacity-20 dark:opacity-10" />
      </div>

      {/* CENTERED CARD */}
      <div className="relative z-10 w-full max-w-[600px] p-8 sm:p-10 bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#333333] rounded-2xl shadow-theme-lg dark:shadow-theme-dark-lg flex flex-col items-center">
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center mb-6 text-center">
          <img src={`${ImagePath}logo/logo.png`} alt="Portfolio Logo" className="w-auto h-11 object-contain block dark:hidden" />
          <img src={`${ImagePath}logo/logo-dark.png`} alt="Portfolio Logo" className="w-auto h-11 object-contain hidden dark:block" />
          <p className="text-gray-500 text-xs sm:text-sm font-medium mt-2">{ThemeTitle}</p>
        </div>

        {/* WELCOME TEXT */}
        <div className="mb-6 w-full text-center">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">Welcome to Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your portfolio and track your progress!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;