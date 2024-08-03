"use client";
import ContactList from "@/components/sections/ContactList";
import { getUserData, uploadData } from "@/utils/data";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-4 md:p-24">
      <ContactList />
    </main>
  );
}
