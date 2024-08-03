"use client";
import React, { useEffect, useState } from "react";
import Tab from "../ui/elements/Tab";
import { fetcher } from "@/helpers/fetchHelper";
import useSWR from "swr";
import { getMemberUsers, getTeamUsers, getUserData } from "@/helpers/dbHelper";
import ListCard from "../ui/elements/Cards/ListCard";
import CardSkeleton from "../ui/elements/Skeletons/CardSkeleton";
import Button from "../ui/elements/Button";
import routes from "@/utils/routes";

const ContactList = () => {
  let initialTabs = [
    { name: "All", href: "#", current: true, count: 24 },
    { name: "Teams", href: "#", current: false, count: 15 },
    { name: "Members", href: "#", current: false, count: 9 },
  ];

  const [initialUsers, setInitialUsers] = useState<Record<string, any>[]>([]);
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
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

  //initial data of all users
  const { data: userData, isLoading } = useSWR(routes.GET_ALL_USERS, fetcher);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  //for setting initial users and users for first render
  useEffect(() => {
    setUsers(userData);
    setInitialUsers(userData);
  }, [userData]);

  //fetches and updates tabs according to current tab
  const handleTabClick = async (tab: Record<string, any>) => {
    setLoading(true);
    setSelectedMember(-1); //to clear the selected member, if one is selected
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

    // this will redirect the tab to all users to show the result in "All Users"
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let updatedTabs = tabs.map((t) => {
      if (t.name === "All") {
        return { ...t, current: true };
      } else {
        return { ...t, current: false };
      }
    });
    setTabs(updatedTabs);
    if (term.length > 3) {
      //search will be initiated only when the search term length is greater than 3
      const filteredUsers = initialUsers?.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      if (!filteredUsers.length) {
        setError({ notFound: "No user found" });
      } else {
        // reset error if user found
        setError(null);
      }
      setUsers(filteredUsers);
    } else {
      setUsers(initialUsers);
      setError(null);
    }
  };

  return (
    <div className="rounded-xl bg-white py-4 transition-all w-full  md:w-[30rem] h-fit">
      <div className="relative w-full px-12">
        <input
          type="text"
          placeholder="Contacts"
          value={searchTerm || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full py-2 pl-4 pr-8 text-gray-700 bg-white focus:outline-none"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none">
          {/* search icon */}
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
        {/* cross button */}
        <button
          onClick={() => handleSearch("")}
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

        {/* displays invite and cancel button only when a member is selected */}
        {selectedMember > 0 && (
          <div className="flex pt-6 pb-3 px-8 gap-8 border-t justify-end">
            <Button
              variant="outline"
              size="small"
              onClick={() => setSelectedMember(-1)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="small">
              Invite
            </Button>
          </div>
        )}

        {/* If no data is present */}
        {!loading && !users && (
          <div className="text-center py-4 px-8">No users found</div>
        )}

        {/* if user is not found on searching */}
        {error?.notFound && (
          <div className="text-center py-4 px-8">{error.notFound}</div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
