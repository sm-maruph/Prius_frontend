import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Shared Components
import Navbar from "./components/navbar/Navbar";
import TopStrip from "./components/navbar/TopStrip";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Woven from "./pages/services/Woven";
import Knit from "./pages/services/Knit";
import Sample from "./pages/services/Sample";
import Merchandising from "./pages/services/Merchandising";
import Compliance from "./pages/Compliance";

// Admin Pages
import Login from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Banners from "./pages/Admin/Banners";
import Services from "./pages/Admin/Services";
import Clients from "./pages/Admin/Clients";

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Identify admin routes
  const isAdminPage = location.pathname.startsWith("/admin");

  // ✅ Token state
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  // ✅ JWT validation
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ✅ Login success
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
    navigate("/admin");
  };

  // ✅ Auto logout if token expired
  useEffect(() => {
    if (token && !isTokenValid(token)) {
      handleLogout();
    }
  }, [token]);

  return (
    <>
      {/* Hide TopStrip & Navbar on admin routes */}
      {!isAdminPage && (
        <>
          <TopStrip
            phone="+88 01711556131"
            email="zamal@gruposourcing.com"
            address="House 256, Road: 03 (East Side) DOHS Baridhara, Dhaka-1206, Bangladesh"
            onSearch={(q) => console.log("search:", q)}
          />
          <Navbar />
        </>
      )}

      <ScrollToTop />
      <main
        
      >
        <Routes>
          {/* ✅ Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              isTokenValid(token) ? (
                <AdminDashboard token={token} onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          >
            <Route path="banners" element={<Banners />} />
            <Route path="services" element={<Services />} />
            <Route path="clients" element={<Clients />} />
          </Route>

          <Route
            path="/admin/login"
            element={<Login onLogin={handleLogin} />}
          />

          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/woven" element={<Woven />} />
          <Route path="/services/knit" element={<Knit />} />
          <Route path="/services/sample" element={<Sample />} />
          <Route path="/services/merchandising" element={<Merchandising />} />
          <Route path="/compliance" element={<Compliance />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-red-500 text-xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* ✅ Only show footer & WhatsApp on public pages */}
      {!isAdminPage && (
        <>
          {/* <FloatingWhatsApp />
          <Footer /> */}
        </>
      )}
    </>
  );
}

// ✅ Wrapped in Router
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}




// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// // Shared Components
// import Navbar from "./components/navbar/Navbar";
// import TopStrip from "./components/navbar/TopStrip";
// import Footer from "./components/Footer";
// import FloatingWhatsApp from "./components/FloatingWhatsApp";
// import ScrollToTop from "./components/ScrollToTop";

// // Public Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Woven from "./pages/services/Woven";
// import Knit from "./pages/services/Knit";
// import Sample from "./pages/services/Sample";
// import Merchandising from "./pages/services/Merchandising";
// import Compliance from "./pages/Compliance";

// // Admin Pages
// import Login from "./pages/Admin/AdminLogin";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import Banners from "./pages/Admin/Banners";
// import Services from "./pages/Admin/Services";
// import Clients from "./pages/Admin/Clients";

// function AppWrapper() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Identify admin routes
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // ✅ Token state
//   const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

//   // ✅ JWT validation
//   const isTokenValid = (token) => {
//     if (!token) return false;
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   };

//   // ✅ Logout
//   const handleLogout = () => {
//     setToken(null);
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   // ✅ Login success
//   const handleLogin = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("adminToken", newToken);
//     navigate("/admin");
//   };

//   // ✅ Auto logout if token expired
//   useEffect(() => {
//     if (token && !isTokenValid(token)) {
//       handleLogout();
//     }
//   }, [token]);

//   return (
//     <>
//       {/* Hide TopStrip & Navbar on admin routes */}
//       {!isAdminPage && (
//         <>
//           <TopStrip
//             phone="+88 01711556131"
//             email="zamal@gruposourcing.com"
//             address="House 256, Road: 03 (East Side) DOHS Baridhara, Dhaka-1206, Bangladesh"
//             onSearch={(q) => console.log("search:", q)}
//           />
//           <Navbar />
//         </>
//       )}

//       <ScrollToTop />
//       <main
        
//       >
//         <Routes>
//           {/* ✅ Admin Routes (Protected) */}
//           <Route
//             path="/admin"
//             element={
//               isTokenValid(token) ? (
//                 <AdminDashboard token={token} onLogout={handleLogout} />
//               ) : (
//                 <Login onLogin={handleLogin} />
//               )
//             }
//           >
//             <Route path="banners" element={<Banners />} />
//             <Route path="services" element={<Services />} />
//             <Route path="clients" element={<Clients />} />
//           </Route>

//           <Route
//             path="/admin/login"
//             element={<Login onLogin={handleLogin} />}
//           />

//           {/* ✅ Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/services/woven" element={<Woven />} />
//           <Route path="/services/knit" element={<Knit />} />
//           <Route path="/services/sample" element={<Sample />} />
//           <Route path="/services/merchandising" element={<Merchandising />} />
//           <Route path="/compliance" element={<Compliance />} />

//           {/* 404 Page */}
//           <Route
//             path="*"
//             element={
//               <div className="p-10 text-center text-red-500 text-xl">
//                 404 - Page Not Found
//               </div>
//             }
//           />
//         </Routes>
//       </main>

//       {/* ✅ Only show footer & WhatsApp on public pages */}
//       {!isAdminPage && (
//         <>
//           <FloatingWhatsApp />
//           <Footer />
//         </>
//       )}
//     </>
//   );
// }

// // ✅ Wrapped in Router
// export default function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }
