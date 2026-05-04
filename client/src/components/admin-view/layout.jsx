import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* {admin sidebar} */}
      <div className="w-64 bg-white border-r border-gray-200 shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col relative">
        {/* {admin header} */}
        <AdminHeader />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
