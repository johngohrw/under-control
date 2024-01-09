import { signIn, signOut, useSession } from "next-auth/react";

export const useSignIn = () => {
  const { data: session, status, ...rest } = useSession();

  const labelMap: { [key in typeof status]: string } = {
    loading: "loading",
    authenticated: "Sign out",
    unauthenticated: "Sign in",
  };
  return {
    label: labelMap[status],
    onClick: session ? () => signOut() : () => signIn(),
    status: status,
    session,
    ...rest,
  };
};
