import Link from "next/link";
import {
  Breadcrumb as BreadcrumbChakra,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

export default function Breadcrumb(props: { current: string }) {
  return (
    <BreadcrumbChakra display="flex" mb="8">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/">
          ホーム
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{props.current}</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbChakra>
  );
}
