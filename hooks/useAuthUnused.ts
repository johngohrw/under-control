// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export type AuthObjectProps = {
//   user: {
//     createdAt: string;
//     email: string;
//     emailVerified: null | boolean;
//     id: string;
//     image: string;
//     name: string;
//     updatedAt: string;
//   };
//   expires: string;
// };

// const CACHE_KEY = "uc-auth";
// export function useAuthUnused() {
//   const { status, data: sessionData } = useSession();
//   const cache = localStorage.getItem(CACHE_KEY);

//   // cache auth object to local storage
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       console.log("remove cache");
//       localStorage.removeItem(CACHE_KEY);
//     }
//   }, [status]);

//   useEffect(() => {
//     const updateAuthObject = async () => {
//       if (!sessionData?.user?.email) return;
//       const userResponse = await axios.get(
//         `/api/user?email=${sessionData?.user.email}`
//       );

//       const authObject = {
//         user: {
//           ...sessionData?.user,
//           ...userResponse?.data?.data,
//         },
//         expires: sessionData?.expires,
//       };

//       localStorage.setItem(CACHE_KEY, JSON.stringify(authObject));
//     };
//     console.log("cache", cache, "status", status);

//     if (!cache && status === "authenticated") {
//       console.log("update auth object");
//       updateAuthObject();
//     }
//   }, [status, cache, sessionData]);

//   return {
//     status,
//     ...(!(status === "unauthenticated") && cache ? JSON.parse(cache) : {}),
//   };
// }
