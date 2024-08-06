"use client";

import { IconNotification, IconSearch } from "@tabler/icons-react";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="flex w-full flex-col justify-between items-center gap-default">
      <div className="flex w-full justify-between items-center">
        <p className="text-text-primary font-bold text-md-title">Dashboard</p>
        <div className="flex gap-md justify-between items-center">
          <IconNotification />
        </div>
      </div>
      {/* SEARCH FIELDS */}
      <div className="flex flex-1 justify-between items-center gap-default w-full">
        <div className="flex justify-between items-center rounded-full px-sm-h bg-white border">
          <input
            name="email"
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconSearch />
        </div>
        <div className="flex justify-between gap-default items-center flex-1">
          <div className="flex justify-between items-center rounded-full px-sm-h bg-white border">
            <input
              name="email"
              placeholder="Enter your email address"
              className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
              onChange={() => {}}
            />
            <div className="divider-v" />
            <IconSearch />
          </div>
          <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
            <input
              name="email"
              placeholder="Enter your email address"
              className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
              onChange={() => {}}
            />
            <div className="divider-v" />
            <IconSearch />
          </div>
        </div>
        <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
          <input
            name="email"
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconSearch />
        </div>
        <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
          <input
            name="email"
            placeholder="Enter your email address"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconSearch />
        </div>
      </div>
      {/* HEADER */}
      <div className="flex justify-start items-center gap-default w-full">
        <p className="text-md-subtitle-primary text-text-secondary font-medium">
          Your Listing
        </p>
        <p className="text-md-subtitle-primary text-text-secondary font-medium">
          Drafts
        </p>
      </div>
      {/* BODY */}
      <div className="flex flex-col h-full"></div>
    </div>
  );
};

export default AdminNavbar;
