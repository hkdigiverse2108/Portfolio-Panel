import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import { setWorkCountModal } from "../../Store/Slices/ModalSlice";
import type { WorkCountFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { WorkCountSchema } from "../../Utils/ValidationSchemas";

const WorkCountForm = () => {
  const { mutate: addWorkCount, isPending: isAddLoading } = Mutations.useAddWorkCount();
  const { mutate: editWorkCount, isPending: isEditLoading } = Mutations.useEditWorkCount();

  const { isWorkCountModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isWorkCountModal.data;
  const openModal = isWorkCountModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: WorkCountFormValues = {
    title: isEdit?.title || "",
    number: isEdit?.number || "",
    isActive: isEdit?.isActive ?? true,
  };

  const closeModal = () => dispatch(setWorkCountModal({ open: false, data: null }));

  const handleSubmit = (values: WorkCountFormValues, { resetForm }: FormikHelpers<WorkCountFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<WorkCountFormValues>);
      editWorkCount({ ...changedFields, workCountId: isEdit?._id as string }, { onSuccess: onSuccessHandler });
    } else {
      addWorkCount(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.WORK_COUNT[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<WorkCountFormValues> enableReinitialize initialValues={initialValues} validationSchema={WorkCountSchema} onSubmit={handleSubmit}>
        {({ dirty }) => (
          <Form noValidate>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="title" label="Title" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="number" label="Count" grid={{ xs: 12 }} required />

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
export default WorkCountForm;
