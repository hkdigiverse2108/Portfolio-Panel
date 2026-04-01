import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import { setWorkExperienceModal } from "../../Store/Slices/ModalSlice";
import type { WorkExperienceFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { WorkExperienceSchema } from "../../Utils/ValidationSchemas";

const WorkExperienceForm = () => {
  const { mutate: addWorkExperience, isPending: isAddLoading } = Mutations.useAddWorkExperience();
  const { mutate: editWorkExperience, isPending: isEditLoading } = Mutations.useEditWorkExperience();

  const { isWorkExperienceModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isWorkExperienceModal.data;
  const openModal = isWorkExperienceModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: WorkExperienceFormValues = {
    year: isEdit?.year,
    title: isEdit?.title || "",
    subTitle: isEdit?.subTitle || "",
    isActive: isEdit?.isActive ?? true,
  };

  const closeModal = () => dispatch(setWorkExperienceModal({ open: false, data: null }));

  const handleSubmit = (values: WorkExperienceFormValues, { resetForm }: FormikHelpers<WorkExperienceFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<WorkExperienceFormValues>);
      editWorkExperience({ ...changedFields, workExperienceId: isEdit?._id as string }, { onSuccess: onSuccessHandler });
    } else {
      addWorkExperience(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.WORK_EXPERIENCE[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<WorkExperienceFormValues> enableReinitialize initialValues={initialValues} validationSchema={WorkExperienceSchema} onSubmit={handleSubmit}>
        {({ dirty }) => (
          <Form noValidate>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="year" label="Year" type="number" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="title" label="Title" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="subTitle" label="Sub Title" grid={{ xs: 12 }} />

              {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
              <Grid sx={{ display: "flex", gap: 2, ml: "auto" }}>
                <CommonButton variant="outlined" onClick={closeModal} title="Cancel" />
                <CommonButton type="submit" variant="contained" title="Save" loading={isEditLoading || isAddLoading} disabled={!dirty} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CommonModal>
  );
};
export default WorkExperienceForm;
