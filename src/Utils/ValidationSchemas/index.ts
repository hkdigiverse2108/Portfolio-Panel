import * as Yup from "yup";
import type { Primitive } from "../../Types";
import { Validation } from "./Validation";

export const RequiredWhen = (dependentField: string, requiredValues: Primitive[], label: string, type: "string" | "number" | "array" = "string", options?: { extraRules?: (schema: Yup.AnySchema) => Yup.AnySchema }) => {
  let schema: Yup.AnySchema;

  // Base schema by type
  if (type === "number") schema = Yup.number();
  else if (type === "array") schema = Yup.array();
  else schema = Yup.string();

  // Apply extra rules if provided
  if (options?.extraRules) schema = options.extraRules(schema);

  return schema.test("required-when", `${label} is required`, (value, { from }) => {
    const root = from?.[from.length - 1]?.value;
    const dependentValue = root?.[dependentField];
    const match = requiredValues.includes(dependentValue);

    if (match) {
      if (type === "array") return Array.isArray(value) && value.length > 0;
      if (type === "number") return value !== undefined && value !== null;
      return !!value;
    }

    return true;
  });
};

// ---------- Reusable helpers ----------

export const PhoneValidation = (label = "Phone No", options?: { requiredCountryCode?: boolean; requiredNumber?: boolean }) =>
  Yup.object({
    countryCode: Validation("string", "Country code", {
      required: options?.requiredCountryCode ?? true,
    }),

    number: Validation("string", label, {
      required: options?.requiredNumber ?? true,
      extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    }),
  });

// Signin
export const SigninSchema = Yup.object({
  email: Validation("string", "Email", {
    extraRules: (s) => s.email("Invalid email address"),
  }),
  password: Validation("string", "Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
});

export const ForgotPasswordSchema = Yup.object({
  email: Validation("string", "Email", {
    extraRules: (s) => s.email("Invalid email address"),
  }),
});

export const VerifyOtpSchema = Yup.object({
  otp: Validation("string", "OTP", {
    extraRules: (s) => s.trim().length(6, "OTP must be 6 digits"),
  }),
});

export const ResetPasswordSchema = Yup.object({
  newPassword: Validation("string", "New Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
  confirmPassword: Validation("string", "Confirm Password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const ChangePasswordSchema = Yup.object({
  email: Validation("string", "Email", {
    required: true,
    extraRules: (s) => s.trim().email("Invalid email address"),
  }),
  oldPassword: Validation("string", "Old Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
  newPassword: Validation("string", "New Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
  confirmPassword: Validation("string", "Confirm Password", {
    extraRules: (s) => s.oneOf([Yup.ref("newPassword")], "Passwords must match").required("Confirm Password is required"),
  }),
});

export const UserSchema = Yup.object({
  firstName: Validation("string", "First Name", { required: false }),
  lastName: Validation("string", "Last Name", { required: false }),
  phoneNo: PhoneValidation(),
  profileImage: Validation("string", "Profile Image", { required: false }),
  email: Validation("string", "Email", {
    required: true,
    extraRules: (s) => s.trim().email("Invalid email address"),
  }),
  socialMediaLinks: Yup.array()
    .of(
      Yup.object({
        title: Validation("string", "Title", { required: false }),
        link: Validation("string", "Link", { required: false }),
        icon: Validation("string", "Icon", { required: false }),
        isActive: Yup.boolean().nullable(),
      }),
    )
    .nullable(),
  offers: Validation("array", "Offers", { required: false }),
});
