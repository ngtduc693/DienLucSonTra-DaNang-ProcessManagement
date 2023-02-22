import HoSo from "layouts/hoso";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Tạo hồ sơ",
    key: "taohoso",
    icon: <Icon fontSize="small">post_add</Icon>,
    route: "/taohoso",
    component: <HoSo />
  },
  {
    type: "collapse",
    name: "Chuyển hồ sơ",
    key: "chuyenhoso",
    icon: <Icon fontSize="small">content_paste_go</Icon>,
    route: "/chuyenhoso",
    component: <SignIn />
  },
  {
    type: "collapse",
    name: "Thoả thuận đấu nối",
    key: "thoathuandaunoi",
    icon: <Icon fontSize="small">gavel</Icon>,
    route: "/thoathuandaunoi",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Kiểm tra hồ sơ",
    key: "kiemtrahoso",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/kiemtrahoso",
    component: <Billing />,
  },
];

export default routes;
