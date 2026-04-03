import { Box, Grid } from "@mui/material";
import { FieldArray, Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mutations, Queries } from "../../Api";
import { CommonButton, CommonValidationDatePicker, CommonValidationQuillInput, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS, SOCIAL_MEDIA_TYPE } from "../../Data";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ImageSyncProps, PortfolioFormValues, PortfolioSocialLink, ServiceBase } from "../../Types";
import { GenerateOptions, GetChangedFields, RemoveEmptyFields } from "../../Utils";
import { PortfolioSchema } from "../../Utils/ValidationSchemas";
import { Close, Add } from "@mui/icons-material";

const PortfolioForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeImageKey, setActiveImageKey] = useState<string | null>(null);

  const { data } = location.state || {};
  const { data: serviceData, isLoading: serviceDataLoading } = Queries.useGetService({ activeFilter: true });

  const { mutate: addPortfolio, isPending: isAddLoading } = Mutations.useAddPortfolio();
  const { mutate: editPortfolio, isPending: isEditLoading } = Mutations.useEditPortfolio();

  const isEditing = Boolean(data?._id);
  const pageMode = isEditing ? "EDIT" : "ADD";

  const initialValues = useMemo<PortfolioFormValues>(
    () => ({
      thumbnailImage: data?.thumbnailImage || "",
      title: data?.title || "",
      subTitle: data?.subTitle || "",
      serviceIds: data?.serviceIds.map((item: ServiceBase) => item._id) || "",
      isFeatured: data?.isFeatured ?? false,
      link: data?.link || "",
      description: data?.description || "",
      images: data?.images || [],
      projectName: data?.projectName || "",
      client: data?.client || "",
      technology: data?.technology || "",
      date: data?.date || "",
      socialLinks: [
        ...(data?.socialLinks?.map((link: PortfolioSocialLink) => ({
          title: link.title || "",
          link: link.link || "",
          icon: link.icon || "",
          isActive: link.isActive ?? true,
        })) || [{ title: "", link: "", icon: "", isActive: true }]),
      ],
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

  const handleSubmit = async (values: PortfolioFormValues, { resetForm }: FormikHelpers<PortfolioFormValues>) => {
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
      await editPortfolio({ ...changedFields, portfolioId: data._id }, { onSuccess: handleSuccess });
    } else {
      await addPortfolio(RemoveEmptyFields(payload), { onSuccess: handleSuccess });
    }
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.PORTFOLIO[pageMode]} maxItems={3} breadcrumbs={BREADCRUMBS.PORTFOLIO[pageMode]} />

      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<PortfolioFormValues> enableReinitialize initialValues={initialValues} validationSchema={PortfolioSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, resetForm, dirty, values }) => {
            return (
              <Form noValidate>
                <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />
                <Grid container spacing={2}>
                  <CommonCard title="Portfolio Details" grid={{ xs: 12 }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <CommonValidationSelect name="serviceIds" label="Service" isLoading={serviceDataLoading} options={GenerateOptions(serviceData?.data?.service_data)} grid={{ xs: 12, sm: 6 }} multiple />
                      <CommonValidationTextField name="title" label="Title" grid={{ xs: 12, sm: 6 }} required />
                      <CommonValidationTextField name="subTitle" label="Sub Title" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationTextField name="link" label="Link" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationQuillInput name="description" label="Description" grid={{ xs: 12 }} />
                      <CommonFormImageBox name="thumbnailImage" label="Thumbnail Image" type="image" grid={"auto"} onUpload={() => handleUpload("thumbnailImage")} />
                      <CommonFormImageBox name="images" label="Images" type="image" grid={"grow"} multiple onUpload={() => handleUpload("images")} />
                      <CommonValidationSwitch name="isFeatured" label="Is Featured" grid={{ xs: 12 }} />
                    </Grid>
                  </CommonCard>
                  <CommonCard title="Project Information" grid={{ xs: 12 }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <CommonValidationTextField name="projectName" label="Project Name" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationTextField name="client" label="Client" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationTextField name="technology" label="Technology" grid={{ xs: 12, sm: 6 }} />
                      <CommonValidationDatePicker name="date" label="Date" grid={{ xs: 12, sm: 6 }} />
                    </Grid>
                  </CommonCard>
                  <CommonCard title="Social Links" grid={{ xs: 12 }}>
                    <Box sx={{ p: 2 }}>
                      <FieldArray name="socialLinks">
                        {({ push, remove }) => {
                          return (
                            <>
                              {values?.socialLinks?.map((_, index) => (
                                <Grid container spacing={2} key={index} sx={{ mb: 2, alignItems: "center" }}>
                                  <CommonValidationTextField name={`socialLinks.${index}.title`} label="title" required grid={{ xs: 12, md: 6, xl: 3 }} />
                                  <CommonValidationTextField name={`socialLinks.${index}.link`} label="link" required grid={{ xs: 12, md: 6, xl: 4 }} />
                                  <CommonValidationSelect name={`socialLinks.${index}.icon`} label="icon" required options={SOCIAL_MEDIA_TYPE} grid={{ xs: 12, sm: 6, xl: 2 }} />
                                  <CommonValidationSwitch name={`socialLinks.${index}.isActive`} label="Active" grid={{ xs: "grow" }} />
                                  {(values?.socialLinks?.length || 0) > 1 && (
                                    <Grid size={"auto"}>
                                      <CommonButton variant="outlined" size="small" color="error" sx={{ minWidth: 20 }} onClick={() => remove(index)}>
                                        <Close />
                                      </CommonButton>
                                    </Grid>
                                  )}
                                  <Grid size={"auto"}>
                                    <CommonButton variant="outlined" size="small" color="primary" sx={{ minWidth: 20 }} onClick={() => push({ title: "", link: "", icon: "", isActive: true })}>
                                      <Add />
                                    </CommonButton>
                                  </Grid>
                                </Grid>
                              ))}
                            </>
                          );
                        }}
                      </FieldArray>
                    </Box>
                  </CommonCard>
                  {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" grid={{ xs: 12 }} />}
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

export default PortfolioForm;
