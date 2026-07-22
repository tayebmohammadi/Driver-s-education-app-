import { redirect } from "next/navigation";
import { HubLayout } from "@/components/hub/hub-layout";
import { ProfileView } from "@/components/profile/profile-view";
import { getAuthenticatedUser } from "@/lib/auth/get-authenticated-user";
import { getSessionFromCookies } from "@/lib/auth/session";

export default async function ProfilePage() {
  const session = await getSessionFromCookies();

  if (!session) {
    redirect("/login?redirect=/profile");
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  return (
    <HubLayout title="Profile" showBack={false} showStudyHours={false}>
      <ProfileView user={user} />
    </HubLayout>
  );
}
