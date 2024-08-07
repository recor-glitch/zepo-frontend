"use client";

import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconCurrencyDollar,
  IconNotification,
  IconSearch,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="flex w-full flex-col justify-between items-center gap-default">
      <div className="flex w-full justify-between items-center">
        <p className="text-text-primary font-bold text-md-title">Dashboard</p>
        <div className="flex gap-default justify-between items-center">
          <IconNotification />
          <IconSquareRoundedPlus />
        </div>
      </div>
      {/* SEARCH FIELDS */}
      <div className="flex flex-1 justify-between items-center gap-default w-full">
        <div className="flex justify-between items-center rounded-full px-sm-h bg-white border">
          <input
            name="search"
            placeholder="Search here..."
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconSearch />
        </div>
        <div className="flex justify-between gap-default items-center flex-1">
          <div className="flex justify-between items-center rounded-full px-sm-h bg-white border">
            <input
              name="price"
              placeholder="Price"
              className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
              onChange={() => {}}
            />
            <div className="divider-v" />
            <IconCurrencyDollar />
          </div>
          <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
            <input
              name="propertyType"
              placeholder="Property Type"
              className="placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
              onChange={() => {}}
            />
            <div className="divider-v" />
            <IconChevronDown />
          </div>
        </div>
        <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
          <input
            name="location"
            placeholder="location"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconChevronDown />
        </div>
        <div className="flex justify-between items-center flex-1 rounded-full px-sm-h bg-white border">
          <input
            name="filter"
            placeholder="Filters"
            className="flex-1 placeholder:text-md-subtitle-primary placeholder:font-medium placeholder:text-text-secondary-dark focus:outline-none flex py-default"
            onChange={() => {}}
          />
          <div className="divider-v" />
          <IconAdjustmentsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
