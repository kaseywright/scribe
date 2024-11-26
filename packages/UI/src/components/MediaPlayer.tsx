import * as React from "@theia/core/shared/react";
import { Badge } from "./ui/Badge";
import { IconSettings } from "@tabler/icons-react";
import Button from "./Button";
import { cn } from "../utils/clsx";

interface MediaPlayerProps {
  type: "image" | "video";
  source: string;
}

const MediaPlayer = ({ type, source }: MediaPlayerProps) => {
  return (
    <div className="media-player">
      <div
        className={cn(
          type === "image" ? "border-b mb-2" : "border-t  my-2  border-b",
          "flex items-center py-2.5 px-2 dark:border-zinc-800 border-zinc-200 justify-between"
        )}
      >
        <Badge variant="destructive">NTV</Badge>
        <div className="flex items-center gap-[5px]">
          <Button label="Mark" />
          <Button label="1" />
          <Button
            icon={<IconSettings size={14} stroke={2} strokeLinejoin="miter" />}
          />
        </div>{" "}
      </div>
      {type === "image" ? (
        <img src={source} alt="Media content" className="w-full h-[25vh]" />
      ) : (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${source}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default MediaPlayer;
