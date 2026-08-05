"use client";

import { Menu, ShoppingCart, LayoutDashboard, Store, Users, ShieldCheck } from "lucide-react";

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
import { useCart } from "@/hooks/use-cart";
import { UserNav } from "./user-nav";

import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  user: User | null;
  className?: string;
  logo?: {
    url: string;
    title: string;
  };
}

// ─── Menus per role ────────────────────────────────────────────────────────────

const LOGGED_OUT_MENU: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

const CUSTOMER_MENU: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "My Orders", url: "/orders" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

const SELLER_MENU: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  {
    title: "Seller Dashboard",
    url: "/seller/dashboard",
    icon: <Store className="size-4" />,
    items: [
      {
        title: "Dashboard",
        description: "Overview of your sales and products",
        icon: <LayoutDashboard className="size-5 shrink-0" />,
        url: "/seller/dashboard",
      },
      {
        title: "My Medicines",
        description: "Manage your medicine listings",
        icon: <Store className="size-5 shrink-0" />,
        url: "/seller/dashboard/medicine",
      },
      {
        title: "Orders",
        description: "View and manage customer orders",
        icon: <ShoppingCart className="size-5 shrink-0" />,
        url: "/seller/dashboard/orders",
      },
    ],
  },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

const ADMIN_MENU: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  {
    title: "Admin Panel",
    url: "/admin",
    icon: <ShieldCheck className="size-4" />,
    items: [
      {
        title: "Dashboard",
        description: "Platform-wide overview and statistics",
        icon: <LayoutDashboard className="size-5 shrink-0" />,
        url: "/admin",
      },
      {
        title: "Manage Users",
        description: "View and manage all customers",
        icon: <Users className="size-5 shrink-0" />,
        url: "/admin/users",
      },
      {
        title: "Manage Sellers",
        description: "Approve or suspend sellers",
        icon: <Store className="size-5 shrink-0" />,
        url: "/admin/sellers",
      },
      {
        title: "Manage Orders",
        description: "View and update all orders",
        icon: <ShoppingCart className="size-5 shrink-0" />,
        url: "/admin/orders",
      },
      {
        title: "Categories",
        description: "Manage medicine categories",
        icon: <ShieldCheck className="size-5 shrink-0" />,
        url: "/admin/categories",
      },
    ],
  },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

// ─── Helper to get menu by role ────────────────────────────────────────────────
function getMenuByRole(user: User | null): MenuItem[] {
  if (!user) return LOGGED_OUT_MENU;
  const role = (user as unknown as { role?: string }).role;
  if (role === "ADMIN") return ADMIN_MENU;
  if (role === "SELLER") return SELLER_MENU;
  return CUSTOMER_MENU;
}

// ─── Main Navbar ───────────────────────────────────────────────────────────────

const Navbar = ({
  user,
  logo = {
    url: "/",
    title: "Shastho-Mart",
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const { itemCount } = useCart();
  const menu = getMenuByRole(user);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.refresh();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout", { id: toastId });
    }
  };

  return (
    <section
      className={cn(
        "py-3 sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b shadow-sm",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* ── Desktop Menu ── */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight text-primary">
              Shastho
            </span>
            <span className="text-xl font-black tracking-tight">Mart</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex gap-2 items-center">
            <ModelToggle />

            {/* Cart */}
            <Button asChild variant="outline" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="size-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Auth */}
            {user ? (
              <UserNav user={user} handleLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/Register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-1">
              <span className="text-lg font-black tracking-tight text-primary">
                Shastho
              </span>
              <span className="text-lg font-black tracking-tight">Mart</span>
            </Link>

            <div className="flex items-center gap-2">
              <ModelToggle />

              {/* Cart */}
              <Button asChild variant="outline" size="icon" className="relative">
                <Link href="/cart">
                  <ShoppingCart className="size-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Hamburger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open menu">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto w-70">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-1">
                        <span className="text-lg font-black tracking-tight text-primary">
                          Shastho
                        </span>
                        <span className="text-lg font-black tracking-tight">
                          Mart
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-4 mt-2">
                    {/* Role badge */}
                    {user && (
                      <RoleBadge role={(user as unknown as { role?: string }).role} />
                    )}

                    {/* Nav Links */}
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-2"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="border-t pt-4">
                      {user ? (
                        <UserNav user={user} handleLogout={handleLogout} />
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild>
                            <Link href="/Register">Register</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Role Badge (mobile sidebar) ──────────────────────────────────────────────
const RoleBadge = ({ role }: { role?: string }) => {
  if (!role) return null;
  const map: Record<string, { label: string; color: string }> = {
    ADMIN: { label: "Admin", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    SELLER: { label: "Seller", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    CUSTOMER: { label: "Customer", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  };
  const info = map[role] ?? { label: role, color: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full w-fit", info.color)}>
      {info.label}
    </span>
  );
};

// ─── Desktop Menu Renderers ────────────────────────────────────────────────────
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="font-medium">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          <ul className="grid w-105 gap-1 p-3">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:outline-none"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// ─── Mobile Menu Renderers ─────────────────────────────────────────────────────
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-sm py-1.5 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-1 ml-2 flex flex-col gap-1">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className="flex items-start gap-3 rounded-md p-2 text-sm hover:bg-muted transition-colors"
            >
              {subItem.icon && (
                <span className="mt-0.5 text-muted-foreground">{subItem.icon}</span>
              )}
              <span className="font-medium">{subItem.title}</span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-sm font-semibold py-1.5 hover:text-primary transition-colors"
    >
      {item.title}
    </Link>
  );
};

// ─── Submenu Link (Desktop dropdown) ──────────────────────────────────────────
const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-3 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      {item.icon && (
        <div className="mt-0.5 text-primary shrink-0">{item.icon}</div>
      )}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground mt-0.5">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Navbar;