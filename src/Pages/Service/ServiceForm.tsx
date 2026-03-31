import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import { setServiceModal } from "../../Store/Slices/ModalSlice";
import type { ServiceFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { ServiceSchema } from "../../Utils/ValidationSchemas";

const RoleForm = () => {
  const { mutate: addService, isPending: isAddLoading } = Mutations.useAddService();
  const { mutate: editService, isPending: isEditLoading } = Mutations.useEditService();

  const { isServiceModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isServiceModal.data;
  const openModal = isServiceModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: ServiceFormValues = {
    name: isEdit?.name || "",
    isActive: isEdit?.isActive ?? true,
  };

  const closeModal = () => dispatch(setServiceModal({ open: false, data: null }));

  const handleSubmit = (values: ServiceFormValues, { resetForm }: FormikHelpers<ServiceFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<ServiceFormValues>);
      editService({ ...changedFields, serviceId: isEdit?._id as string }, { onSuccess: onSuccessHandler });
    } else {
      addService(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.SERVICE[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<ServiceFormValues> enableReinitialize initialValues={initialValues} validationSchema={ServiceSchema} onSubmit={handleSubmit}>
        {({ dirty }) => (
          <Form noValidate>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="name" label="Name" grid={{ xs: 12 }} required />

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
export default RoleForm;
