import Link from "next/link";
import { authUserSession } from "@/libs/auth-libs";

const UserActionButton = async () => {
  const user = await authUserSession();

  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin";

  return (
    <div className="flex justify-between gap-2">
      {user ? (
        <Link href="/users/dashboard" className="py-1">
          Dashboard
        </Link>
      ) : null}
      <Link
        href={actionURL}
        className="items-center inline-block px-12 py-1 rounded bg-color-primary text-color-dark"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default UserActionButton;
