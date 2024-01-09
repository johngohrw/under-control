"use client";

import { ContentPadding } from "@/components/ContentPadding";
import { SignInOutButton } from "@/components/SignInOutButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export default function HomePublic() {
  return (
    <div className="flex flex-col">
      <HomeSection innerClassName="flex flex-col items-center text-center">
        <h1 className="mt-4 text-4xl font-bold mb-2">UNDER CONTROL</h1>
        <p className="text-muted-foreground text-sm mb-1">
          Effortless expenses tracking for busy individuals
        </p>

        <p className="text-muted-foreground text-sm mb-4">
          Still in early alpha*
        </p>
        <div className="flex gap-2">
          <SignInOutButton label="Sign me up" />
          <Button
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#ux")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Learn More
          </Button>
        </div>
      </HomeSection>

      <HomeSection
        id="ux"
        className="bg-blue-500 bg-opacity-20"
        innerClassName="flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Lightning Fast UX</h2>
        <p className="text-muted-foreground text-sm max-w-[400px]">
          With a user experience optimized for least amount of inputs,{" "}
          <strong>UNDER CONTROL</strong> wants to stay out of your way as much
          as possible - by reducing redundant and repetitive actions, saving
          your previous time.
        </p>
      </HomeSection>
      <HomeSection
        id="vis"
        className="bg-pink-300 bg-opacity-20"
        innerClassName="flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Insightful Visualisations</h2>
        <p className="text-muted-foreground text-sm max-w-[400px]">
          Understand and optimize your spending habits at a glance.{" "}
          <strong>UNDER CONTROL</strong>&apos;s dashboards provides a wide array
          of fully-customisable charts, graphs, and tables.
        </p>
      </HomeSection>
      <HomeSection
        id="data"
        className="bg-green-300 bg-opacity-20"
        innerClassName="flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Your Data is Yours</h2>
        <p className="text-muted-foreground text-sm max-w-[400px]">
          Bulk import and export will always be available. Unlike other
          solutions, <strong>UNDER CONTROL</strong> won&apos;t lock you in
          forever by making it hard to integrate with other solutions.
        </p>
      </HomeSection>
      <HomeSection
        id="cta"
        innerClassName="flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold mb-2">It&apos;s Free</h2>
        <p className="text-muted-foreground text-sm max-w-[400px] mb-1">
          If you&apos;re still wondering - yes it is.{" "}
        </p>
        <p className="text-muted-foreground text-sm max-w-[400px] mb-4">
          I made this for myself and I&apos;d be glad if you like it too.
        </p>
        <SignInOutButton label="Sign me up" />
      </HomeSection>
    </div>
  );
}

const HomeSection = ({
  children,
  className = "",
  innerClassName = "",
  ...props
}: { innerClassName?: string } & ReactGenericHTMLElementProps) => {
  return (
    <ContentPadding
      className={cn("flex flex-col items-center justify-center", className)}
      innerClassName={innerClassName}
      style={{
        minHeight: "calc(100vh - 50px)",
      }}
      {...props}
    >
      {children}
    </ContentPadding>
  );
};
