import { Metadata } from "next";
import Banner from "./components/home/hero";
import Companies from "./components/home/companies";
import Work from "./components/home/work";
import Table from "./components/home/table";
import FeaturedAssets from "./components/home/featured-assets"; // updated
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Real Assets, Reinvented Ownership",
};

export default function Home() {
  return (
    <main>
      <Banner />       {/* now handles its own client-side state */}
      <Companies />
      <Work />
      <Table />
      <FeaturedAssets /> {/* replaces Features */}
      <Simple />
      <Trade />
      <Faq />
      <ContactForm />
    </main>
  );
}
