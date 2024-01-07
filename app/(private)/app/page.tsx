import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export default async function PrivateHome() {
  return (
    <ContentPadding>
      <h1>Home</h1>
      <p>Hello authenticated user</p>
    </ContentPadding>
  );
}
