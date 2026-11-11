"use client";
import { FC, useSyncExternalStore } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const subscribe = () => () => {};

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  // false on the server and during hydration, true once mounted on the client
  const hasMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!hasMounted) return null;
  return <>{children}</>;
};

export default ClientOnly;
