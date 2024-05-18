import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login_admin from "./pages/admin/login_admin";
import AuthGuard from "./pages/admin/utils/AuthGuard";
import Index_admin from "./pages/admin/index_admin";
import Inbox_admin from "./pages/admin/Inbox_admin";
import Create_admin from "./pages/admin/Create_admin";
import Add_and_manage_clint from "./pages/admin/Add_and_manage_clint";
import Settings_admin from "./pages/admin/Settings_admin";
import Portfolio_admin from "./pages/admin/Portfolio_admin";
import Write_blog_admin from "./pages/admin/Write_blog_admin";
import Intert_recurite from "./pages/admin/Intert_recurite";
import Add_clint from "./pages/admin/Add_clint";
import Add_blog from "./pages/admin/Add_blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AuthGuard><Index_admin /></AuthGuard>}/>
        <Route path="/add_blog" element={<AuthGuard><Add_blog /></AuthGuard>}/>
        <Route path="/add_client" element={<AuthGuard><Add_clint /></AuthGuard>}/>
        <Route path="/admin_inbox" element={<AuthGuard><Inbox_admin /></AuthGuard>}/>
        <Route path="/admin_intern_rec" element={<AuthGuard><Intert_recurite /></AuthGuard>}/>
        <Route path="/create_admin_account" element={<AuthGuard><Create_admin /></AuthGuard>}/>
        <Route path="/admin_clint" element={<AuthGuard><Add_and_manage_clint /></AuthGuard>}/>
        <Route path="/admin_settings" element={<AuthGuard><Settings_admin /></AuthGuard>}/>
        <Route path="/admin_portfolo" element={<AuthGuard><Portfolio_admin /></AuthGuard>}/>
        <Route path="/admin_blog" element={<AuthGuard><Write_blog_admin /></AuthGuard>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/admin_login" element={<Login_admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
