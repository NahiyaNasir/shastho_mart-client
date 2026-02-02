import {
  DollarSign,
  ExternalLink,
  Share2,
  ShoppingBasket,
  Timer,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

import { Button } from "../ui/button";

import Link from "next/link";

import { TooltipButton } from "../ui/tooltip-button";

export default function MedicineCard({ data }: { data: unknown }) {
  return (
    <>
      <Card className="">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="text-sm px-3 py-1">New</Badge>
            <Badge variant={"outline"} className="text-sm px-3 py-1">
              Out of Stock
            </Badge>
          </div>
          <Badge className="text-sm font-semibold tracking-wider px-3 py-1 [&_svg]:size-4! flex items-center gap-1">
            <Timer /> 10:10:05
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-14 h-full mt-5">
          <Image
            src={"vercel.svg"}
            width={200}
            height={300}
            alt="categories"
            className="mx-auto"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-wide">
                Medicine Name
              </h3>
              <Badge variant={"outline"}>Napa</Badge>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              saepe cum expedita ad corrupti magnam nemo ipsum.
            </p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-bold">$20.20</h2>
              {/* <ratin rate={4} showScore /> */}
            </div>
            <div className="flex items-center justify-between mt-5">
              <Button size={"lg"}>
                <DollarSign /> Buy Now
              </Button>
              <div className="flex items-center gap-3">
                <TooltipButton
                  icon={ShoppingBasket}
                  title="Add To Cart"
                  variant={"default"}
                />
                <Link href={`/shop/${data?.id}`}>
                  <TooltipButton icon={ExternalLink} title="View More" />
                </Link>
                <TooltipButton icon={Share2} title="Share" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
