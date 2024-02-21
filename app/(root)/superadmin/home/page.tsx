"use client";
import { useSession } from "next-auth/react";

const HomeSuperAdmin = () => {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};
export default HomeSuperAdmin;
