import { Grid } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import { CommonButton, CommonValidationTextField } from "../../Attribute";
import { ROUTES, ThemeTitle } from "../../Constants";
import ThemeToggler from "../../Layout/ThemeToggler";
import { SigninSchema } from "../../Utils/ValidationSchemas";
import { Mutations } from "../../Api";
import type { LoginPayload } from "../../Types";
import { useAppDispatch } from "../../Store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { setSigninResponse } from "../../Store/Slices/AuthSlice";

const SignInForm = () => {
  const { mutate: Signin, isPending: isSigninPending } = Mutations.useSignin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { mutate: ResendOtp, isPending: isResendOtpPending } = Mutations.useResendOtp();

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    Signin(
      { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: (response) => {
          dispatch(setSigninResponse({ email: values.email.toLowerCase(), type: "signin", responseData: response?.data }));
          navigate(ROUTES.AUTH.VERIFY_OTP);
          resetForm();
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen relative px-4 overflow-hidden bg-gray-50 dark:bg-gray-dark">
      {/* BACKGROUND EFFECTS */}
      {/* <CommonBgEffect /> */}

      {/* CENTERED CARD */}
      <div className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#333333] rounded-2xl shadow-theme-lg dark:shadow-theme-dark-lg flex flex-col items-center">
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-brand-500 shadow-md flex items-center justify-center text-white font-extrabold text-xl mb-2 transition-transform hover:scale-105">PA</div>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">{ThemeTitle}</p>
        </div>

        {/* WELCOME TEXT */}
        <div className="mb-6 w-full text-center">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">Welcome Back</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in</p>
        </div>

        {/* FORM */}
        <div className="w-full">
          <Formik initialValues={{ email: "", password: "" }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2.5}>
                <CommonValidationTextField name="email" label="Email Address" placeholder="Enter your email" required isFormLabel grid={{ xs: 12 }} />
                <CommonValidationTextField name="password" label="Password" type="password" placeholder="Enter your password" required isFormLabel showPasswordToggle grid={{ xs: 12 }} />
                <div className="flex justify-end w-full">
                  <Link to={ROUTES.FORGOT_PASSWORD.BASE} className="text-xs font-medium text-brand-950 dark:text-white/90 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <CommonButton loading={isSigninPending} type="submit" variant="contained" title="Login" size="large" fullWidth grid={{ xs: 12 }} />
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

export default SignInForm;
