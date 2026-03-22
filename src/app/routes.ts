import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPassword from "./pages/RecoverPassword";
import RecoverPasswordConfirmation from "./pages/RecoverPasswordConfirmation";
import RecoverPasswordReset from "./pages/RecoverPasswordReset";
import RecoverPasswordSuccess from "./pages/RecoverPasswordSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersList from "./pages/AdminUsersList";
import AdminUserRegister from "./pages/AdminUserRegister";
import AdminUserDelete from "./pages/AdminUserDelete";
import AdminUserEdit from "./pages/AdminUserEdit";
import AdminRolesPermissions from "./pages/AdminRolesPermissions";
import AdminBooksRegister from "./pages/AdminBooksRegister";
import AdminBooksEdit from "./pages/AdminBooksEdit";
import AdminBooksDelete from "./pages/AdminBooksDelete";
import AdminBooksCatalog from "./pages/AdminBooksCatalog";
import AdminSystemHistory from "./pages/AdminSystemHistory";
import AdminSystemLoans from "./pages/AdminSystemLoans";
import AdminSystemReturns from "./pages/AdminSystemReturns";
import AdminLoanDetail from "./pages/AdminLoanDetail";
import AdminReturnReview from "./pages/AdminReturnReview";
import UserFines from "./pages/UserFines";
import UserHomepage from "./pages/UserHomepage";
import UserBookSearch from "./pages/UserBookSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/recover-password",
    Component: RecoverPassword,
  },
  {
    path: "/recover-password/confirmation",
    Component: RecoverPasswordConfirmation,
  },
  {
    path: "/recover-password/reset",
    Component: RecoverPasswordReset,
  },
  {
    path: "/recover-password/success",
    Component: RecoverPasswordSuccess,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/users-list",
    Component: AdminUsersList,
  },
  {
    path: "/admin/user/register",
    Component: AdminUserRegister,
  },
  {
    path: "/admin/user/delete",
    Component: AdminUserDelete,
  },
  {
    path: "/admin/user/edit",
    Component: AdminUserEdit,
  },
  {
    path: "/admin/roles-permissions",
    Component: AdminRolesPermissions,
  },
  {
    path: "/admin/books/register",
    Component: AdminBooksRegister,
  },
  {
    path: "/admin/books/edit",
    Component: AdminBooksEdit,
  },
  {
    path: "/admin/books/delete",
    Component: AdminBooksDelete,
  },
  {
    path: "/admin/books/catalog",
    Component: AdminBooksCatalog,
  },
  {
    path: "/admin/system/history",
    Component: AdminSystemHistory,
  },
  {
    path: "/admin/system/loans",
    Component: AdminSystemLoans,
  },
  {
    path: "/admin/system/loans/:id",
    Component: AdminLoanDetail,
  },
  {
    path: "/admin/system/returns",
    Component: AdminSystemReturns,
  },
  {
    path: "/admin/system/returns/review/:id",
    Component: AdminReturnReview,
  },
  {
    path: "/user/fines",
    Component: UserFines,
  },
  {
    path: "/user/home",
    Component: UserHomepage,
  },
  {
    path: "/user/homepage",
    Component: UserHomepage,
  },
  {
    path: "/user/book-search",
    Component: UserBookSearch,
  },
  {
    path: "/user/catalog",
    Component: UserBookSearch,
  },
]);