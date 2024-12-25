import React from "react";
import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import { authentMedia } from "@/actions/media.actions";
async function Me() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center gap-y-5 mt-[50px] p-3 text-center">
      {JSON.stringify(session, null, 2)}
      <LogoutButton />
      <div>test</div>
    </div>
  );
}

export default Me;
