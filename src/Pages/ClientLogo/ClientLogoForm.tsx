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
import { setClientLogoModal, setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ClientLogoFormValues, ImageSyncProps } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { ClientLogoSchema } from "../../Utils/ValidationSchemas";

const BrandForm = () => {
  const { mutate: addBrand, isPending: isAddLoading } = Mutations.useAddClientLogo();
  const { mutate: editBrand, isPending: isEditLoading } = Mutations.useEditClientLogo();

  const [activeImageKey, setActiveImageKey] = useState<"image" | null>(null);
  const { isClientLogoModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isClientLogoModal.data;
  const openModal = isClientLogoModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: ClientLogoFormValues = {
    name: isEdit?.name || "",
    image: isEdit?.image || "",
    link: isEdit?.link || "",
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

  const handleUpload = () => {
    setActiveImageKey("image");
    dispatch(setUploadModal({ open: true, type: "image" }));
  };

  const closeModal = () => dispatch(setClientLogoModal({ open: false, data: null }));

  const handleSubmit = (values: ClientLogoFormValues, { resetForm }: FormikHelpers<ClientLogoFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<ClientLogoFormValues>);
      editBrand({ ...changedFields, clientLogoId: isEdit?._id }, { onSuccess: onSuccessHandler });
    } else {
      addBrand(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.CLIENT_LOGO[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<ClientLogoFormValues> enableReinitialize initialValues={initialValues} validationSchema={ClientLogoSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, dirty }) => (
          <Form noValidate>
            <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />

            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="name" label="Name" required grid={{ xs: 12 }} />
              <CommonValidationTextField name="link" label="Link" grid={{ xs: 12 }} />
              <CommonFormImageBox name="image" label="Image" type="image" grid={{ xs: 12 }} onUpload={handleUpload} onDelete={() => setFieldValue("image", null)} />

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
export default BrandForm;
