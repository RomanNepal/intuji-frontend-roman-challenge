"use client";
import ContactList from "@/components/sections/ContactList";
import OnlineStatus from "@/components/sections/OnlineStatus";
import { getUserData, uploadData } from "@/utils/data";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-24">
      <ContactList />
      <OnlineStatus />
    </main>
  );
}
