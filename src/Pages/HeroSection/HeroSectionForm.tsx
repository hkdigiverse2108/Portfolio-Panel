import { Box, Grid } from "@mui/material";
import { Form, Formik,  type FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import type { HeroSectionFormValues } from "../../Types";
import { Mutations } from "../../Api";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import { CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonValidationCreatableSelect } from "../../Attribute/FormFields/CommonSelectTab";

const HeroSectionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { mutate: addHeroSection, isPending: isAddLoading } = Mutations.useAddHeroSection();
  const { mutate: editHeroSection, isPending: isEditLoading } = Mutations.useEditHeroSection();

  const isEditing = Boolean(data?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: HeroSectionFormValues = {
    title: data?.title || "",
    isActive: data?.isActive ?? true,
  };

  const handleSubmit = async (values: HeroSectionFormValues, { resetForm }: FormikHelpers<HeroSectionFormValues>) => {
    const { _submitAction, ...rest } = values;
    const payload = { ...rest };

    const handleSuccess = () => {
      if (_submitAction === "saveAndNew") resetForm();
      else navigate(-1);
    };

    if (isEditing) {
      const changedFields = GetChangedFields(payload, data);
      await editHeroSection({ ...changedFields, heroSectionId: data._id }, { onSuccess: handleSuccess });
    } else {
      await addHeroSection(RemoveEmptyFields(payload), { onSuccess: handleSuccess });
    }
  };

  // useEffect(() => {
  //   const hasAccess = isEditing ?edit : add;
  //   if (!hasAccess) navigate(-1);
  // }, [isEditing, navigate]);

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.HERO_SECTION[pageMode]} maxItems={3} breadcrumbs={BREADCRUMBS.HERO_SECTION[pageMode]} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<HeroSectionFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          {({ resetForm, setFieldValue, dirty }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <CommonCard hideDivider grid={{ xs: 12 }}>
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <CommonValidationTextField name="title" label="Title" grid={{ xs: 12, md: 6 }} />
                    <CommonValidationCreatableSelect name="subTitles" label="Sub Titles" options={[]} grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="linkTitle" label="Link Title" grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="link" label="Link" grid={{ xs: 12, md: 6 }} />
                    <CommonValidationTextField name="description" label="Description" grid={{ xs: 12 }} multiline />

                    {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
                  </Grid>
                </CommonCard>
                <CommonBottomActionBar save={isEditing} clear={!isEditing} disabled={!dirty} isLoading={isEditLoading || isAddLoading} onClear={() => resetForm({ values: initialValues })} onSave={() => setFieldValue("_submitAction", "save")} onSaveAndNew={() => setFieldValue("_submitAction", "saveAndNew")} />
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default HeroSectionForm;
