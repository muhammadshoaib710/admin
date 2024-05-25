import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, customerColumns, userColumns, productColumns, ShippingColumns } from "./datatablesource";
import NewRoom from "./pages/newRoom/NewRoom";
import NewHotel from "./pages/newHotel/NewHotel";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="users" element={
            <Routes>
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
            </Routes>
          }/>
          <Route path="product/getproducts" element={
            <Routes>
              <Route index element={<ProtectedRoute><List columns={productColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
            </Routes>
          }/>
          <Route path="customer/getcustomers" element={
            <Routes>
              <Route index element={<ProtectedRoute><List columns={customerColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewRoom /></ProtectedRoute>} />
            </Routes>
          }/>
           <Route path="shipping/viewshipping" element={
                <Routes>
                  <Route index element={<ProtectedRoute><List columns={ShippingColumns} /></ProtectedRoute>} />
                </Routes>
              }/>
       </Routes>
      
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;