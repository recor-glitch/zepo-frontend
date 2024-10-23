import {
  BrowsePropertySection,
  LaningSection,
  ReachOutSection,
  StatSection,
  TestimonialSection,
  TourSection,
} from "@/components/home";
import { UsePropertyFilterContextProvider } from "@/context/property/property-filter/property-filter-content";

export default async function Home() {
  return (
    <>
      <UsePropertyFilterContextProvider>
        <LaningSection />
        <TourSection />
        <StatSection />
        <BrowsePropertySection />
        <TestimonialSection />
        <ReachOutSection />
      </UsePropertyFilterContextProvider>
    </>
  );
}
