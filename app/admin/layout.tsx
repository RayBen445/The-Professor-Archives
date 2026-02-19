"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Feather,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((data) => {
        setAuthenticated(data.authenticated === true);
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          setAuthenticated(true);
        } else {
          setError("Incorrect password. Access denied.");
          setPassword("");
        }
      } catch {
        setError("Connection error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [password]
  );

  const handleLogout = useCallback(async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto mb-4" />
          <p className="text-aged font-serif text-sm">Verifying access...</p>
        </motion.div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-6">
        {/* Background texture */}
        <div className="fixed inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a55a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-cream border border-aged/30 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* Header */}
            <div className="bg-ink border-b border-aged/20 px-8 py-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-5"
              >
                <Lock className="w-7 h-7 text-gold" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Feather className="w-4 h-4 text-gold" />
                  <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
                    {"The Professor's Archives"}
                  </span>
                </div>
                <h1 className="font-baby text-2xl font-bold text-cream">
                  Admin Access
                </h1>
                <p className="text-aged text-sm mt-2 font-serif">
                  Enter the password to manage your archives
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold text-ink-light uppercase tracking-wider mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <ShieldCheck className="w-4 h-4 text-ink-muted" />
                    </div>
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter admin password"
                      className="w-full pl-11 pr-12 py-3.5 bg-parchment border border-aged/30 rounded-xl text-ink font-serif placeholder:text-ink-muted/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      autoFocus
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading || !password}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-ink text-cream font-semibold rounded-xl hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-ink/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Unlock Dashboard
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-center text-ink-muted text-xs mt-6 font-serif">
                Protected area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-gold/10 to-accent/10 rounded-3xl blur-2xl -z-10" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleLogout}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-ink text-cream text-sm font-semibold rounded-full shadow-xl hover:bg-red-900 transition-all group"
        aria-label="Sign out"
      >
        <LogOut className="w-4 h-4 group-hover:text-red-300 transition-colors" />
        <span className="hidden sm:inline">Sign Out</span>
      </motion.button>
      {children}
    </div>
  );
}
