import React from "react";
import ZepoLogo from "@/public/zepo-logo.svg";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { IFooterItems } from "@/type/app";

const footerItems: IFooterItems[] = [
  {
    title: "SELL A HOME",
    items: [
      {
        title: "Request an offer",
        link: "/offer",
      },
      {
        title: "Pricing",
        link: "/pricing",
      },
      {
        title: "Reviews",
        link: "/reviews",
      },
      {
        title: "Stories",
        link: "/stories",
      },
    ],
  },
  {
    title: "BUY A HOME",
    items: [
      {
        title: "Buy",
        link: "/buy",
      },
      {
        title: "Finance",
        link: "/Finance",
      },
    ],
  },
  {
    title: "BUY, RENT AND SELL",
    items: [
      {
        title: "Buy and sell properties",
        link: "/buy",
      },
      {
        title: "Rent home",
        link: "/rent",
      },
      {
        title: "Builder trade-up",
        link: "/builder",
      },
    ],
  },
  {
    title: "TERMS & PRIVACY",
    items: [
      {
        title: "Trust & Safety",
        link: "/trust",
      },
      {
        title: "Terms of Service",
        link: "/terms",
      },
      {
        title: "Privacy Policy",
        link: "/privacy",
      },
    ],
  },
  {
    title: "ABOUT",
    items: [
      {
        title: "Company",
        link: "/company",
      },
      {
        title: "How it works",
        link: "/how-it-works",
      },
      {
        title: "Contact",
        link: "/contact",
      },
      {
        title: "Inventors",
        link: "/inventors",
      },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      {
        title: "Blog",
        link: "/blog",
      },
      {
        title: "Guides",
        link: "/guides",
      },
      {
        title: "FAQ",
        link: "/faq",
      },
      {
        title: "Help Center",
        link: "/help",
      },
    ],
  },
];

const FooterHome = () => {
  return (
    <div>
      <div className="flex h-4/5 flex-1 md:flex-row md:gap-0 gap-v flex-col justify-start w-full pl-h pr-h pt-v">
        <div className="flex w-1/3">
          <Image
            src={ZepoLogo}
            alt="Website logo"
            className="w-[9.438rem] h-[2.5rem]"
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 md:w-2/3 w-full text-left">
          {footerItems.map((item, index) => {
            return (
              <div
                className="flex flex-col gap-4 mb-v"
                key={item.title + index}
              >
                <p className="text-md-subtitle-primary font-bold">
                  {item.title}
                </p>
                <div className="flex flex-col gap-2">
                  {item.items.map((ele, idx) => {
                    return (
                      <Link
                        href={ele.link}
                        className="font-medium text-md-subtitle-primary"
                        key={ele.title + idx}
                      >
                        {ele.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="divider-h" />
      <div className="flex h-1/5 flex-1 pl-h pr-h pt-v md:flex-row flex-col justify-between items-center">
        <p className="text-md-subtitle-primary font-medium">
          @2024 Zepo. All right reserved
        </p>
        <div className="flex gap-icon-spacing pt-footer-v pb-footer-v">
          <IconBrandFacebookFilled className="text-text-primary" />
          <IconBrandInstagram className="text-text-primary" />
          <IconBrandTwitterFilled className="text-text-primary" />
          <IconBrandLinkedin className="text-text-primary" />
        </div>
      </div>
    </div>
  );
};

export default FooterHome;
