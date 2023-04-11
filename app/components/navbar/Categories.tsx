"use client";
import { FC } from "react";
import Container from "../Container";
import { categories } from "@/constants/categories";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="flex items-center justify-between pt-4 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={item.label === category}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
