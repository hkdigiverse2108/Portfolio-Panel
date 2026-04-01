import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations, Queries } from "../../Api";
import { CommonValidationTextField } from "../../Attribute";
import { CommonValidationCreatableSelect } from "../../Attribute/FormFields/CommonSelectTab";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import type { HeroSectionFormValues } from "../../Types";
import { HeroSectionSchema } from "../../Utils/ValidationSchemas";

const HeroSection = () => {
  const { data, isLoading } = Queries.useGetHeroSection();
  const { mutate: updateHeroSection, isPending: isEditLoading } = Mutations.useUpdateHeroSection();

  const initialValues: HeroSectionFormValues = {
    title: data?.data?.title || "",
    subTitles: data?.data?.subTitles || [],
    linkTitle: data?.data?.linkTitle || "",
    link: data?.data?.link || "",
    description: data?.data?.description || "",
  };

  const handleSubmit = async (values: HeroSectionFormValues, { resetForm }: FormikHelpers<HeroSectionFormValues>) => {
    await updateHeroSection(values, { onSuccess: () => resetForm() });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.HERO_SECTION.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.HERO_SECTION.BASE} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<HeroSectionFormValues> enableReinitialize initialValues={initialValues} validationSchema={HeroSectionSchema} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                  <CommonValidationTextField name="title" label="Title" required grid={{ xs: 12, md: 6 }} disabled={isLoading} />
                  <CommonValidationCreatableSelect name="subTitles" label="Sub Titles" options={[]} required grid={{ xs: 12, md: 6 }} disabled={isLoading} />
                  <CommonValidationTextField name="linkTitle" label="Link Title" required grid={{ xs: 12, md: 6 }} disabled={isLoading} />
                  <CommonValidationTextField name="link" label="Link" required grid={{ xs: 12, md: 6 }} disabled={isLoading} />
                  <CommonValidationTextField name="description" label="Description" grid={{ xs: 12 }} multiline disabled={isLoading} />
                </Grid>
                <CommonBottomActionBar save disabled={!dirty} isLoading={isEditLoading} />
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default HeroSection;
