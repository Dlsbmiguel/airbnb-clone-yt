"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientOnly";

interface Props {
  error: Error;
}

const ErrorState: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ClientOnly>
      <EmptyState title="Uh oh" subtitle="Something went wrong" />
    </ClientOnly>
  );
};

export default ErrorState;
