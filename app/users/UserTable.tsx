import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  searchParams: string;
}

const UserTable = async ({ searchParams }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();
  const sortN = () => {
    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ));
  };
  const sortBy = (by: string) => {
    return sort(users)
      .asc((u) => (by === "email" ? u.email : u.name))
      .map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ));
  };
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href={"/users?sortOrder=name"}>Name</Link>
          </th>
          <th>
            <Link href={"/users?sortOrder=email"}>Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {searchParams === "name" && sortBy("name")}
        {searchParams === "email" && sortBy("email")}
        {searchParams !== "email" && searchParams !== "name" && sortN()}
      </tbody>
    </table>
  );
};

export default UserTable;
