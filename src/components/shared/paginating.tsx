"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { TooltipButton } from "../ui/tooltip-button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  options?: {
    size?: "icon-sm" | "icon" | "icon-lg" | null | undefined;
  };
}

export default function PaginationControl({
  totalPages,
  currentPage,
  options,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageView = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-5 items-center justify-center">
      <TooltipButton
        icon={ChevronsLeft}
        title="First"
        variant="secondary"
        onClick={() => handlePageView(1)}
        disabled={currentPage <= 1}
        size={options?.size}
      />

      <TooltipButton
        icon={ChevronLeft}
        title="Prev"
        variant="secondary"
        onClick={() => handlePageView(currentPage - 1)}
        disabled={currentPage <= 1}
        size={options?.size}
      />
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <span
              key={idx}
              className={`rounded-full transition-colors duration-100 ${
                isActive
                  ? "bg-orange-600 w-5 h-2.5 animate-in"
                  : "bg-neutral-300 w-2.5 h-2.5 animate-out"
              }`}
            />
          );
        })}
      </div>

      <TooltipButton
        icon={ChevronRight}
        title="Next"
        variant="secondary"
        onClick={() => handlePageView(currentPage + 1)}
        disabled={currentPage >= totalPages}
        size={options?.size}
      />

      <TooltipButton
        icon={ChevronsRight}
        title="Last"
        variant="secondary"
        onClick={() => handlePageView(totalPages)}
        disabled={currentPage >= totalPages}
        size={options?.size}
      />
    </div>
  );
}