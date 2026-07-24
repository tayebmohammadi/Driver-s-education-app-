import { getSessionFromCookies } from "@/lib/auth/session";
import { GetStartedFlow } from "@/components/get-started/get-started-flow";

export default async function GetStartedPage() {
  const session = await getSessionFromCookies();

  return (
    <GetStartedFlow
      signedIn={Boolean(session)}
      role={session?.role ?? null}
    />
  );
}

