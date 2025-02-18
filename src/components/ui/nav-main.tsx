// ------------------------- This is original working Code ------------------------------

// "use client";

// import { type LucideIcon } from "lucide-react";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../Task";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon: LucideIcon;
//     isActive?: boolean;
//     count?: number;
//   }[];
// }) {
//   const location = useLocation();

//   // Get tasks from Redux store
//   const todos = useSelector((state: RootState) => state.todos.todos);
//   const completedTodos = useSelector(
//     (state: RootState) => state.todos.completedTodos
//   );

//   // Compute task counts
//   const pendingCount = todos.length;
//   const completedCount = completedTodos.length;

//   // Update count dynamically in nav items
//   const updatedItems = items.map((item) => {
//     if (item.title === "Home") return { ...item, count: pendingCount };
//     if (item.title === "Completed") return { ...item, count: completedCount };
//     return item;
//   });

//   return (
//     <SidebarMenu>
//       {updatedItems.map((item) => {
//         const isActive = location.pathname === item.url;
//         return (
//           <SidebarMenuItem key={item.title}>
//             <SidebarMenuButton asChild isActive={isActive}>
//               <a
//                 href={item.url}
//                 className="flex items-center justify-between w-full"
//               >
//                 <div className="flex items-center gap-2">
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.title}</span>
//                 </div>
//                 {item.count !== undefined && (
//                   <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-1 rounded-full">
//                     {item.count}
//                   </span>
//                 )}
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         );
//       })}
//     </SidebarMenu>
//   );
// }

// *******************************************************************************************************
"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Task";
import { ScrollArea } from "./scroll-area";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    count?: number;
  }[];
}) {
  const location = useLocation();

  // Get tasks & categories from Redux store
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedTodos = useSelector(
    (state: RootState) => state.todos.completedTodos
  );
  const categories = useSelector((state: RootState) => state.todos.categories); // ✅ Get categories

  // Compute task counts
  const pendingCount = todos.length;
  const completedCount = completedTodos.length;

  // Update count dynamically in nav items
  const updatedItems = items.map((item) => {
    if (item.title === "Home") return { ...item, count: pendingCount };
    if (item.title === "Completed") return { ...item, count: completedCount };
    return item;
  });

  return (
    <SidebarMenu>
      {/* Default Menu Items */}
      {updatedItems.map((item) => {
        const isActive = location.pathname === item.url;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <a
                href={item.url}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </div>
                {item.count !== undefined && (
                  <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}

      {/* Categories Section */}
      {/* <div className="mt-4 border-t border-gray-300 pt-2"> */}
      <h3 className="text-xs mt-5 uppercase font-semibold text-gray-500 px-3">
        Categories
      </h3>
      {/* <ScrollArea className="w-full"> */}
      <div className="">
        {categories.map((category) => (
          <SidebarMenuItem key={category.title}>
            <SidebarMenuButton asChild>
              <button className="flex justify-start   font-medium items-center gap-2 my-1 w-full px-3 py-2 text-left">
                <span className="text-lg">{category.emoji}</span>
                <span>{category.title}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}
