"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LogIn, UserPlus, X } from "lucide-react";
import type { AuthModalProps } from "@/types/modals";
import {
  loginSchema,
  signupSchema,
  type LoginFormValues,
  type SignupFormValues,
} from "@/types/validationSchema";

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginFormValues) {
    // TODO: need to connect login with Supabase
    console.log("login", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2">
          <LogIn className="size-4 mr-2" />
          Log In
        </Button>
      </form>
    </Form>
  );
}

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  function onSubmit(values: SignupFormValues) {
    // TODO: need to connect sign up with Supabase
    console.log("signup", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Bhola Ahmed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+880 1711-234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2">
          <UserPlus className="size-4 mr-2" />
          Create Account
        </Button>
      </form>
    </Form>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────

// Single modal with Login / Sign Up tabs
export const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-background rounded-2xl w-full max-w-sm mx-4 shadow-xl border border-border overflow-hidden">
        {/* Header gradient strip */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-[#D247BF]" />

        <div className="p-6">
          {/* Title row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h2>
            <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6">
            {(["login", "signup"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === tab
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "login" ? (
                  <>
                    <LogIn className="size-3.5" />
                    Log In
                  </>
                ) : (
                  <>
                    <UserPlus className="size-3.5" />
                    Sign Up
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Active form */}
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}

          {/* Footer hint */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            {activeTab === "login" ? (
              <>
                No account?{" "}
                <button
                  className="text-primary underline-offset-2 hover:underline"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have one?{" "}
                <button
                  className="text-primary underline-offset-2 hover:underline"
                  onClick={() => setActiveTab("login")}
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
