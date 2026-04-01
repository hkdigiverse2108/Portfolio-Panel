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
import { setMyAchievementModal, setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ImageSyncProps, MyAchievementFormValues } from "../../Types";
import { GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { MyAchievementSchema } from "../../Utils/ValidationSchemas";

const MyAchievementForm = () => {
  const { mutate: addMyAchievement, isPending: isAddLoading } = Mutations.useAddMyAchievement();
  const { mutate: editMyAchievement, isPending: isEditLoading } = Mutations.useEditMyAchievement();

  const [activeImageKey, setActiveImageKey] = useState<"image" | null>(null);
  const { isMyAchievementModal } = useAppSelector((state) => state.modal);

  const dispatch = useDispatch();

  const isEdit = isMyAchievementModal.data;
  const openModal = isMyAchievementModal.open;
  const isEditing = Boolean(isEdit?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues: MyAchievementFormValues = {
    title: isEdit?.title || "",
    image: isEdit?.image || "",
    link: isEdit?.link || "",
    btnTitle: isEdit?.btnTitle || "",
    btnLink: isEdit?.btnLink || "",
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

  const closeModal = () => dispatch(setMyAchievementModal({ open: false, data: null }));

  const handleSubmit = (values: MyAchievementFormValues, { resetForm }: FormikHelpers<MyAchievementFormValues>) => {
    const onSuccessHandler = () => {
      resetForm();
      closeModal();
    };

    if (isEditing) {
      const changedFields = GetChangedFields(values, isEdit as Partial<MyAchievementFormValues>);
      editMyAchievement({ ...changedFields, myAchievementId: isEdit?._id }, { onSuccess: onSuccessHandler });
    } else {
      addMyAchievement(RemoveEmptyFields(values), { onSuccess: onSuccessHandler });
    }
  };

  return (
    <CommonModal title={PAGE_TITLE.MY_ACHIEVEMENT[pageMode]} isOpen={openModal} onClose={closeModal} className="max-w-125">
      <Formik<MyAchievementFormValues> enableReinitialize initialValues={initialValues} validationSchema={MyAchievementSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, dirty }) => (
          <Form noValidate>
            <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />

            <Grid container spacing={2} sx={{ p: 1 }}>
              <CommonValidationTextField name="title" label="Title" grid={{ xs: 12 }} required />
              <CommonValidationTextField name="link" label="Link" grid={{ xs: 12 }} />
              <CommonValidationTextField name="btnTitle" label="Button Title" grid={{ xs: 12 }} />
              <CommonValidationTextField name="btnLink" label="Button Link" grid={{ xs: 12 }} />
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
export default MyAchievementForm;
