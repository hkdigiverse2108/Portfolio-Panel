import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations, Queries } from "../../Api";
import { CommonPhoneNumber, CommonValidationTextField } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import type { SettingFormValues } from "../../Types";
import { SettingSchema } from "../../Utils/ValidationSchemas";

const Setting = () => {
  const { data, isLoading } = Queries.useGetSetting();
  const { mutate: updateSetting, isPending: isEditLoading } = Mutations.useUpdateSetting();

  const initialValues: SettingFormValues = {
    bookMeeting: {
      link: data?.data?.bookMeeting?.link || "",
      phoneNo: {
        countryCode: data?.data?.bookMeeting?.phoneNo?.countryCode || "",
        number: data?.data?.bookMeeting?.phoneNo?.number?.toString() || "",
      },
      email: data?.data?.bookMeeting?.email || "",
      address: data?.data?.bookMeeting?.address || "",
    },
  };

  const handleSubmit = async (values: SettingFormValues, { resetForm }: FormikHelpers<SettingFormValues>) => {
    await updateSetting(values, { onSuccess: () => resetForm() });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.SETTING.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.SETTING.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<SettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={SettingSchema} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <CommonValidationTextField name="bookMeeting.link" label="Link" required grid={{ xs: 12 }} disabled={isLoading} />
                <CommonPhoneNumber label="Phone No." countryCodeName="bookMeeting.phoneNo.countryCode" numberName="bookMeeting.phoneNo.number" grid={{ xs: 12, md: 6 }} />
                <CommonValidationTextField name="bookMeeting.email" label="Email" required grid={{ xs: 12, md: 6 }} />
                <CommonValidationTextField name="bookMeeting.address" label="Address" required grid={{ xs: 12 }} disabled={isLoading} multiline rows={2} />
              </Grid>
              <CommonBottomActionBar submit disabled={!dirty} isLoading={isEditLoading} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Setting;
