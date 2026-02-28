/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  MoreVertical,
  Pencil,
  Trash2,
  Pill,
  Stethoscope,
  Activity,
  Baby,
  Sparkles,
  Syringe,
  ExternalLink,
} from "lucide-react";

import Link from "next/link";


interface CategoryProps {
  cate: {
    id: string;
    name: string;
    description?: string;
    medicines?: any[];
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  Antibiotics: <Pill className="size-5 text-blue-500" />,
  "Pain Relief": <Activity className="size-5 text-red-500" />,
  Pediatric: <Baby className="size-5 text-pink-500" />,
  Skincare: <Sparkles className="size-5 text-emerald-500" />,
  Vaccines: <Syringe className="size-5 text-indigo-500" />,
  Psychotropic: <AlertCircle className="size-5 text-amber-500" />,
};

export default function CategoryCard({ cate }: CategoryProps) {
 
  const Icon = categoryIcons[cate.name] || (
    <Stethoscope className="size-5 text-muted-foreground" />
  );

  return (
    <Card className="group hover:shadow-md transition-all duration-300 border-muted-foreground/10 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex gap-4">
      
          <div className="flex items-center justify-center size-12 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
            {Icon}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold leading-none tracking-tight">
              {cate.name}
            </CardTitle>
            <CardDescription className="line-clamp-1 text-xs text-muted-foreground mt-1">
              {cate.description || "No description available"}
            </CardDescription>
          </div>
        </div>

     
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <Link href={`/admin/categories/update/${cate.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 size-4 text-blue-600" />
                <span>Update</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/admin/categories/delete/${cate.id}`}>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <Trash2 className="mr-2 size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
         
         


          <div className="flex items-center justify-end">
            <Link
              href={`/shop?category=${encodeURIComponent(cate.name)}`}
              className="group/link inline-flex items-center text-xs font-semibold text-primary hover:underline"
            >
              View Medicines
              <ExternalLink className="ml-1 size-3 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}