import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

type Props = {
  sseUrl: string;
  transportType: "stdio" | "sse" | "streamable-http";
  command?: string;
  args?: string;
  connectionStatus?: ConnectionStatus;
  connectionType?: "direct" | "proxy";
};
const SidebarShare = ({
  sseUrl,
  transportType,
  command,
  args,
  connectionStatus,
  connectionType,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const u = new URL(location.origin + "/inspector");
    u.searchParams.set("serverUrl", sseUrl);
    u.searchParams.set("transport", transportType);
    if (transportType === "stdio") {
      u.searchParams.set("serverCommand", command || "");
      u.searchParams.set("serverArgs", args || "");
    }

    navigator.clipboard.writeText(u.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("mt-5", {})}>
      <Button
        variant={
          connectionType == "direct" &&
          connectionStatus == "connected" &&
          sseUrl
            ? "default"
            : "outline"
        }
        onClick={handleCopy}
        className="w-full"
      >
        {copied ? (
          <CheckCheck className="h-4 w-4 mr-2" />
        ) : (
          <Copy className="h-4 w-4 mr-2" />
        )}
        Copy Shareable Link
      </Button>
    </div>
  );
};

export default SidebarShare;
