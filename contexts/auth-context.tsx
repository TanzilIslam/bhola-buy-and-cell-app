"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AuthModal } from "@/components/layout/modals/AuthModal";

interface AuthContextValue {
  isLoggedIn: boolean;
  openAuthModal: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  openAuthModal: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  function handleSuccess() {
    setIsLoggedIn(true);
    setAuthOpen(false);
  }

  function logout() {
    setIsLoggedIn(false);
    toast.success("Signed out successfully.");
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, openAuthModal: () => setAuthOpen(true), logout }}
    >
      {children}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleSuccess}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
