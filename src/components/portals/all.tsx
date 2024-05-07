import { Switch } from "~/@/components/ui/switch";
import { cn } from "~/@/lib/utils";
import { SectionBadge, SectionBox } from "../shared";
import { Input } from "~/@/components/ui/input";

export function Button(props: React.ComponentProps<'button'>) {
  const { className, children, ...PROPS } = props;

  return (
    <button
      {...PROPS}
      className={cn("bg-white/25 data-[active=true]:via-yellow-500/[0.2] data-[active=true]:border-yellow-500/[0.85] data-[active=true]:to-yellow-500/[0.50] data-[active=true]:from-yellow-500/[0.50] bg-gradient-to-tr from-white/25 via-transparent to-white/25 px-4 text-white border border-white inline-block p-2 rounded-lg", className)}
    >
      {children}
    </button>
  );
}

export function NotificationItem({ content, subcontent, checked = false }) {
  return (
    <li className="flex justify-between w-full">
      <div className="flex flex-col">
        <span>{content}</span>
        <span className="text-sm opacity-50">{subcontent}</span>
      </div>
      <span><Switch checked={checked} /></span>
    </li>
  )
}


export function ProfileContent() {
  return <SectionBox variant="plain" className="flex flex-col gap-4 items-start" >
    <SectionBadge>{'<ProfileContent/>'}</SectionBadge>

    <div className="w-24 aspect-square rounded-full border border-white bg-white/25" />
    <Input placeholder="Full name" />
    <Input placeholder="Email address" />
    <Button className="px-4">Save Changes</Button>

  </SectionBox >
}

export function NotificationContent() {
  return <SectionBox variant="plain" className="flex flex-col gap-4 items-start" >
    <SectionBadge>{'<ProfileContent/>'}</SectionBadge>

    <h2 className="font-bold mt-4">Activity</h2>
    <hr className="border w-full opacity-20 border-white" />
    <NotificationItem
      content="New follower"
      subcontent={'When you get a new follower request'}
    />

    <NotificationItem
      content="Invitation"
      subcontent={'When you get an invite'}
    />

    <NotificationItem
      content="Fresh Content"
      checked={true}
      subcontent={'New content is available'}
    />


    <h2 className="font-bold mt-4">Devices</h2>
    <hr className="border w-full opacity-20 border-white" />

    <NotificationItem
      content="Email Notification"
      subcontent={'Receive notifications via email'}
    />

    <NotificationItem
      content="Push Notification"
      checked={true}
      subcontent={'Recieve notifications via Push Notification'}
    />

  </SectionBox>
}
