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

export const HeroSectionSchema = Yup.object({
  title: Validation("string", "Title"),
  subTitles: Yup.array().of(Validation("string", "Sub Title")).required("Sub Titles are required"),
  linkTitle: Validation("string", "Link Title"),
  link: Validation("string", "Link"),
  description: Validation("string", "Description", { required: false }),
});

// WorkCount
export const WorkCountSchema = Yup.object({
  title: Validation("string", "Title"),
  number: Validation("string", "Count"),
  isActive: Yup.boolean().nullable(),
});

//Service
export const ServiceSchema = Yup.object({
  name: Validation("string", "Name"),
  isActive: Yup.boolean().nullable(),
});

//Blog
export const BlogSchema = Yup.object({
  serviceId: Validation("string", "Service", { required: false }),
  title: Validation("string", "Title"),
  tagLine: Validation("string", "Tag Line", { required: false }),
  date: Validation("string", "Date", { required: false }),
  tags: Validation("array", "Tags", { required: false }),
  description: Validation("string", "Description", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//Portfolio
export const PortfolioSchema = Yup.object({
  title: Validation("string", "Title"),
  subTitle: Validation("string", "Sub Title", { required: false }),
  link: Validation("string", "Link", { required: false }),
  description: Validation("string", "Description", { required: false }),
  projectName: Validation("string", "Project Name", { required: false }),
  client: Validation("string", "Client", { required: false }),
  technology: Validation("string", "Technology", { required: false }),
  date: Validation("string", "Date", { required: false }),
  socialLinks: Yup.array()
    .of(
      Yup.object({
        title: Validation("string", "Title", { required: false }),
        link: Validation("string", "Link", { required: false }),
        icon: Validation("string", "Icon", { required: false }),
        isActive: Yup.boolean().nullable(),
      }),
    )
    .nullable(),
  isActive: Yup.boolean().nullable(),
});

//OurService
export const OurServiceSchema = Yup.object({
  title: Validation("string", "Title"),
  tagLine: Validation("string", "Tag Line", { required: false }),
  date: Validation("string", "Date", { required: false }),
  tags: Validation("array", "Tags", { required: false }),
  description: Validation("string", "Description", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//ClientLogo
export const ClientLogoSchema = Yup.object({
  name: Validation("string", "Name"),
  image: Validation("string", "Image"),
  link: Validation("string", "Link", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//WorkExperience
export const WorkExperienceSchema = Yup.object({
  year: Validation("string", "Year"),
  title: Validation("string", "Title"),
  subTitle: Validation("string", "Sub Title", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//Skill
export const SkillSchema = Yup.object({
  image: Validation("string", "Image", { required: false }),
  title: Validation("string", "Title"),
  percentage: Validation("number", "Percentage"),
  isActive: Yup.boolean().nullable(),
});

//Awards
export const AwardsSchema = Yup.object({
  image: Validation("string", "Image", { required: false }),
  iconImage: Validation("string", "Icon Image", { required: false }),
  title: Validation("string", "Title"),
  date: Validation("string", "Date", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//Testimonial
export const TestimonialSchema = Yup.object({
  name: Validation("string", "Name"),
  image: Validation("string", "Image", { required: false }),
  designation: Validation("string", "Designation", { required: false }),
  description: Validation("string", "Description", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//ContactUs
export const ContactUsSchema = Yup.object({
  name: Validation("string", "Name"),
  email: Validation("string", "Email", { required: false, extraRules: (s) => s.email("Invalid email address") }),
  phoneNo: Validation("string", "Phone No", { extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits") }),
  message: Validation("string", "Message", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//MyAchievement
export const MyAchievementSchema = Yup.object({
  image: Validation("string", "Image", { required: false }),
  title: Validation("string", "Title"),
  link: Validation("string", "Link", { required: false }),
  btnTitle: Validation("string", "Button Title", { required: false }),
  btnLink: Validation("string", "Button Link", { required: false }),
  isActive: Yup.boolean().nullable(),
});

//TestimonialDescription
export const TestimonialDescriptionSchema = Yup.object({
  title: Validation("string", "Title"),
  subTitle: Validation("string", "Sub Title", { required: false }),
  rating: Validation("number", "Rating"),
});

//Setting
export const SettingSchema = Yup.object({
  bookMeeting: Yup.object({
    link: Validation("string", "Link"),
    phoneNo: PhoneValidation("Phone No", { requiredCountryCode: false, requiredNumber: false }),
    email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
    address: Validation("string", "Address"),
  }),
});
