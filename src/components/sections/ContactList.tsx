"use client";
import React, { useEffect, useState } from "react";
import Tab from "../ui/elements/Tab";
import { fetcher } from "@/helpers/fetchHelper";
import useSWR from "swr";
import { getMemberUsers, getTeamUsers, getUserData } from "@/utils/data";
import ListCard from "../ui/elements/Cards/ListCard";
import CardSkeleton from "../ui/elements/Skeletons/CardSkeleton";

const ContactList = () => {
  let initialTabs = [
    { name: "All", href: "#", current: true, count: 24, data: [{}] },
    { name: "Teams", href: "#", current: false, count: 12 },
    { name: "Members", href: "#", current: false, count: 16 },
  ];
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any> | null>(null);
  const [selectedMember, setSelectedMember] = useState<number>(-1);
  const [tabs, setTabs] = useState(initialTabs);

  const toggleSelectedMember = (id: number) => {
    if (selectedMember === id) {
      setSelectedMember(-1);
    } else {
      setSelectedMember(id);
    }
  };

  const { data: userData, isLoading } = useSWR(
    "/api/users?category=all",
    fetcher
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const handleTabClick = async (tab: Record<string, any>) => {
    setLoading(true);
    setSelectedMember(-1);
    if (tab.name === "Teams") {
      const users = await getTeamUsers();
      setUsers(users);
    } else if (tab.name === "Members") {
      const users = await getMemberUsers();
      setUsers(users);
    } else {
      const users = await getUserData();
      setUsers(users);
    }

    const updatedTabs = tabs.map((t) => {
      if (t.name === tab.name) {
        return { ...t, current: true };
      } else {
        return { ...t, current: false };
      }
    });
    setTabs(updatedTabs);
    setLoading(false);
  };

  return (
    <section>
      <div
        className="rounded-xl bg-white py-4 transition-all"
        style={{ width: "30rem" }}
      >
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
        <div className="mt-4">
          {loading ? (
            <CardSkeleton />
          ) : (
            users?.length > 0 &&
            users.map((user) => (
              <ListCard
                key={user.id}
                name={user.name}
                status={user.status}
                last_active={user.last_active}
                image_url={user.image_url}
                category={user.category}
                selected={selectedMember === user.id}
                onClick={() => {
                  if (user.category === "member") toggleSelectedMember(user.id);
                }}
              />
            ))
          )}
          {!loading && !users && (
            <div className="text-center py-4 px-8">No users found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactList;
