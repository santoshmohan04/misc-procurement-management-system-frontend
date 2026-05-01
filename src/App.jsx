import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PurchaseOrder from "./pages/PurchaseOrder";
import PlacedOrderRequest from "./pages/PlacedOrderRequest";
import Response from "./pages/Response";
import PurchasedOrder from "./pages/PurchasedOrder";
import UpdateStatus from "./pages/UpdateStatus";
import DeliveryAdvice from "./pages/DeliveryAdvice";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/paymenthistory";
import Request from "./pages/Request";
import { Register, Login } from "./pages";
import Users from "./pages/Users";
import AddSuppliers from "./pages/AddSuppliers";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import AddProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import DeliveryAdviceManager from "./pages/DeliveryAdviceManager";
import PerchasedOrdersforAdmin from "./pages/PerchasedOrdersforAdmin";
import ListDeliveryAdvice from "./pages/ListDeliveryAdvice";
import PurchasedOrderAccount from "./pages/PurchasedOrderAccount";
import PurchasedOrderSupplier from "./pages/purchasedOrderSupplier";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/order" element={<PurchaseOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderRequest" element={<PlacedOrderRequest />} />
        <Route path="/request" element={<Request />} />
        <Route path="/response" element={<Response />} />
        <Route path="/purchasedOrder" element={<PurchasedOrder />} />
        <Route path="/deliveryStatus" element={<UpdateStatus />} />
        <Route path="/deliveryAdvice" element={<DeliveryAdvice />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentHistory" element={<PaymentHistory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/term" element={<Terms />} />
        <Route path="/addSupplier" element={<AddSuppliers />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/Products" element={<ListProducts />} />
        <Route path="/managerAdvice" element={<DeliveryAdviceManager />} />
        <Route path="/adminOrder" element={<PerchasedOrdersforAdmin />} />
        <Route path="/accountDeliveryAdvice" element={<ListDeliveryAdvice />} />
        <Route path="/orderAccount" element={<PurchasedOrderAccount />} />
        <Route path="/supplierOrder" element={<PurchasedOrderSupplier />} />
      </Routes>
    </Router>
  );
};

export default App;
