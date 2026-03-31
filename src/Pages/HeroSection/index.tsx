import { Box, Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import type { HeroSectionFormValues } from "../../Types";
import { Mutations, Queries } from "../../Api";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import { CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonValidationCreatableSelect } from "../../Attribute/FormFields/CommonSelectTab";
import { HeroSectionSchema } from "../../Utils/ValidationSchemas";

const HeroSection = () => {
  const { data, refetch } = Queries.useGetHeroSection();
  const { mutate: editHeroSection, isPending: isEditLoading } = Mutations.useEditHeroSection();

  const initialValues: HeroSectionFormValues = {
    title: data?.data?.title || "",
    subTitles: data?.data?.subTitles || [],
    linkTitle: data?.data?.linkTitle || "",
    link: data?.data?.link || "",
    description: data?.data?.description || "",
    isActive: data?.data?.isActive ?? true,
  };

  const handleSubmit = async (values: HeroSectionFormValues, { resetForm }: FormikHelpers<HeroSectionFormValues>) => {
    const payload = { ...values };
    await editHeroSection(payload, {
      onSuccess: () => {
        refetch();
        resetForm();
      },
    });
  };


  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.HERO_SECTION.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.HERO_SECTION.BASE} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<HeroSectionFormValues> enableReinitialize initialValues={initialValues} validationSchema={HeroSectionSchema} onSubmit={handleSubmit}>
          {({ dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <CommonCard hideDivider grid={{ xs: 12 }}>
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <CommonValidationTextField name="title" label="Title" required grid={{ xs: 12, md: 6 }} />
                    <CommonValidationCreatableSelect name="subTitles" label="Sub Titles" options={[]} required grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="linkTitle" label="Link Title" required grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="link" label="Link" required grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="description" label="Description" grid={{ xs: 12 }} multiline />

                    <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />
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

export default HeroSection;
