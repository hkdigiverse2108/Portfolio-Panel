import { Grid } from "@mui/material";
import { useAppSelector } from "../../../../Store/hooks";
import { CommonCard, CommonProfileImageUpload } from "../../../Common";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const CompanyDetails = [
    {
      title: "Basic Details",
      items: [
        { label: "First Name", value: user?.firstName },
        { label: "Last Name", value: user?.lastName },
        { label: "Phone No", value: `${user?.phoneNo?.countryCode} ${user?.phoneNo?.number}` },
        { label: "Email", value: user?.email },
      ],
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={12} className="p-5 border border-gray-200 rounded-lg dark:border-gray-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="flex items-center bg-brand-500 text-white rounded-full border border-gray-200 dropdown-toggle dark:border-gray-800">
              <div className="relative flex items-center justify-center w-20 h-20">
                <CommonProfileImageUpload className="w-full h-full" />
              </div>
              {/* </Tooltip> */}
            </div>
            <div className="order-3 xl:order-2">
              <div className="flex items-center gap-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">{`${user?.firstName} ${user?.lastName}`}</h4>
              </div>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.phoneNo?.countryCode} {user?.phoneNo?.number}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      {CompanyDetails.map((section) => (
        <CommonCard key={section.title} title={section.title} grid={{ xs: 12 }}>
          <Grid sx={{ p: 2 }} container spacing={2}>
            {section.items.map((item, idx) => (
              <Grid key={idx} size={{ xs: 12, xsm: 6, xl: 3 }}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 capitalize">{item.label}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{item.value || "-"}</p>
              </Grid>
            ))}
          </Grid>
        </CommonCard>
      ))}
    </Grid>
  );
};

export default Profile;
