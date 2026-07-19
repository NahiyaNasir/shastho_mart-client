"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/actions/admin.action";
import { toast } from "sonner";
import { Ban, CheckCircle2 } from "lucide-react";
import { UserStatus } from "@/types/user.types";

interface UserStatusToggleProps {
  userId: string;
  status: UserStatus;
}

export default function UserStatusToggle({ userId, status }: UserStatusToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);

  const isBanned = currentStatus === UserStatus.BAN;
  const nextStatus = isBanned ? UserStatus.UNBAN : UserStatus.BAN;

  const handleToggle = () => {
    startTransition(async () => {
      const res = await updateUserStatus(userId, nextStatus);

      if (res?.error) {
        toast.error(res.error.message || "Failed to update user status");
        return;
      }

      setCurrentStatus(nextStatus);
      toast.success(
        nextStatus === UserStatus.BAN ? "User banned" : "User unbanned",
      );
    });
  };

  return (
    <Button
      variant={isBanned ? "outline" : "destructive"}
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
      className="gap-1.5"
    >
      {isBanned ? (
        <>
          <CheckCircle2 className="size-3.5" />
          {isPending ? "Unbanning..." : "Unban"}
        </>
      ) : (
        <>
          <Ban className="size-3.5" />
          {isPending ? "Banning..." : "Ban"}
        </>
      )}
    </Button>
  );
}