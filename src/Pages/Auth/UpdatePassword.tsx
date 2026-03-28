import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationTextField } from "../../Attribute";
import { ImagePath, ROUTES, ThemeTitle } from "../../Constants";
import ThemeToggler from "../../Layout/ThemeToggler";
import { useAppSelector } from "../../Store/hooks";
import { ResetPasswordSchema } from "../../Utils/ValidationSchemas";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import type { UpdatePasswordFormValues, UpdatePasswordPayload } from "../../Types";
import { CommonBgEffect } from "../../Components/Common";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { signinResponse } = useAppSelector((state) => state.auth);
  const { mutate: resetPassword, isPending: isLoading } = Mutations.useUpdatePassword();

  const handleSubmit = async (values: UpdatePasswordFormValues, { resetForm }: FormikHelpers<UpdatePasswordFormValues>) => {
    const payload: UpdatePasswordPayload = {
      email: signinResponse?.email || "",
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    resetPassword(payload, {
      onSuccess: () => {
        resetForm();
        navigate(ROUTES.AUTH.SIGNIN);
      }, 
    });
  };

  useEffect(() => {
    if (!signinResponse?.email) {
      navigate(ROUTES.AUTH.SIGNIN);
    }
  }, [navigate, signinResponse]);

  return (
    <div className="flex items-center justify-center w-full h-screen relative px-4 overflow-hidden bg-gray-50 dark:bg-gray-dark">
      {/* BACKGROUND EFFECTS */}
      <CommonBgEffect />

      {/* CENTERED CARD */}
      <div className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#333333] rounded-2xl shadow-theme-lg dark:shadow-theme-dark-lg flex flex-col items-center">
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center mb-6 text-center">
          <img src={`${ImagePath}logo/logo.png`} alt="Portfolio Logo" className="w-auto h-11 object-contain block dark:hidden" />
          <img src={`${ImagePath}logo/logo-dark.png`} alt="Portfolio Logo" className="w-auto h-11 object-contain hidden dark:block" />
          <p className="text-gray-500 text-xs sm:text-sm font-medium mt-2">{ThemeTitle}</p>
        </div>

        {/* WELCOME TEXT */}
        <div className="mb-6 w-full text-center">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">Reset Password</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please enter your new password to reset.</p>
        </div>

        {/* FORM */}
        <div className="w-full">
          <Formik initialValues={{ newPassword: "", confirmPassword: "" }} validationSchema={ResetPasswordSchema} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2.5}>
                <CommonValidationTextField name="newPassword" label="New Password" placeholder="Enter new password" type="password" required isFormLabel showPasswordToggle grid={{ xs: 12 }} />
                <CommonValidationTextField name="confirmPassword" label="Confirm Password" placeholder="Confirm your new password" type="password" required isFormLabel showPasswordToggle grid={{ xs: 12 }} />
                <div className="flex justify-end w-full">
                  <Link to={ROUTES.AUTH.SIGNIN} className="flex items-center text-xs font-medium text-brand-950 dark:text-white/90 hover:underline">
                    <ArrowBackIosIcon sx={{ fontSize: 12, mr: 0.5 }} />
                    Back to Sign In
                  </Link>
                </div>
                <CommonButton loading={isLoading} type="submit" variant="contained" title="Reset Password" size="large" fullWidth grid={{ xs: 12 }} />
              </Grid>
            </Form>
          </Formik>
        </div>
      </div>

      {/* GLOBAL MOON BUTTON – FIXED ALWAYS */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggler />
      </div>
    </div>
  );
};

export default UpdatePassword;
