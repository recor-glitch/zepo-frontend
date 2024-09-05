import {
  BrowsePropertySection,
  LaningSection,
  ReachOutSection,
  StatSection,
  TestimonialSection,
  TourSection,
} from "@/components/home";

export default async function Home() {
  return (
    <>
      <LaningSection />
      <TourSection />
      <StatSection />
      <BrowsePropertySection />
      <TestimonialSection />
      <ReachOutSection />
    </>
  );
}
