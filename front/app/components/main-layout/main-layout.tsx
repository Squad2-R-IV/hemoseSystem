import React from "react";
import { Outlet } from "react-router";
import Header from "../header/header";
import SidebarMenu from "../sidebar-menu/sidebar-menu";

export default function MainLayout() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <div className="min-h-screen bg-[#F0F4F7]">
      <Header onMenuToggle={handleMenuToggle} />
      <SidebarMenu isOpen={isOpen} onOpenChange={setIsOpen} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}