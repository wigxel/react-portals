import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { createPortal } from "react-dom";
import { CardTitle } from "~/@/components/ui/card";
import {
  Boxes,
  Button,
  NotificationContent,
  ProfileContent,
} from "~/components/portals/all";
import { SectionBadge, SectionBox } from "~/components/shared";

export const Route = createFileRoute("/")({
  component: Layout,
});

function PortalChild(props: { target: string; children: React.ReactNode }) {
  const { target } = props;
  const [targetEl, setTargetEl] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const targetEl = document.querySelector(target); // element or null

    if (!targetEl) {
      console.warn(`Unable to find target ${target}`);
    }

    setTargetEl(targetEl);
  }, []);

  if (targetEl === null) return null;

  return createPortal(props.children, targetEl);
}

function BoxesExample() {
  return (
    <main className="flex h-[100svh] flex-col items-center justify-center overflow-hidden border border-black bg-[#161616]">
      <div className="relative w-full max-w-lg">
        <Boxes />

        <PortalChild target={"#boxes-1"}>
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-500" />
        </PortalChild>
      </div>
    </main>
  );
}

function Layout() {
  const [tab, setTab] = React.useState<string>("profile");

  return (
    <main className="flex h-[100svh] flex-col items-center justify-center overflow-hidden border border-black bg-[#161616]">
      <div className="flex w-full max-w-lg flex-col gap-4">
        <SectionBox id="nav" className="h-16 p-2">
          <SectionBadge>Tabs</SectionBadge>
        </SectionBox>

        <SectionBox id="content" className="aspect-square flex-col p-6">
          <SectionBadge>Contents</SectionBadge>
        </SectionBox>

        <Profile
          isActive={tab === "profile"}
          onClick={() => {
            setTab("profile");
          }}
        />

        {/* Uncomment the code below to render Notification Button and Content  */}

        {/* <Notification isActive={tab === 'notification'}
          onClick={() => {
            setTab('notification')
          }}
        /> */}

        <Security
          isActive={tab === "settings"}
          onClick={() => {
            setTab("settings");
          }}
        />
      </div>
    </main>
  );
}

type TabContentProps_ = { isActive: boolean; onClick: () => void };

function Profile(props: TabContentProps_) {
  return (
    <>
      <PortalChild target="#nav">
        <Button data-active={props.isActive} onClick={props.onClick}>
          Profile
        </Button>
      </PortalChild>

      {props.isActive ? (
        <PortalChild target="#content">
          <ProfileContent />
        </PortalChild>
      ) : null}
    </>
  );
}

function Notification(props: TabContentProps_) {
  return (
    <>
      <PortalChild target="#nav">
        <Button data-active={props.isActive} onClick={props.onClick}>
          Notification
        </Button>
      </PortalChild>

      {props.isActive ? (
        <PortalChild target="#content">
          <NotificationContent />
        </PortalChild>
      ) : null}
    </>
  );
}

function Security(props: TabContentProps_) {
  return (
    <>
      <PortalChild target="#nav">
        <Button data-active={props.isActive} onClick={props.onClick}>
          Security
        </Button>
      </PortalChild>

      {props.isActive ? (
        <PortalChild target="#content">
          <CardTitle>Change Password</CardTitle>
        </PortalChild>
      ) : null}
    </>
  );
}
