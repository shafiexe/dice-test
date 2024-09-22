"use client";

import React from "react";
import * as Paths from "@router/paths";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Home() {
  const [data, setData] = React.useState<{ message: string } | null>(null);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email) {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });
      fetchUsers(); // Refresh user list
      setUsername(""); // Clear input
      setEmail(""); // Clear input
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{data?.message}</p>
      <a href={Paths.authLogout}> Logout </a>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      <br />
      <br />
      <h2>User List</h2>
      <ul>
        {users?.map((user) => (
          <li key={user?.id}>
            {user?.username} - {user?.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
