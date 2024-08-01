import ContactList from "@/components/sections/ContactList";
import OnlineStatus from "@/components/sections/OnlineStatus";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <ContactList />
      <OnlineStatus />
    </main>
  );
}
