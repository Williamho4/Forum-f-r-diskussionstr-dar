import { createContext } from "react";
import { useFetchThreads } from "../hooks/fetchThread";

export const ThreadContext = createContext();

export function ThreadProvider({ children }) {
  const { threads, error, fetchThreads } = useFetchThreads();

  return (
    <ThreadContext.Provider value={{ threads, error, fetchThreads }}>
      {children}
    </ThreadContext.Provider>
  );
}
