import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";
import CapitalizeFirstLetterLocale from "../hooks/CapitaleFirstLetter";

export default function BreadCrumbs({ segments }) {
  let linkPath = "/";

  return (
    <>
      {segments.length > 1 ? (
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, i) => {
              linkPath += `${segment}/`;
              return (
                <Fragment key={segment}>
                  <BreadcrumbItem>
                    <Link href={linkPath}>
                      {CapitalizeFirstLetterLocale(segment)}
                    </Link>
                  </BreadcrumbItem>
                  {segments.length - 1 !== i && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        ""
      )}
    </>
  );
}
