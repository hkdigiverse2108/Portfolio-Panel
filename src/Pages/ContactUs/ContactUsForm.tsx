import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { PAGE_TITLE } from "../../Constants";
import { useAppSelector } from "../../Store/hooks";
import { setContactUsModal } from "../../Store/Slices/ModalSlice";
import type { ContactUsFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { ContactUsSchema } from "../../Utils/ValidationSchemas";

const ContactUsForm = () => {
  const { mutate: addContactUs, isPending: isAddLoading } = Mutations.useAddContactUs();
  const { mutate: editContactUs, isPending: isEditLoading } = Mutations.useEditContactUs();

  const { isContactUsModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isContactUsModal.data;
  const openModal = isContactUsModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: ContactUsFormValues = {
    name: isEdit?.name || "",
    email: isEdit?.email || "",
    phoneNo: isEdit?.phoneNo,
    message: isEdit?.message || "",
    isActive: isEdit?.isActive ?? true,
  };

  const closeModal = () => dispatch(setContactUsModal({ open: false, data: null }));

  const handleSubmit = (values: ContactUsFormValues, { resetForm }: FormikHelpers<ContactUsFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<ContactUsFormValues>);
      editContactUs({ ...changedFields, contactUsId: isEdit?._id as string }, { onSuccess: onSuccessHandler });
    } else {
      addContactUs(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.WORK_EXPERIENCE[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<ContactUsFormValues> enableReinitialize initialValues={initialValues} validationSchema={ContactUsSchema} onSubmit={handleSubmit}>
        {({ dirty }) => (
          <Form noValidate>
            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="name" label="Name" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="phoneNo" label="Phone No" type="number" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="email" label="Email" grid={{ xs: 12 }} />
              <CommonValidationTextField name="message" label="Message" grid={{ xs: 12 }} multiline rows={4} />

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
export default ContactUsForm;
