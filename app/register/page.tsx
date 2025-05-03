"use client";
import { useState } from "react";

import { UserRole } from "@/types/appwrite.types";

import { registerUser } from "../api/registerUser";


interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  role: UserRole | "";
}

const UserRegisterForm = () => {
  const [form, setForm] = useState<RegisterFormState>({
    fullName: "",
    email: "",
    password: "",
    role: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select a role");
      return;
    }

    const res = await registerUser(
      form.fullName,
      form.email,
      form.password,
      form.role as UserRole
    );

    if (res.success) {
      window.location.href = "/login";
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full p-2 border rounded"
      />

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

      <select
        required
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Select a role</option>
        <option value="Receptionist">Receptionist</option>
        <option value="Doctor">Doctor</option>
        <option value="Nurse">Nurse</option>
        <option value="Pharmacist">Pharmacist</option>
        <option value="Inventory">Inventory</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default UserRegisterForm;
