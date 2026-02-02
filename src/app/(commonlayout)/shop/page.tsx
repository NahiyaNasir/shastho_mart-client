import MedicineCard from "@/components/layout/MedicineCard";
import PaginationControl from "@/components/shared/paginatin";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getMedicines } from "@/service/seller.service";
import {  Search, Trash2 } from "lucide-react";

export default async function Shop() {

   const { data } = await getMedicines(

  );

  console.log(data);
  return (
    <>
      <div className="w-11/12 flex flex-col gap-48 mx-auto">
        <Card className="w-full h-100">
          <CardContent className="h-full flex flex-col gap-3 items-center justify-center">
            <h1 className="text-4xl font-semibold tracking-tight text-center">
              Precision Care, <b>Delivered</b> to Your Door.
            </h1>
            <p className="text-lg text-muted-foreground tracking-wide max-w-2xl text-center">
              Search our curated collection of verified pharmaceuticals and
              wellness essentials. Your health, managed with digital expertise.
            </p>
            <div className="mt-14 border w-2xl h-16 rounded-full px-3 py-2 flex gap-3 items-center">
              <Badge className="w-10 h-10 rounded-full [&_svg]:size-6!">
                <Trash2 />
              </Badge>
              <Separator orientation="vertical" />
              <Input
                placeholder="Search for medicines, vitamins, or brands..."
                type="text"
                className="bg-transparent! border-0"
              />
              <Button variant={"secondary"} size={"lg"}>
                <Search />
              </Button>
            </div>
          </CardContent>
        </Card>
        <section className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="border rounded-full px-5 py-3 flex items-center gap-3">
              <Button variant={"default"}>All</Button>
              <Button variant={"secondary"}>Popular</Button>
              <Button variant={"secondary"}>Offer</Button>
            </div>
            <div className="border rounded-full px-5 h-17 py-3 flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-45 bg-transparent! border-0!">
                  <SelectValue placeholder="SortBy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="dark">Low</SelectItem>
                  <SelectItem value="system">High</SelectItem>
                  <SelectItem value="system">Created</SelectItem>
                </SelectContent>
              </Select>
              <Separator orientation="vertical" />
              <Select>
                <SelectTrigger className="w-45 bg-transparent! border-0!">
                  <SelectValue placeholder="SortOrder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Desc</SelectItem>
                  <SelectItem value="dark">Asc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="my-16 grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, idx) => (
              <MedicineCard key={idx} data={{ id: idx }} />
            ))}
          </div>
          <PaginationControl currentPage={2} totalPages={5} />
        </section>
      </div>
    </>
  );
}