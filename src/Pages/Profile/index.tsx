import { Grid, Box } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useAppSelector } from "../../Store/hooks";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard, CommonProfileImageUpload } from "../../Components/Common";
import { Mutations } from "../../Api";
import { CommonValidationTextField } from "../../Attribute";
import type { UserFormValues } from "../../Types";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: editUser, isPending: isEditLoading } = Mutations.useEditUser();

  const initialValues: Partial<UserFormValues> = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNo: {
      countryCode: user?.phoneNo?.countryCode || "",
      phoneNo: user?.phoneNo?.number || "",
    },
    email: user?.email || "",
  };

  const handleSubmit = async (values: UserFormValues, { resetForm }: FormikHelpers<UserFormValues>) => {
    const payload = { ...values, userId: user?._id };
    await editUser(payload, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.PROFILE.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.PROFILE.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
    <Formik<UserFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid size={12} className="p-5 border border-gray-200 rounded-lg dark:border-gray-800">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                  <div className="flex items-center bg-brand-500 text-white rounded-full border border-gray-200 dropdown-toggle dark:border-gray-800">
                    <div className="relative flex items-center justify-center w-20 h-20">
                      <CommonProfileImageUpload className="w-full h-full" />
                    </div>
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
            <CommonCard title="Basic Details" grid={{ xs: 12 }}>
              <Grid container spacing={2} sx={{ p: 2 }}>
                <CommonValidationTextField name="firstName" label="First Name" required grid={{ xs: 12, md: 6 }} />
                <CommonValidationTextField name="lastName" label="Last Name" required grid={{ xs: 12, md: 6 }} />
                <CommonValidationTextField name="phoneNo.countryCode" label="Country Code" required grid={{ xs: 6, md: 3 }} />
                <CommonValidationTextField name="phoneNo.phoneNo" label="Phone Number" required grid={{ xs: 6, md: 3 }} />
                <CommonValidationTextField name="email" label="Email" required grid={{ xs: 12, md: 6 }} />
              </Grid>
            </CommonCard>
            <CommonBottomActionBar save disabled={!dirty} isLoading={isEditLoading} />
          </Grid>
        </Form>
      )}
    </Formik>
    </Box>
    </>
  );
};

export default Profile;
