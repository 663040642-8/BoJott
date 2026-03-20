"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl border w-full max-w-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-900 text-blue-100 flex items-center justify-center font-medium text-lg">
            {session.user?.name?.[0] ?? session.user?.email?.[0]}
          </div>
          <div>
            <p className="font-semibold">{session.user?.name ?? "ไม่มีชื่อ"}</p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
