import Hero from "@/components/Hero";
import Differentiation from "@/components/Differentiation";
import Process from "@/components/Process";
import Deliverable from "@/components/Deliverable";
import ReportExample from "@/components/ReportExample";
import Authority from "@/components/Authority";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Differentiation />
        <Process />
        <Deliverable />
        <ReportExample />
        <Authority />
        <Offer />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
