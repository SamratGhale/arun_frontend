import { pagePath, routes } from "../Routes/path";
import AuthProtectNav from "./NavAuth";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HouseIcon from '@mui/icons-material/House';
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
        href: pagePath.app.rooms,
        isAdminPage: false,
        icon: <BedroomParentIcon/>
      },
      {
        title: "Profile",
        href: pagePath.app.profile,
        isAdminPage: false,
        icon: <AccountBoxIcon/>
      },
    ],
  },
  {
    guard: AuthProtectNav,
    isAdminPage :true,
    title: "Admin",
    navs: [
      {
        title: "Rooms",
        href: pagePath.admin.rooms,
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
    title: "User",
    navs: [
      {
        title: "My Rooms",
        href: routes.rooms,
        isAdminPage: false,
        icon: <HouseIcon/>
      },
      {
        title: "Room Applications",
        isAdminPage: false,
        href: routes.applications,
        icon: <PeopleAltIcon/>
      },
    ],
  },
];

export default Navconfig;