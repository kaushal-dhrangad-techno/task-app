import { AppSidebar } from "@/components/ui/app-sidebar";
import { NavActions } from "@/components/ui/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Task from "../Task";
export default function Sidebar() {
  //Print Today's Date
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);

  //Print Greetings
  const currentHours = new Date().getHours();
  let greetings;
  if (currentHours < 12) {
    greetings = "Good Morning";
  } else if (currentHours < 18) {
    greetings = "Good Afternoon";
  } else {
    greetings = "Good Evening";
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 text-xl font-semibold">
                    {greetings} Kaushal!!
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className=" hidden pl-[66px] mt-[-9px] font-medium text-slate-500 md:flex dark:text-slate-400">
          {formattedDate}
        </div>
        {/* <Task /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
