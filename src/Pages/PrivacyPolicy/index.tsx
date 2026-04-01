import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations, Queries } from "../../Api";
import { CommonValidationQuillInput } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import type { PrivacyPolicyFormValues } from "../../Types/PrivacyPolicy";

const PrivacyPolicy = () => {
  const { data, isLoading } = Queries.useGetPrivacyPolicy();
  const { mutate: updatePrivacyPolicy, isPending: isEditLoading } = Mutations.useUpdatePrivacyPolicy();

  const initialValues: PrivacyPolicyFormValues = {
    description: data?.data?.description || "",
  };

  const handleSubmit = async (values: PrivacyPolicyFormValues, { resetForm }: FormikHelpers<PrivacyPolicyFormValues>) => {
    await updatePrivacyPolicy(values, { onSuccess: () => resetForm() });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.PRIVACY_POLICY.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.PRIVACY_POLICY.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<PrivacyPolicyFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <CommonValidationQuillInput name="description" required grid={{ xs: 12 }} disabled={isLoading} />
              </Grid>
              <CommonBottomActionBar submit disabled={!dirty} isLoading={isEditLoading} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
