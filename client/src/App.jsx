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
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage"
import BlogPage from "./pages/BlogPage"
import ContactPage  from "./pages/ContactPage";
import WordpressPage  from "./pages/Web_devlopment_sub_menu/WordpressPage";
import E_commersPage from "./pages/Web_devlopment_sub_menu/E_commersPage";
import PortfolioPage_web from "./pages/Web_devlopment_sub_menu/PortfolioPage";
import Ui_Ux_DesignPage from "./pages/Web_devlopment_sub_menu/Ui_Ux_DesignPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AuthGuard><Index_admin /></AuthGuard>}/>
        <Route path="/admin/add_blog" element={<AuthGuard><Add_blog /></AuthGuard>}/>
        <Route path="/admin/add_client" element={<AuthGuard><Add_clint /></AuthGuard>}/>
        <Route path="/admin/admin_inbox" element={<AuthGuard><Inbox_admin /></AuthGuard>}/>
        <Route path="/admin/admin_intern_rec" element={<AuthGuard><Intert_recurite /></AuthGuard>}/>
        <Route path="/admin/create_admin_account" element={<AuthGuard><Create_admin /></AuthGuard>}/>
        <Route path="/admin/admin_clint" element={<AuthGuard><Add_and_manage_clint /></AuthGuard>}/>
        <Route path="/admin/admin_settings" element={<AuthGuard><Settings_admin /></AuthGuard>}/>
        <Route path="/admin/admin_portfolo" element={<AuthGuard><Portfolio_admin /></AuthGuard>}/>
        <Route path="/admin/admin_blog" element={<AuthGuard><Write_blog_admin /></AuthGuard>}/>
        <Route path="/admin/admin_login" element={<Login_admin/>}/>
        {/* Clint Side Routes */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/portfolio" element={<PortfolioPage/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/web_dev/wordpress" element={<WordpressPage/>}/>
        <Route path="/web_dev/e-commers" element={<E_commersPage/>}/>
        <Route path="/web_dev/Portfolio_web" element={<PortfolioPage_web/>}/>
        <Route path="/web_dev/Ui_Ux_dexign" element={<Ui_Ux_DesignPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
