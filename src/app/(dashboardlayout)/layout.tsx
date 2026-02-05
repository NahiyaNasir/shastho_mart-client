import { AppSidebar } from "@/components/layout/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constanst/role";
import { userService } from "@/service/userServise";


export default async function DashboardLayout({

  admin,
  seller,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {
  const { data } = await userService.getSession();
// console.log(data);
  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* {children} */}
          {userInfo.role === Roles.ADMIN ? admin: seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}