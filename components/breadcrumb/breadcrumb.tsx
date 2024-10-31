import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithCustomSeparator({
  items,
}: {
  items: { title: string; link: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem>
            {index !== items.length - 1 ? (
              <BreadcrumbLink>
                <Link
                  href={item.link}
                  className="text-text-secondary text-md-subtitle-secondary font-bold"
                >
                  {item.title}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-text-secondary text-md-subtitle-secondary font-bold">
                {item.title}
              </BreadcrumbPage>
            )}
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
