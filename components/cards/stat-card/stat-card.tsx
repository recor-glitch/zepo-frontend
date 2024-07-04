import { IStatCard } from "@/type/app";
import Image from "next/image";
import React from "react";

function StatCard({ img, subtitle, title, floatingIcon }: IStatCard) {
  return (
    <div className="flex md:flex-col flex-row gap-default items-center">
      {/* CIRCLE ICON */}
      <div className="rounded-full p-xs border-1 border-primary-light bg-white relative w-tab h-tab">
        {/* FLOATING ICON */}
        {floatingIcon && (
          <div className="absolute rounded-full bg-primary p-xs bottom-0 right-0">
            <Image
              src={floatingIcon.url}
              alt={floatingIcon.alt}
              width={16}
              height={16}
            />
          </div>
        )}
        <div className="flex rounded-full bg-primary-lighter p-icon">
          <Image src={img.url} alt={img.alt} height={32} width={32} />
        </div>
      </div>
      <div className="flex flex-col md:items-center items-start text-center">
        <p className="text-text-primary font-bold text-md-title">{title}</p>
        <p className="text-sm-subtitle text-text-secondary-dark font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
