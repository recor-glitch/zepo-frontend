import Image from "next/image";
import React from "react";

interface avatarProps {
  image: string;
  bgColor: string;
  showOutline?: boolean;
}

function ProfileAvatar({ bgColor, image, showOutline = false }: avatarProps) {
  return (
    <>
      {showOutline ? (
        <div className={`rounded-full bg-primary p-[4px]`}>
          <div className="rounded-full bg-white p-avatar-outer">
            <div className={`rounded-full bg-${bgColor}`}>
              <Image src={image} alt="profile picture" width={60} height={60} />
            </div>
          </div>
        </div>
      ) : (
        <div className={`rounded-full bg-${bgColor}`}>
          <Image src={image} alt="profile picture" width={60} height={60} />
        </div>
      )}
    </>
  );
}

export default ProfileAvatar;
