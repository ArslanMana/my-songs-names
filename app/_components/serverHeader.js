import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route.js";
import Header from "./header.js";
export default async function serverHeader() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header user={session.user} />
    </>
  );
}
