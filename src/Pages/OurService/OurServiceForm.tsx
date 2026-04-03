import { Box, Grid } from "@mui/material";
import { Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { CommonValidationQuillInput, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ImageSyncProps, OurServiceFormValues, ServiceBase } from "../../Types";
import { GenerateOptions, GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { OurServiceSchema } from "../../Utils/ValidationSchemas";

const OurServiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeImageKey, setActiveImageKey] = useState<string | null>(null);

  const { data } = location.state || {};
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: addOurService, isPending: isAddLoading } = Mutations.useAddOurService();
  const { mutate: editOurService, isPending: isEditLoading } = Mutations.useEditOurService();

  const isEditing = Boolean(data?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues = useMemo<OurServiceFormValues>(
    () => ({
      priority: data?.priority || "",
      title: data?.title || "",
      shortDescription: data?.shortDescription || "",
      description: data?.description || "",
      thumbnailImage: data?.thumbnailImage || "",
      serviceIds: data?.serviceIds?.map((service: ServiceBase) => service._id) || [],
      images: data?.images || "",
      tagLine: data?.tagLine || "",
      whyChoose: {
        title: data?.whyChoose?.title || "",
        description: data?.whyChoose?.description || "",
      },
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

  const handleSubmit = async (values: OurServiceFormValues, { resetForm }: FormikHelpers<OurServiceFormValues>) => {
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
      await editOurService({ ...changedFields, ourServiceId: data._id }, { onSuccess: handleSuccess });
    } else {
      await addOurService(RemoveEmptyFields(payload), { onSuccess: handleSuccess });
    }
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.OUR_SERVICE[pageMode]} maxItems={3} breadcrumbs={BREADCRUMBS.OUR_SERVICE[pageMode]} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<OurServiceFormValues> enableReinitialize initialValues={initialValues} validationSchema={OurServiceSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, resetForm, dirty }) => {
            return (
              <Form noValidate>
                <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />
                <Grid container spacing={2}>
                  <CommonValidationTextField name="priority" label="Priority" grid={{ xs: 12, sm: 6 }} required />
                  <CommonValidationTextField name="title" label="Title" grid={{ xs: 12, sm: 6 }} required />
                  <CommonValidationSelect name="serviceIds" label="Service" isLoading={serviceDataLoading} options={GenerateOptions(serviceData?.data?.service_data)} grid={{ xs: 12, sm: 6 }} multiple />
                  <CommonValidationTextField name="tagLine" label="Tag Line" grid={{ xs: 12, sm: 6 }} />
                  <CommonValidationTextField name="shortDescription" label="Short Description" grid={{ xs: 12 }} multiline />
                  <CommonValidationQuillInput name="description" label="Description" grid={{ xs: 12 }} />
                  <CommonValidationTextField name="whyChoose.title" label="Why Choose Title" grid={{ xs: 12 }} />
                  <CommonValidationQuillInput name="whyChoose.description" label="Why Choose Description" grid={{ xs: 12 }} />
                  <CommonFormImageBox name="thumbnailImage" label="Thumbnail Image" type="image" grid={"auto"} onUpload={() => handleUpload("thumbnailImage")} />
                  <CommonFormImageBox name="images" label="Images" type="image" grid={"grow"} multiple onUpload={() => handleUpload("images")} />
                  {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
                </Grid>
                <CommonBottomActionBar save={isEditing} clear={!isEditing} disabled={!dirty} isLoading={isAddLoading || isEditLoading} onClear={() => resetForm({ values: initialValues })} onSave={() => setFieldValue("_submitAction", "save")} onSaveAndNew={() => setFieldValue("_submitAction", "saveAndNew")} />
              </Form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default OurServiceForm;
