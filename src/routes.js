import DailyDashboard from "layouts/dashboard/daily";
import MonthlyDashboard from "layouts/dashboard/monthly";
import YearlyDashboard from "layouts/dashboard/yearly";
import CareerDashboard from "layouts/dashboard/career";
import News from "layouts/news";
import Calendar from "./layouts/calendar";
import Billing from "layouts/billing";
import EmailBuilder from "layouts/email";
import TVStream from "layouts/email";
import TablesLayout from "layouts/data-tables";
import Indy from "layouts/notes";
import IAApp from "layouts/ia";
import Profile from "layouts/profile/profile-overview";
import AllProjects from "layouts/profile/all-projects";
import Teams from "layouts/profile/teams";
import ProfileSettings from "layouts/settings";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Imperial Alpha Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { Settings } from "react-icons/io5";
import { Chat } from "@mui/icons-material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DraftsIcon from "@mui/icons-material/Drafts";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "daily dashboard",
    route: "/dashboard/daily",
    icon: <IoHome size="15px" color="inherit" />,
    element: <DailyDashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "item",
    name: "Monthly Dashboard",
    key: "monthly dashboard",
    route: "/dashboard/monthly",
    icon: <IoHome size="15px" color="inherit" />,
    element: <MonthlyDashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "item",
    name: "Yearly Dashboard",
    key: "yearly dashboard",
    route: "/dashboard/yearly",
    icon: <IoHome size="15px" color="inherit" />,
    element: <YearlyDashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "item",
    name: "Career Dashboard",
    key: "career dashboard",
    route: "/dashboard/career",
    icon: <IoHome size="15px" color="inherit" />,
    element: <CareerDashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "News",
    key: "news",
    route: "/news",
    icon: <FeedSharpIcon size="15px" color="inherit" />,
    element: <News />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Calendar",
    key: "calendar",
    route: "/calendar",
    icon: <DateRangeIcon size="15px" color="inherit" />,
    element: <Calendar />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Finances",
    key: "finances",
    route: "/finances",
    icon: <AccountBalanceIcon size="15px" color="inherit" />,
    element: <Billing />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Email",
    key: "email",
    route: "/email",
    icon: <DraftsIcon size="15px" color="inherit" />,
    element: <TVStream />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    element: <TablesLayout />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Notes",
    key: "notes",
    route: "/notes",
    icon: <TextSnippetIcon size="15px" color="inherit" />,
    element: <Indy />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Imperial AI",
    key: "Imperial AI",
    route: "/imperial-ai",
    icon: <SmartToyIcon size="15px" color="inherit" />,
    element: <IAApp />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile/overview",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    element: <Profile />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "item",
    name: "All Projects",
    key: "all-projects",
    route: "/profile/all-projects",
    icon: <IoBuild size="15px" color="inherit" />,
    element: <AllProjects />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "item",
    name: "Teams",
    key: "teams",
    route: "/profile/teams",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    element: <Teams />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "Settings",
    route: "/settings",
    icon: <SettingsIcon size="15px" color="inherit" />,
    element: <ProfileSettings />,
    noCollapse: true,
    protected: true,
  },
];

export default routes;
