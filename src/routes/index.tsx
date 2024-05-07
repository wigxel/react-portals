import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Button, NotificationContent, ProfileContent } from "~/components/portals/all";
import { SectionBadge, SectionBox } from "~/components/shared";

export const Route = createFileRoute("/")({
  component: Layout,
});

function Layout() {
  const [tab, setTab] = React.useState<string>("profile");

  return (
    <main className="flex flex-col bg-[#161616] overflow-hidden border border-black h-[100svh] justify-center items-center">
      <div className="max-w-lg w-full flex flex-col gap-4">
        <SectionBox className="h-16 p-2">
          <SectionBadge>{`<Nav/>`}</SectionBadge>
          <Button data-active={tab === 'profile'} onClick={() => setTab("profile")}>Profile</Button>
          <Button data-active={tab === 'notif'} onClick={() => setTab("notif")}>Notification</Button>
        </SectionBox>

        <SectionBox className="aspect-square flex-col p-6">
          {tab === "profile" ? <ProfileContent /> : null}
          {tab === "notif" ? <NotificationContent /> : null}
        </SectionBox>
      </div>
    </main>
  );
}
