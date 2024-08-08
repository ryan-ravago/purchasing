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
  // { statCode: "RQSTD", statDesc: "Requested" },
  { statCode: "PNDH", statDesc: "Pending on head", reqStatCode: "Yellow" },
  { statCode: "APRH", statDesc: "Approved by head", reqStatCode: "Indigo" },
  { statCode: "RJCH", statDesc: "Rejected by head", reqStatCode: "Yellow" },
  {
    statCode: "PNDP",
    statDesc: "Pending on purchasing",
    reqStatCode: "Teal",
  },
  {
    statCode: "APRP",
    statDesc: "Approved by purchasing",
    reqStatCode: "Teal",
  },
  {
    statCode: "RJCP",
    statDesc: "Rejected by purchasing",
    reqStatCode: "Teal",
  },
  { statCode: "PNDE", statDesc: "Pending on EXECOM", reqStatCode: "Yellow" },
  { statCode: "APRE", statDesc: "Approved by EXECOM", reqStatCode: "Yellow" },
  { statCode: "RJCE", statDesc: "Rejected by EXECOM", reqStatCode: "Yellow" },
  { statCode: "INPRG", statDesc: "In-progress", reqStatCode: "Yellow" },
  { statCode: "CMPLT", statDesc: "Completed", reqStatCode: "Yellow" },
  { statCode: "CNCLD", statDesc: "Cancelled", reqStatCode: "Yellow" },
  { statCode: "RQSTDI", statDesc: "Requested Item", reqStatCode: "Yellow" },
  { statCode: "CMPLTDI", statDesc: "Completed Item", reqStatCode: "Yellow" },
  { statCode: "CNCLDI", statDesc: "Cancelled Item", reqStatCode: "Yellow" },
  { statCode: "ONGNI", statDesc: "On-going Item", reqStatCode: "Yellow" },
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
            className="mt-8 "
          >
            <ServerSideTable columns={columns} reqStatCode={stat.reqStatCode} />
          </TabsContent>
        ))}
        {/* END TAB CONTENTS BUTTON */}
      </Tabs>
      {/* END TABS */}
    </div>
  );
}
