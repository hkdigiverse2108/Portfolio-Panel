import { Box, Grid, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState, type SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { CommonBreadcrumbs } from "../../../Components/Common";
import { PAGE_TITLE } from "../../../Constants";
import { Person } from "@mui/icons-material";
import { BREADCRUMBS } from "../../../Data/Breadcrumbs";
import Profile from "../../../Components/Settings/AdminSettings/Profile";

const AdminSettings = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>(() => (typeof location.state === "number" ? location.state : 0));

  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue);

  const generalSettingTabs = [
    { label: "User Profile", value: 0, icon: <Person /> },
  ];

  // Map tab index → component
  const tabViews = [
    <Profile />, //
  ];

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.SETTINGS.ADMIN} maxItems={1} breadcrumbs={BREADCRUMBS.ADMIN_SETTING.BASE} />
      <div className="m-4 md:m-6">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3, lg: 3, xl: 2 }}>
            <Box className="rounded-lg py-4 bg-white dark:bg-gray-dark! border border-gray-200 dark:border-gray-800">
              <Tabs orientation={"vertical"} variant="scrollable" value={value} onChange={handleChange}>
                {generalSettingTabs.map((tab, index) => (
                  <Tab key={index} icon={tab.icon} label={tab.label} value={tab.value} iconPosition="start" className="capitalize" />
                ))}
              </Tabs>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 9, lg: 9, xl: 10 }} className="rounded-lg p-4 bg-white dark:bg-gray-dark! border border-gray-200 dark:border-gray-800">
            {tabViews[value]}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AdminSettings;
