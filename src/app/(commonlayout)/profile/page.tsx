import { redirect } from "next/navigation";
import { userService } from "@/service/userService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect("/login");
  }

  const user = data.user;

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-black tracking-tight mb-8">My Profile</h1>

      <div className="border border-slate-200 rounded-2xl p-6 bg-white dark:bg-card flex items-center gap-5">
        <Avatar className="size-16">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="text-xl">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge variant="secondary" className="mt-2">
            {user.role}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        Editing your profile, uploading a photo, and updating your password
        will be available here soon.
      </p>
    </div>
  );
}