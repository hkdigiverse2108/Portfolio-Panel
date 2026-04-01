import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations, Queries } from "../../Api";
import { CommonValidationQuillInput } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import type { TermsConditionsFormValues } from "../../Types/TermsConditions";

const TermsConditions = () => {
  const { data, isLoading } = Queries.useGetTermsConditions();
  const { mutate: updateTermsConditions, isPending: isEditLoading } = Mutations.useUpdateTermsConditions();

  const initialValues: TermsConditionsFormValues = {
    description: data?.data?.description || "",
  };

  const handleSubmit = async (values: TermsConditionsFormValues, { resetForm }: FormikHelpers<TermsConditionsFormValues>) => {
    await updateTermsConditions(values, { onSuccess: () => resetForm() });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.TERMS_CONDITIONS.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.TERMS_CONDITIONS.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<TermsConditionsFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2} className="ql-container-custom">
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

export default TermsConditions;
