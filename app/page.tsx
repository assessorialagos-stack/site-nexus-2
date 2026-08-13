import Hero from "@/components/Hero";
import WhatItIs from "@/components/WhatItIs";
import Calculator from "@/components/Calculator";
import ReportExample from "@/components/ReportExample";
import Offer from "@/components/Offer";
import Testimonials from "@/components/Testimonials";
import Authority from "@/components/Authority";
import Closing from "@/components/Closing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <WhatItIs />
        <Calculator />
        <ReportExample />
        <Offer />
        <Testimonials />
        <Authority />
        <Closing />
        <Faq />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
