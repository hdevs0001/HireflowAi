"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { adminNav } from "@/config/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar items={adminNav} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <BreadcrumbNav />
        </header>

        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
