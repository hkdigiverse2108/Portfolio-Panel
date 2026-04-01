import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations, Queries } from "../../Api";
import { CommonValidationTextField } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import type { TestimonialDescriptionFormValues } from "../../Types";
import { TestimonialDescriptionSchema } from "../../Utils/ValidationSchemas";

const TestimonialDescription = () => {
  const { data, isLoading } = Queries.useGetTestimonialDescription();
  const { mutate: updateTestimonialDescription, isPending: isEditLoading } = Mutations.useUpdateTestimonialDescription();

  const initialValues: TestimonialDescriptionFormValues = {
    title: data?.data?.title || "",
    subTitle: data?.data?.subTitle || "",
    rating: data?.data?.rating || 0,
  };

  const handleSubmit = async (values: TestimonialDescriptionFormValues, { resetForm }: FormikHelpers<TestimonialDescriptionFormValues>) => {
    await updateTestimonialDescription(values, { onSuccess: () => resetForm() });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.TESTIMONIAL_DESCRIPTION.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.TESTIMONIAL_DESCRIPTION.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<TestimonialDescriptionFormValues> enableReinitialize initialValues={initialValues} validationSchema={TestimonialDescriptionSchema} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <CommonValidationTextField name="title" label="Title" required grid={{ xs: 12 }} disabled={isLoading} />
                <CommonValidationTextField name="subTitle" label="Sub Title" required grid={{ xs: 12 }} disabled={isLoading} />
                <CommonValidationTextField name="rating" label="Rating" type="number" required grid={{ xs: 12 }} disabled={isLoading} />
              </Grid>
              <CommonBottomActionBar submit disabled={!dirty} isLoading={isEditLoading} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default TestimonialDescription;
