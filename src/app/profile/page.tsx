// import { validateAndRefreshSession } from "@/actions/auth-actions";
// import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FC } from "react";

const ProfilePage: FC = async () => {
  // const user = await verifyAuth();

  // if (!user) {
  //   return redirect("/auth");
  // }

  // async function refreshAction() {
  //   "use server";
  //   await validateAndRefreshSession();
  // }

  return <h1>ProfilePage</h1>;
};

export default ProfilePage;
