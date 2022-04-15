import { pagePath, routes } from "../Routes/path";
import AuthProtectNav from "./NavAuth";
import HomeIcon from '@mui/icons-material/Home';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Navconfig = [
  {
    guard: AuthProtectNav,
    isAdminPage :false,
    title: "App",
    navs: [
      {
        title: "Home",
        href: routes.app,
        isAdminPage: false,
        icon: <HomeIcon/>
      },
      {
        title: "Rooms",
        href: pagePath.app.jobs,
        isAdminPage: false,
        icon: <BedroomParentIcon/>
      },
    ],
  },
  {
    guard: AuthProtectNav,
    isAdminPage :true,
    title: "Admin",
    navs: [
      {
        title: "Admin",
        href: routes.admin,
        isAdminPage: true,
        icon: <PeopleAltIcon/>
      },
      {
        title: "Users",
        href: pagePath.admin.users,
        isAdminPage: true,
        icon: <RecentActorsIcon/>
      },
    ],
  },
  {
    guard: AuthProtectNav,
    isAdminPage: false,
    title: "Employeer",
    navs: [
      {
        title: "My Rooms",
        href: routes.employer,
        isAdminPage: false,
        icon: <PeopleAltIcon/>
      },
      {
        title: "Applications",
        isAdminPage: false,
        href: pagePath.rooms,
        icon: <PeopleAltIcon/>
      },
    ],
  },
];

export default Navconfig;