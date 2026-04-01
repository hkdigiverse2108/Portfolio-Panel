import { Box, Grid } from "@mui/material";
import { Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { CommonValidationCreatableSelect, CommonValidationDatePicker, CommonValidationQuillInput, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { BlogFormValues, ImageSyncProps } from "../../Types";
import { GenerateOptions, GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { BlogSchema } from "../../Utils/ValidationSchemas";

const BlogForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeImageKey, setActiveImageKey] = useState<string | null>(null);

  const { data } = location.state || {};
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: addBlog, isPending: isAddLoading } = Mutations.useAddBlog();
  const { mutate: editBlog, isPending: isEditLoading } = Mutations.useEditBlog();

  const isEditing = Boolean(data?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues = useMemo<BlogFormValues>(
    () => ({
      thumbnailImage: data?.thumbnailImage || "",
      serviceId: data?.serviceId?._id || "",
      date: data?.date || "",
      title: data?.title || "",
      description: data?.description || "",
      images: data?.images || "",
      tagLine: data?.tagLine || "",
      tags: data?.tags || "",
      isActive: data?.isActive ?? true,
    }),
    [data],
  );

  const FormikImageSync = <T extends FormikValues>({ activeKey, clearActiveKey }: ImageSyncProps) => {
    const { selectedFiles } = useAppSelector((state) => state.modal);
    const { setFieldValue, values } = useFormikContext<T>();

    useEffect(() => {
      if (!selectedFiles.length || !activeKey) return;
      const merged = [...(values[activeKey] || []), ...selectedFiles].filter((v, i, arr) => arr.indexOf(v) === i);
      setFieldValue(activeKey, activeKey === "images" ? merged : merged[0]);

      dispatch(setSelectedFiles([]));
      clearActiveKey();
    }, [selectedFiles, activeKey, setFieldValue, clearActiveKey, values]);

    return null;
  };

  const handleUpload = (key: string) => {
    setActiveImageKey(key ?? "images");
    dispatch(setUploadModal({ open: true, type: "image", multiple: key === "images" }));
  };

  const handleSubmit = async (values: BlogFormValues, { resetForm }: FormikHelpers<BlogFormValues>) => {
    const { _submitAction, ...rest } = values;

    const payload = {
      ...rest,
    };

    const handleSuccess = () => {
      if (_submitAction === "saveAndNew") resetForm();
      else navigate(-1);
    };
    if (isEditing) {
      const changedFields = GetChangedFields(payload, data);
      await editBlog({ ...changedFields, blogId: data._id }, { onSuccess: handleSuccess });
    } else {
      await addBlog(RemoveEmptyFields(payload), { onSuccess: handleSuccess });
    }
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.BLOG[pageMode]} maxItems={1} breadcrumbs={BREADCRUMBS.BLOG[pageMode]} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<BlogFormValues> enableReinitialize initialValues={initialValues} validationSchema={BlogSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, resetForm, dirty }) => {
            return (
              <Form noValidate>
                <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />
                <Grid container spacing={2}>
                  {/* ---------- GENERAL DETAILS ---------- */}
                  <CommonCard title="General Details" grid={{ xs: 12 }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <CommonValidationSelect name="serviceId" label="Service" isLoading={serviceDataLoading} options={GenerateOptions(serviceData?.data?.service_data)} grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationTextField name="title" label="Title" grid={{ xs: 12, sm: 6 }} required />
                      <CommonValidationTextField name="tagLine" label="Tag Line" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationDatePicker name="date" label="Date" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationCreatableSelect name="tags" label="Tags" options={[]} grid={{ xs: 12 }} />
                      <CommonValidationQuillInput name="description" label="Description" grid={{ xs: 12 }} />
                      <CommonFormImageBox name="thumbnailImage" label="Thumbnail Image" type="image" grid={"auto"} onUpload={() => handleUpload("thumbnailImage")} />
                      <CommonFormImageBox name="images" label="Images" type="image" grid={"grow"} multiple onUpload={() => handleUpload("images")} />
                      {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
                    </Grid>
                  </CommonCard>
                  {/* ---------- ACTION BAR ---------- */}
                  <CommonBottomActionBar save={isEditing} clear={!isEditing} disabled={!dirty} isLoading={isAddLoading || isEditLoading} onClear={() => resetForm({ values: initialValues })} onSave={() => setFieldValue("_submitAction", "save")} onSaveAndNew={() => setFieldValue("_submitAction", "saveAndNew")} />
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default BlogForm;
