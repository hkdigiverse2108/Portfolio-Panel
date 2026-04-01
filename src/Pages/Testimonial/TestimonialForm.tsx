import { Grid } from "@mui/material";
import { Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSelectedFiles, setTestimonialModal, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ImageSyncProps, TestimonialFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { TestimonialSchema } from "../../Utils/ValidationSchemas";

const TestimonialForm = () => {
  const { mutate: addTestimonial, isPending: isAddLoading } = Mutations.useAddTestimonial();
  const { mutate: editTestimonial, isPending: isEditLoading } = Mutations.useEditTestimonial();

  const [activeImageKey, setActiveImageKey] = useState<string | null>(null);
  const { isTestimonialModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isTestimonialModal.data;
  const openModal = isTestimonialModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: TestimonialFormValues = {
    name: isEdit?.name || "",
    image: isEdit?.image || "",
    designation: isEdit?.designation || "",
    description: isEdit?.description || "",
    isActive: isEdit?.isActive ?? true,
  };

  const FormikImageSync = <T extends FormikValues>({ activeKey, clearActiveKey }: ImageSyncProps) => {
    const { selectedFiles } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const { setFieldValue } = useFormikContext<T>();

    useEffect(() => {
      if (!selectedFiles[0] || !activeKey) return;

      setFieldValue(activeKey, selectedFiles[0]);

      dispatch(setSelectedFiles([]));
      clearActiveKey();
    }, [selectedFiles, activeKey, setFieldValue, dispatch, clearActiveKey]);

    return null;
  };

  const handleUpload = (key: string) => {
    setActiveImageKey(key);
    dispatch(setUploadModal({ open: true, type: "image" }));
  };

  const closeModal = () => dispatch(setTestimonialModal({ open: false, data: null }));

  const handleSubmit = (values: TestimonialFormValues, { resetForm }: FormikHelpers<TestimonialFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<TestimonialFormValues>);
      editTestimonial({ ...changedFields, testimonialId: isEdit?._id }, { onSuccess: onSuccessHandler });
    } else {
      addTestimonial(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.TESTIMONIAL[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<TestimonialFormValues> enableReinitialize initialValues={initialValues} validationSchema={TestimonialSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, dirty }) => (
          <Form noValidate>
            <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />

            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="name" label="Name" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="designation" label="Designation" grid={{ xs: 12 }} />
              <CommonValidationTextField name="description" label="Description" grid={{ xs: 12 }} multiline rows={4} />
              <CommonFormImageBox name="image" label="Image" type="image" grid={"grow"} onUpload={() => handleUpload("image")} onDelete={() => setFieldValue("image", null)} />
              {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
              <Grid size={{ xs: 12 }} sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
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
export default TestimonialForm;
