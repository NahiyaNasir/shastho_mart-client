/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  PackageOpen, 
  LogOut, 
  // User as UserIcon 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

 
export function UserNav({ user, handleLogout }: { user: any, handleLogout: () => void }) {

  return (
  
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount   >  
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Role Based Links */}
        {(user?.role === "ADMIN" || user?.role === "SELLER") && (
  <DropdownMenuItem asChild>
    <Link 
      href={
        user.role === "ADMIN" 
          ? "/admin"
          : "/seller/dashboard"
      } 
      className="cursor-pointer"
    >
      <LayoutDashboard className="mr-2 h-4 w-4" />
      <span>Dashboard</span>
    </Link>
  </DropdownMenuItem>
)}

        {user?.role === "CUSTOMER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/cart" className="cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Cart</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders" className="cursor-pointer">
                <PackageOpen className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}