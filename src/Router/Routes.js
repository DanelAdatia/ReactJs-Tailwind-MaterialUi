import React from "react";
import { Routes, Route } from "react-router-dom";
import SalesDivide from "../view/Sales/components/SalesDivide";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sales" element={<SalesDivide />} />
    </Routes>
  );
};

export default AppRoutes;
