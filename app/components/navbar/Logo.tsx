"use client";
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter();
  return (
    <Image
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height="100"
      width="100"
      src="/images/logo.png"
    />
  );
};

export default Logo;
