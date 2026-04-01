import { Grid } from "@mui/material";
import { Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationDatePicker, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonModal } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setAwardsModal, setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { AwardsFormValues, ImageSyncProps } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { AwardsSchema } from "../../Utils/ValidationSchemas";

const AwardsForm = () => {
  const { mutate: addAwards, isPending: isAddLoading } = Mutations.useAddAwards();
  const { mutate: editAwards, isPending: isEditLoading } = Mutations.useEditAwards();

  const [activeImageKey, setActiveImageKey] = useState<string | null>(null);
  const { isAwardsModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isAwardsModal.data;
  const openModal = isAwardsModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: AwardsFormValues = {
    title: isEdit?.title || "",
    image: isEdit?.image || "",
    iconImage: isEdit?.iconImage || "",
    date: isEdit?.date || "",
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

  const closeModal = () => dispatch(setAwardsModal({ open: false, data: null }));

  const handleSubmit = (values: AwardsFormValues, { resetForm }: FormikHelpers<AwardsFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<AwardsFormValues>);
      editAwards({ ...changedFields, awardsId: isEdit?._id }, { onSuccess: onSuccessHandler });
    } else {
      addAwards(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.AWARDS[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<AwardsFormValues> enableReinitialize initialValues={initialValues} validationSchema={AwardsSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, dirty }) => (
          <Form noValidate>
            <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />

            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="title" label="Title" grid={{ xs: 12 }} required />
              <CommonValidationDatePicker name="date" label="Date" grid={{ xs: 12 }} />
              <CommonFormImageBox name="image" label="Image" type="image" grid={"grow"} onUpload={() => handleUpload("image")} onDelete={() => setFieldValue("image", null)} />
              <CommonFormImageBox name="iconImage" label="Icon Image" type="image" grid={"auto"} onUpload={() => handleUpload("iconImage")} onDelete={() => setFieldValue("iconImage", null)} />
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
export default AwardsForm;
