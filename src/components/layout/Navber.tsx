"use client";

import {  Menu, PackageOpen, ShoppingCart,  } from "lucide-react";

import { cn } from "@/lib/utils";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModelToggle } from "./ModelToggle";

import { User } from "@/types/user.types";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { TooltipButton } from "../ui/tooltip-button";


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  user:User|null,
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}
 ;

const Navbar = ({
user,
  logo = {
    url: "https://localhost:3000",
    src: "https://ibb.co.com/NPRsXnR",
    alt: "logo",
    title: "Shastho-Mart",
  },
  menu = [
     { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: " Dashboard",
      url: "/seller/dashboard"
    },

  ],
  auth = {
      login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/Register" },
  },
  className,

  

}: Navbar1Props) => {

   const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            toast.success("Logged out successfully", { id: toastId });

            // router.refres();
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout", { id: toastId });
        }
    };
 
  return (
    
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-1">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              {/* <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              /> */}
    
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ModelToggle></ModelToggle>
 {user ?
  (<>
     <Link href={"/cart"}>
                  <TooltipButton icon={ShoppingCart} title="Cart" />
                </Link>
                <Link href={"/orders"}>
                  <TooltipButton icon={PackageOpen} title="Orders" />
                </Link>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleLogout}
                                    variant={`outline`}
                                    size={`default`}
                                    className="cursor-pointer"
                                >
                                    Logout
                                </Button>
                                <div className="relative w-10 h-10">
                                    
                                </div>
                            </div>
                            </>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="default"
                                >
                                    <Link href={auth.login.url}>
                                        {auth.login.title}
                                    </Link>
                                </Button>
                                <Button asChild size="default">
                                    <Link href={auth.signup.url}>
                                        {auth.signup.title}
                                    </Link>
                                </Button>
                            </>
                        )}

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              {/* <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              /> */}
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      {/* <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      /> */}
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
               
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
       <Link href={item.url}>{item.title}</Link> 
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

  export default Navbar;
