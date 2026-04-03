import { Add, Close, Delete } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { FieldArray, Form, Formik, useFormikContext, type FormikHelpers, type FormikValues } from "formik";
import { useEffect, useState } from "react";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationSwitch, CommonValidationTextField } from "../../Attribute";
import { CommonPhoneNumber } from "../../Attribute/FormFields/CommonPhoneNumber";
import { CommonValidationSelect } from "../../Attribute/FormFields/CommonSelect";
import { CommonValidationCreatableSelect } from "../../Attribute/FormFields/CommonSelectTab";
import { CommonBottomActionBar, CommonBreadcrumbs, CommonCard, CommonProfileAvatar } from "../../Components/Common";
import { CommonFormImageBox } from "../../Components/Common/CommonUploadImage/CommonImageBox";
import { PAGE_TITLE } from "../../Constants";
import { BREADCRUMBS } from "../../Data/Breadcrumbs";
import { SOCIAL_MEDIA_TYPE } from "../../Data/Enum";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSelectedFiles, setUploadModal } from "../../Store/Slices/ModalSlice";
import type { ImageSyncProps, UserFormValues } from "../../Types";
import { UserSchema } from "../../Utils/ValidationSchemas";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { mutate: editUser, isPending: isEditLoading } = Mutations.useUpdateUser();
  const [activeImageKey, setActiveImageKey] = useState<"profileImage" | null>(null);

  const initialValues: UserFormValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNo: {
      countryCode: user?.phoneNo?.countryCode || "",
      number: user?.phoneNo?.number?.toString() || "",
    },
    email: user?.email || "",
    profileImage: user?.profileImage || null,
    socialMediaLinks: user?.socialMediaLinks || [],
    offers: user?.offers || [],
    logoTitle: user?.logoTitle || "",
  };

  const FormikImageSync = <T extends FormikValues>({ activeKey, clearActiveKey }: ImageSyncProps) => {
    const { selectedFiles } = useAppSelector((state) => state.modal);
    const { setFieldValue } = useFormikContext<T>();

    useEffect(() => {
      if (!selectedFiles[0] || !activeKey) return;

      setFieldValue(activeKey, selectedFiles[0]);

      dispatch(setSelectedFiles([]));
      clearActiveKey();
    }, [selectedFiles, activeKey, setFieldValue, clearActiveKey, dispatch]);

    return null;
  };

  const handleUpload = () => {
    setActiveImageKey("profileImage");
    dispatch(setUploadModal({ open: true, type: "image", multiple: false }));
  };

  const handleSubmit = async (values: UserFormValues, { resetForm }: FormikHelpers<UserFormValues>) => {
    const payload = { ...values };
    await editUser(payload, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <>
      <CommonBreadcrumbs title={PAGE_TITLE.PROFILE.BASE} maxItems={3} breadcrumbs={BREADCRUMBS.PROFILE.BASE} />
      <Box sx={{ p: { xs: 2, md: 3 }, mb: 8 }}>
        <Formik<UserFormValues> enableReinitialize initialValues={initialValues} validationSchema={UserSchema} onSubmit={handleSubmit}>
          {({ dirty, values, setFieldValue }) => (
            <Form noValidate>
              <FormikImageSync activeKey={activeImageKey} clearActiveKey={() => setActiveImageKey(null)} />
              <CommonCard grid={{ xs: 12 }} hideDivider>
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {/* Profile Section */}
                  <Grid size={{ xs: 12 }}>
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="flex items-center bg-black dark:bg-brand-500 text-white rounded-full border border-black dark:border-brand-500 p-1">
                          <div className="relative flex items-center justify-center w-24 h-24 rounded-full overflow-hidden cursor-pointer group" onClick={handleUpload}>
                            <CommonProfileAvatar fullName={`${values?.firstName || ""} ${values?.lastName || ""}`} profileImage={values?.profileImage || ""} className="w-full h-full text-3xl" />
                            {values?.profileImage && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                <div
                                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-500 transition cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFieldValue("profileImage", null);
                                  }}
                                >
                                  <Delete className="text-white" />
                                </div>
                              </div>
                            )}

                            <div className="absolute inset-0 opacity-0 pointer-events-none">
                              <CommonFormImageBox name="profileImage" type="image" label="" grid={{ xs: 12 }} multiple={false} onUpload={handleUpload} />
                            </div>
                          </div>
                        </div>

                        <div className="order-3 xl:order-2">
                          <h4 className="mb-2 text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h4>

                          <p className="text-sm text-gray-500">
                            {user?.phoneNo?.countryCode} {user?.phoneNo?.number}
                          </p>

                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  {/* Fields */}
                  <CommonValidationTextField name="firstName" label="First Name" required grid={{ xs: 12, md: 6 }} />
                  <CommonValidationTextField name="lastName" label="Last Name" required grid={{ xs: 12, md: 6 }} />
                  <CommonPhoneNumber label="Phone No." countryCodeName="phoneNo.countryCode" numberName="phoneNo.number" grid={{ xs: 12, md: 6 }} />
                  <CommonValidationTextField name="email" label="Email" required grid={{ xs: 12, md: 6 }} />
                  <CommonValidationTextField name="logoTitle" label="Logo Title" grid={{ xs: 12, md: 6 }} />
                  <CommonValidationCreatableSelect name="offers" label="Offers" options={[]} grid={{ xs: 12, md: 6 }} />
                  <Grid size={12}>
                    <Typography component="div">Social Media Links</Typography>
                  </Grid>

                  <Grid size={12}>
                    <FieldArray name="socialMediaLinks">
                      {({ push, remove }) => (
                        <>
                          {values?.socialMediaLinks?.map((_, index) => (
                            <Grid container spacing={2} key={index} sx={{ mb: 2, alignItems: "center" }}>
                              <CommonValidationTextField name={`socialMediaLinks.${index}.title`} label="title" required grid={{ xs: 12, md: 6, xl: 3 }} />
                              <CommonValidationTextField name={`socialMediaLinks.${index}.link`} label="link" required grid={{ xs: 12, md: 6, xl: 4 }} />
                              <CommonValidationSelect name={`socialMediaLinks.${index}.icon`} label="icon" required options={SOCIAL_MEDIA_TYPE} grid={{ xs: 12, sm: 6, xl: 2 }} />
                              <CommonValidationSwitch name={`socialMediaLinks.${index}.isActive`} label="Active" grid={{ xs: "grow" }} />
                              {(values?.socialMediaLinks?.length || 0) > 1 && (
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
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
              </CommonCard>
              <CommonBottomActionBar submit disabled={!dirty} isLoading={isEditLoading} />
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Profile;
