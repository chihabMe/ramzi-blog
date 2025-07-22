import { Metadata } from "next";
import ContactAdminClient from "@/components/ContactAdminClient";

export const metadata: Metadata = {
  title: "Contact Messages - Admin | Ramzi Blog",
  description: "Manage contact form submissions",
};

export default function ContactMessagesPage() {
  return <ContactAdminClient />;
}
