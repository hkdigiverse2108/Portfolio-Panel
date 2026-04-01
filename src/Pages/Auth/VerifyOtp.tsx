import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations } from "../../Api";
import { CommonButton, CommonValidationTextField } from "../../Attribute";
import { ROUTES, STORAGE_KEYS, ThemeTitle } from "../../Constants";
import ThemeToggler from "../../Layout/ThemeToggler";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSignin, setSigninResponse } from "../../Store/Slices/AuthSlice";
import { Storage } from "../../Utils";
import { VerifyOtpSchema } from "../../Utils/ValidationSchemas";

const OTP_DURATION = 600;

const VerifyOtp = () => {
  const [seconds, setSeconds] = useState<number>(OTP_DURATION);
  const { signinResponse } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: VerifyOtp, isPending: isVerifyOtpPending } = Mutations.useVerifyOtp();
  const { mutate: ResendOtp, isPending: isResendOtpPending } = Mutations.useResendOtp();

  const handleSubmit = (values: { otp: string }) => {
    const payload = {
      email: signinResponse?.email || "",
      otp: values.otp,
    };
    VerifyOtp(payload, {
      onSuccess: () => {
        if (signinResponse?.type === "signin") {
          dispatch(setSignin(signinResponse.responseData));
          navigate(ROUTES.PORTFOLIO.BASE);
        } else {
          dispatch(setSigninResponse({ ...signinResponse, otp: values.otp, email: signinResponse?.email || "" }));
          navigate(ROUTES.AUTH.RESET_PASSWORD);
        }
        Storage.removeItem(STORAGE_KEYS.OTP_EXPIRY_KEY);
      },
    });
  };

  useEffect(() => {
    const savedExpiry = localStorage.getItem(STORAGE_KEYS.OTP_EXPIRY_KEY);

    if (savedExpiry) {
      const expiryTime = parseInt(savedExpiry, 10);
      const now = Date.now();
      const remaining = Math.floor((expiryTime - now) / 1000);
      setSeconds(remaining > 0 ? remaining : 0);
    } else {
      const newExpiry = Date.now() + OTP_DURATION * 1000;
      localStorage.setItem(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString());
      setSeconds(OTP_DURATION);
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleResend = async () => {
    ResendOtp(
      {
        email: signinResponse?.email || "",
      },
      {
        onSuccess: () => {
          const newExpiry = Date.now() + OTP_DURATION * 1000;
          localStorage.setItem(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString());
          setSeconds(OTP_DURATION);
        },
      },
    );
  };

  useEffect(() => {
    if (!signinResponse?.email) {
      navigate(ROUTES.AUTH.SIGNIN);
      Storage.clear();
    }
  }, [navigate, signinResponse]);

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
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">Verify OTP</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter the 6-digit Verification Code</p>
        </div>

        {/* FORM */}
        <div className="w-full">
          <Formik initialValues={{ otp: "" }} validationSchema={VerifyOtpSchema} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2.5}>
                <CommonValidationTextField name="otp" label="OTP" placeholder="Enter your OTP" type="number" maxDigits={6} required isFormLabel grid={{ xs: 12 }} />
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Didn’t get the code? </span>
                  {seconds > 0 ? (
                    <span className="text-xs font-bold text-primary">Resend in {formatTime(seconds)}</span>
                  ) : (
                    <button type="button" onClick={handleResend} className="text-xs font-bold text-primary hover:underline" disabled={isResendOtpPending}>
                      {isResendOtpPending ? "Sending..." : "Resend Code"}
                    </button>
                  )}
                </div>
                <CommonButton loading={isVerifyOtpPending} type="submit" variant="contained" title="Verify OTP" size="large" fullWidth grid={{ xs: 12 }} />
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

export default VerifyOtp;
