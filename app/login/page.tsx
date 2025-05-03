// app/login/page.tsx
"use client";
import { useState } from "react";

import { loginUser } from "../api/loginUser";

const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const res = await loginUser(form.email, form.password);
  
      if (res.success) {
        const role = res.role.toLowerCase(); // e.g. "Doctor" → "doctor"
        window.location.href = `/dashboard/${role}`;
      } else {
        setError(res.error || "Login failed");
      }
  
      setLoading(false);
    };
  
    return (
      <div className="p-6 max-w-md mx-auto mt-10 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
  
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
  
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    );
  };
  
  export default LoginForm;

