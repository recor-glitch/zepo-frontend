import { profileMenuItems } from "@/constants";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface IprofileContentProps {
  title: string;
  subtitle: string;
}

const ProfileMenuContent = ({ subtitle, title }: IprofileContentProps) => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="flex flex-col gap-default">
      {/* HEADER */}
      <div className="flex flex-col p-default">
        <p className="font-bold text-md-title">{title}</p>
        <p className="font-medium text-md-subtitle-primary">{subtitle}</p>
      </div>
      <div className="divider-h" />
      {/* MENU ITEMS */}
      <div className="flex flex-col gap-default p-default">
        {profileMenuItems.map((item) => (
          <div className="flex gap-default items-center justify-start">
            <item.icon />
            <Link href={item.link}>{item.title}</Link>
          </div>
        ))}
      </div>
      <div className="divider-h" />
      <div className="p-default">
        <button className="outlinedBtn w-full" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuContent;
