import React, { Suspense } from "react";
import PropertyLoadingPage from "./loading";

const PropertyDetailLayoutPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Suspense fallback={<PropertyLoadingPage />}>{children}</Suspense>
    </>
  );
};

export default PropertyDetailLayoutPage;
