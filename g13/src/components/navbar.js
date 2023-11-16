import React, { useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};


 


 


 



const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "Clinical Therapy",
    description: "Deals with mental health disorders and coping techniques.",
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "Behavioural Therapy",
    description: "Recognise the trouble behaviour and change it for good",
  },
  {
    color: "green",
    icon: UsersIcon,
    title: "Sleep Disorders",
    description: "Irregular sleep patterns with less sleep duration",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Depression",
    description: "An elongated feeling of sadness with decreased pleasure.",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Anxiety",
    description: "State of heightened arousal that occurs frequently.",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "PTSD",
    description: "Stressful episodes that occur after a traumatic experience.",
  },
  {
    color: "cyan",
    icon: PuzzlePieceIcon,
    title: "Bipolar",
    description: "Frequent behaviour swings between depression.",
  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Behavioural Disorders",
    description: "Characterized by patterns of disruptive behvaiour.",
  },
];


function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal ">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Services
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">

      <Typography
        as="a"
        href="/chatting"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <UserCircleIcon className="h-[18px] w-[18px]" />
          Chat Room
        </ListItem>
      </Typography>
    </List>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const [profileNav, setProfileNav] = React.useState(false);
  const navigate = useNavigate();
  const { user, dispatch, logout } = useContext(AuthContext);
  console.log(user);
  const toLogin = () => {
    navigate("/login");
  };
  const toRegister = () => {
    navigate("/register");
  };
  const handleClick = () => {
    toast.info("Logout Succesfully ", {
      position: toast.POSITION.TOP_CENTER,
    });
    dispatch({ type: "LOGOUT" });
    logout();
    navigate("/login");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto mt-1 max-w-screen-xl px-4 py-2 rounded-md">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          IITI Counselling
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>

        {user ? (
          <div className="flex  flex-nowrap items-center gap-2 prof">
            
            
            <div class="relative ml-3">
          <div>
            <button onMouseEnter={() =>setProfileNav(!profileNav)} onClick={() =>setProfileNav(!profileNav)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
          </div>

          { profileNav ? <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <span class="block px-4 py-2 text-sm text-gray-700">{user.username}</span>
            <a href="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
              onClick={handleClick}
            >
              Logout
            </Button>
          </div> : <div></div>}
        </div>
          </div>
        ) : (
          <div className="flex flex-nowrap items-center gap-2 ">
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
              onClick={toLogin}
            >
              Login
            </Button>
            <Button variant="outlined" size="sm" fullWidth onClick={toRegister}>
              Register
            </Button>
          </div>
        )}

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
      {user ? (
          <div className="flex  flex-nowrap items-center gap-2 ">
            
            
          <div class="relative ml-3">
        <div>
          <button onClick={() =>setProfileNav(!profileNav)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
          </button>
        </div>

        { profileNav ? <div class="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
          <span class="block px-4 py-2 text-sm text-gray-700">{user.username}</span>
          <a href="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
          <Button
            variant="outlined"
            size="sm"
            color="blue-gray"
            fullWidth
            onClick={handleClick}
          >
            Logout
          </Button>
        </div> : <div></div>}
      </div>
        </div>
        ) : (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
              onClick={toLogin}
            >
              Login
            </Button>
            <Button variant="outlined" size="sm" fullWidth onClick={toRegister}>
              Register
            </Button>
          </div>
        )}
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default NavbarWithMegaMenu;
