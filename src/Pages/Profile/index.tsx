import { Grid, Box } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard, CommonProfileImageUpload } from "../../Components/Common";
import { Mutations, Queries } from "../../Api";
import { CommonValidationTextField } from "../../Attribute";
import type { UserFormValues } from "../../Types";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import { CommonPhoneNumber } from "../../Attribute/FormFields/CommonPhoneNumber";
import { useMemo } from "react";

const Profile = () => {
  const { data, refetch } = Queries.useGetUser();
  const user = data?.data;
  const { mutate: editUser, isPending: isEditLoading } = Mutations.useUpdateUser();

  const initialValues: UserFormValues = useMemo(() => {
    return {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNo: {
        countryCode: user?.phoneNo?.countryCode || "",
        number: user?.phoneNo?.number || "",
      },
      email: user?.email || "",
    };
  }, [user]);
  console.log("USER DATA:", user?.phoneNo);

  const handleSubmit = async (values: UserFormValues, { resetForm }: FormikHelpers<UserFormValues>) => {
    const payload = { ...values };
    await editUser(payload, {
      onSuccess: () => {
        refetch();
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
              <CommonCard grid={{ xs: 12 }} hideDivider>
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {/* Profile Section */}
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                      <div className="flex items-center bg-brand-500 text-white rounded-full border border-gray-200">
                        <div className="relative flex items-center justify-center w-20 h-20">
                          <CommonProfileImageUpload className="w-full h-full" />
                        </div>
                      </div>

                      <div className="order-3 xl:order-2">
                        <h4 className="mb-2 text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h4>

                        <p className="text-sm text-gray-500">
                          {user?.phoneNo?.countryCode} {user?.phoneNo?.number}
                        </p>

                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <CommonValidationTextField name="firstName" label="First Name" required grid={{ xs: 12 }} />
                  <CommonValidationTextField name="lastName" label="Last Name" required grid={{ xs: 12, md: 6 }} />
                  <CommonPhoneNumber label="Phone No." countryCodeName="phoneNo.countryCode" numberName="phoneNo.number" grid={{ xs: 12, md: 6 }} />
                  <CommonValidationTextField name="email" label="Email" required grid={{ xs: 12, md: 6 }} />
                </Grid>
              </CommonCard>
              <CommonBottomActionBar save disabled={!dirty} isLoading={isEditLoading} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Profile;
