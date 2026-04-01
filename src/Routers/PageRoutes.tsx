import { Navigate } from "react-router-dom";
import { PAGE_TITLE, ROUTES } from "../Constants";
import Dashboard from "../Pages/Dashboard";
import SignInForm from "../Pages/Auth/SignInForm";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import UpdatePassword from "../Pages/Auth/UpdatePassword";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Profile from "../Pages/Profile";
import HeroSection from "../Pages/HeroSection";
import WorkCount from "../Pages/WorkCount";
import Service from "../Pages/Service";
import Blog from "../Pages/Blog";
import BlogForm from "../Pages/Blog/BlogForm";
import Portfolio from "../Pages/Portfolio";
import PortfolioForm from "../Pages/Portfolio/PortfolioForm";
import OurService from "../Pages/OurService";
import OurServiceForm from "../Pages/OurService/OurServiceForm";
import ClientLogo from "../Pages/ClientLogo";
import WorkExperience from "../Pages/WorkExperience";
import Skill from "../Pages/Skill";
import Awards from "../Pages/Awards";
import Testimonial from "../Pages/Testimonial";
import ContactUs from "../Pages/ContactUs";
import MyAchievement from "../Pages/MyAchievement";
import TestimonialDescription from "../Pages/TestimonialDescription";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsConditions from "../Pages/TermsConditions";
import Setting from "../Pages/Setting";

export const PageRoutes = [
  { path: ROUTES.HOME, name: PAGE_TITLE.PORTFOLIO.BASE, element: <Navigate to={ROUTES.PORTFOLIO.BASE} replace /> },

  { path: ROUTES.DASHBOARD, name: PAGE_TITLE.DASHBOARD, element: <Dashboard /> },

  { path: ROUTES.SETTINGS.CHANGE_PASSWORD, name: PAGE_TITLE.SETTINGS.CHANGE_PASSWORD, element: <ChangePassword /> },

  { path: ROUTES.PROFILE.BASE, name: PAGE_TITLE.PROFILE.BASE, element: <Profile /> },

  { path: ROUTES.HERO_SECTION.BASE, name: PAGE_TITLE.HERO_SECTION.BASE, element: <HeroSection /> },

  { path: ROUTES.WORK_COUNT.BASE, name: PAGE_TITLE.WORK_COUNT.BASE, element: <WorkCount /> },

  { path: ROUTES.SERVICE.BASE, name: PAGE_TITLE.SERVICE.BASE, element: <Service /> },

  { path: ROUTES.BLOG.BASE, name: PAGE_TITLE.BLOG.BASE, element: <Blog /> },
  { path: ROUTES.BLOG.ADD_EDIT, name: PAGE_TITLE.BLOG.BASE, element: <BlogForm /> },

  { path: ROUTES.PORTFOLIO.BASE, name: PAGE_TITLE.PORTFOLIO.BASE, element: <Portfolio /> },
  { path: ROUTES.PORTFOLIO.ADD_EDIT, name: PAGE_TITLE.PORTFOLIO.BASE, element: <PortfolioForm /> },

  { path: ROUTES.OUR_SERVICE.BASE, name: PAGE_TITLE.OUR_SERVICE.BASE, element: <OurService /> },
  { path: ROUTES.OUR_SERVICE.ADD_EDIT, name: PAGE_TITLE.OUR_SERVICE.BASE, element: <OurServiceForm /> },

  { path: ROUTES.CLIENT_LOGO.BASE, name: PAGE_TITLE.CLIENT_LOGO.BASE, element: <ClientLogo /> },

  { path: ROUTES.WORK_EXPERIENCE.BASE, name: PAGE_TITLE.WORK_EXPERIENCE.BASE, element: <WorkExperience /> },

  { path: ROUTES.SKILL.BASE, name: PAGE_TITLE.SKILL.BASE, element: <Skill /> },

  { path: ROUTES.AWARDS.BASE, name: PAGE_TITLE.AWARDS.BASE, element: <Awards /> },

  { path: ROUTES.TESTIMONIAL.BASE, name: PAGE_TITLE.TESTIMONIAL.BASE, element: <Testimonial /> },

  { path: ROUTES.CONTACT_US.BASE, name: PAGE_TITLE.CONTACT_US.BASE, element: <ContactUs /> },

  { path: ROUTES.MY_ACHIEVEMENT.BASE, name: PAGE_TITLE.MY_ACHIEVEMENT.BASE, element: <MyAchievement /> },

  { path: ROUTES.TESTIMONIAL_DESCRIPTION.BASE, name: PAGE_TITLE.TESTIMONIAL_DESCRIPTION.BASE, element: <TestimonialDescription /> },

  { path: ROUTES.PRIVACY_POLICY.BASE, name: PAGE_TITLE.PRIVACY_POLICY.BASE, element: <PrivacyPolicy /> },

  { path: ROUTES.TERMS_CONDITIONS.BASE, name: PAGE_TITLE.TERMS_CONDITIONS.BASE, element: <TermsConditions /> },

  { path: ROUTES.SETTING.BASE, name: PAGE_TITLE.SETTING.BASE, element: <Setting /> },
];

export const AuthRoutes = [
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.AUTH.SIGNIN} replace /> },
  { path: ROUTES.AUTH.SIGNIN, element: <SignInForm /> },
  { path: ROUTES.FORGOT_PASSWORD.BASE, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <VerifyOtp /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <UpdatePassword /> },
];
