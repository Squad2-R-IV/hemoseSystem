import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Button } from "@heroui/react";

import {
    HomeIcon,
    UsersIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
  } from "@heroicons/react/24/outline";
import { Link as RouteLink } from "react-router";

interface SidebarMenuProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const menuItems = [
  { icon: HomeIcon, label: "Home", path: "/home" },
  { icon: ClipboardDocumentListIcon, label: "Consultas Abertas", path: "/selecao-agendamento" },
  { icon: CalendarDaysIcon, label: "Recepção", path: "/recepcao" },
  { icon: QuestionMarkCircleIcon, label: "Help", path: "/help" },
];

export default function SidebarMenu({ isOpen, onOpenChange }: SidebarMenuProps) {
  return (
    <Drawer 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      backdrop="transparent"
      placement="left"
      size="sm"
      defaultOpen={true}
      classNames={{
        backdrop: "bg-opacity-0",
        base: "bg-content1"
      }}
    >
      <DrawerContent>
        <DrawerHeader className="border-b border-divider">
          <h4 className="text-xl font-semibold">Navigation</h4>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <div className="flex flex-col gap-1 p-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                as={RouteLink}
                to={item.path}
                variant="flat"
                className="justify-start"
                startContent={<item.icon className="h-5 w-5" />}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}