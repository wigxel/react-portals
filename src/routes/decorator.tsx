import { createFileRoute } from "@tanstack/react-router";
import { AutoType } from "~/components/decorator/auto-type";

export const Route = createFileRoute("/decorator")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen flex-col flex items-center justify-center">
      <div className="flex flex-col gap-1">
        <label>Enter message</label>
        <AutoType focusText="How can we help?" swapDuration={2000}>
          <textarea
            rows={10}
            className="p-2 text-base w-[400px] border rounded-lg"
            placeholder="Enter your name"
          />
        </AutoType>
      </div>
    </div>
  );
}
