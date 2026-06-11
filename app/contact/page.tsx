import { ContactPage } from "@/features/contact-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Takeout Media",
  description: "The only thing standing between you and domination is a conversation. Get in touch with Takeout Media today.",
};

/**
 * Contact Us Route
 * 
 * App Router page that renders the ContactPage feature.
 */
export default function Page() {
  return <ContactPage />;
}
