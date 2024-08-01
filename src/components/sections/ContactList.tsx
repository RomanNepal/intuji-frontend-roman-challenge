"use client";
import React, { useState } from "react";
import Tab from "../ui/elements/Tab";

const ContactList = () => {
  const allContactList = [
    {
      name: "21 Industries",
      image_url: "",
      status: "offline",
      last_active: "2024-01-19 03:14:07.499999",
      category: "team",
    },
    {
      name: "Darcy Patterson",
      image_url: "",
      status: "online",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
    {
      name: "Alex Hamilton",
      image_url: "",
      status: "away",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
  ];
  const teamContactList = [
    {
      name: "21 Industries",
      image_url: "",
      status: "offline",
      last_active: "2024-01-19 03:14:07.499999",
      category: "team",
    },
    {
      name: "Darcy Patterson",
      image_url: "",
      status: "online",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
    {
      name: "Alex Hamilton",
      image_url: "",
      status: "away",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
  ];
  const membersContactList = [
    {
      name: "21 Industries",
      image_url: "",
      status: "offline",
      last_active: "2024-01-19 03:14:07.499999",
      category: "team",
    },
    {
      name: "Darcy Patterson",
      image_url: "",
      status: "online",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
    {
      name: "Alex Hamilton",
      image_url: "",
      status: "away",
      last_active: "2038-01-19 03:14:07.499999",
      category: "member",
    },
  ];

  let initialTabs = [
    { name: "All", href: "#", current: true, count: 24, data: [{}] },
    { name: "Teams", href: "#", current: false, count: 12 },
    { name: "Members", href: "#", current: false, count: 16 },
  ];
  const [tabs, setTabs] = useState(initialTabs);

  const handleTabClick = (tab: Record<string, any>) => {
    const updatedTabs = tabs.map((t) => {
      if (t.name === tab.name) {
        return { ...t, current: true };
      } else {
        return { ...t, current: false };
      }
    });
    setTabs(updatedTabs);
  };
  return (
    <section>
      <div className="rounded-xl bg-white py-4" style={{ width: "30rem" }}>
        <div className="relative w-full px-12">
          <input
            type="text"
            placeholder="Contacts"
            // value={searchTerm}
            // onChange={handleChange}
            className="w-full py-2 pl-10 pr-8 text-gray-700 bg-white focus:outline-none"
          />

          <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <button
            // onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-8"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <Tab
          tabs={tabs}
          handleTabClick={(tab) => handleTabClick(tab)}
          className="px-8 border-y mt-2"
        />
      </div>
    </section>
  );
};

export default ContactList;
