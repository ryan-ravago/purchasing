"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import CustomTabTrigger from "./CustomTabTrigger";
import ServerSideTable from "./ServerSideTable";
import { columns } from "./TableColumns";

const status = [
  { statCode: "RQSTD", statDesc: "Requested" },
  { statCode: "PNDH", statDesc: "Pending on head" },
  { statCode: "APRH", statDesc: "Approved by head" },
  { statCode: "RJCH", statDesc: "Rejected by head" },
  { statCode: "PNDP", statDesc: "Pending on purchasing" },
  { statCode: "APRP", statDesc: "Approved by purchasing" },
  { statCode: "RJCP", statDesc: "Rejected by purchasing" },
  { statCode: "PNDE", statDesc: "Pending on EXECOM" },
  { statCode: "APRE", statDesc: "Approved by EXECOM" },
  { statCode: "RJCE", statDesc: "Rejected by EXECOM" },
  { statCode: "INPRG", statDesc: "In-progress" },
  { statCode: "CMPLT", statDesc: "Completed" },
  { statCode: "CNCLD", statDesc: "Cancelled" },
  { statCode: "RQSTDI", statDesc: "Requested Item" },
  { statCode: "CMPLTDI", statDesc: "Completed Item" },
  { statCode: "CNCLDI", statDesc: "Cancelled Item" },
  { statCode: "ONGNI", statDesc: "On-going Item" },
];

export function MyTabs() {
  const [tabVal, setTabVal] = useState(status[0].statCode);

  return (
    <div className="mx-auto mb-10">
      {/* START TABS */}
      <Tabs value={tabVal}>
        {/* START TAB BUTTONS */}
        <TabsList
          style={{
            width: `calc(100% - 120px)`,
            margin: "auto",
            display: "block",
          }}
        >
          <Carousel className="w-full">
            <CarouselContent className="-ml-1 w-full max-w-[50px] md:max-w-[100px] bg-gray-300 mb-2">
              {status.map((stat) => (
                <CarouselItem
                  key={stat.statCode}
                  className="pl-1 basis-auto bg-gray-300 py-2"
                >
                  {/* <TabsTrigger value={stat.statCode}>
                    {stat.statDesc}
                  </TabsTrigger> */}
                  <CustomTabTrigger
                    onClick={() => {
                      setTabVal(stat.statCode);
                    }}
                    className="text-sm px-4 py-2 bg-white rounded-lg"
                  >
                    {stat.statDesc}
                  </CustomTabTrigger>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsList>
        {/* END TAB BUTTONS */}

        {/* START TAB CONTENTS BUTTON */}
        {status.map((stat, i) => (
          <TabsContent
            key={stat.statCode}
            value={stat.statCode}
            className="mt-8"
          >
            <ServerSideTable columns={columns} />
          </TabsContent>
        ))}
        {/* END TAB CONTENTS BUTTON */}
      </Tabs>
      {/* END TABS */}
    </div>
  );
}
