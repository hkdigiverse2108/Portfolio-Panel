import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import { setBusinessCategoryModal } from "../../Store/Slices/ModalSlice";
import type { BusinessCategoryFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { BusinessCategorySchema } from "../../Utils/ValidationSchemas";

const BusinessCategoryForm = () => {
  const { mutate: addBusinessCategory, isPending: isAddLoading } = Mutations.useAddBusinessCategory();
  const { mutate: editBusinessCategory, isPending: isEditLoading } = Mutations.useEditBusinessCategory();

  const { isBusinessCategoryModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isBusinessCategoryModal.data;
  const openModal = isBusinessCategoryModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: BusinessCategoryFormValues = {
    name: isEdit?.name || "",
    isActive: isEdit?.isActive ?? true,
  };

  const closeModal = () => dispatch(setBusinessCategoryModal({ open: false, data: null }));

  const handleSubmit = (values: BusinessCategoryFormValues, { resetForm }: FormikHelpers<BusinessCategoryFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<BusinessCategoryFormValues>);
      editBusinessCategory({ ...changedFields, businessCategoryId: isEdit?._id as string }, { onSuccess: onSuccessHandler });
    } else {
      addBusinessCategory(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.BUSINESS_CATEGORY[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<BusinessCategoryFormValues> enableReinitialize initialValues={initialValues} validationSchema={BusinessCategorySchema} onSubmit={handleSubmit}>
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
export default BusinessCategoryForm;
