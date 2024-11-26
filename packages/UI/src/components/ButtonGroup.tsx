import React from "@theia/core/shared/react";
import Button from "./Button"; // Adjust the import path as necessary
import {
  IconMicrophone,
  IconPhoto,
  IconMapPin,
  IconVideo,
} from "@tabler/icons-react";

interface ButtonConfig {
  icon?: any;
  className?: string;
  label?: string;
}

interface ButtonGroupProps {
  buttons: ButtonConfig[];
}

const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
  return (
    <div className="flex items-center gap-[10px] p-1">
      {buttons.map((button, index) => (
        <Button
          key={index}
          size="icon"
          className={button.className}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </div>
  );
};

const buttonGroups = [
  [
    {
      icon: <IconMicrophone size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
    },
    {
      icon: <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
    },
    {
      icon: <IconMapPin size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
    },
  ],
  [
    {
      icon: <IconMicrophone size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
    },
    {
      icon: <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
    },
    {
      icon: <IconMapPin size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
    },
  ],
  [
    {
      icon: <IconMicrophone size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
    },
    {
      icon: <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
    },
    {
      icon: <IconMapPin size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
    },
    {
      icon: <IconVideo size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-fuchsia-700 rounded-lg bg-fuchsia-400 hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600",
    },
  ],
  [
    {
      label: "Mark",
    },
  ],
  [
    {
      icon: <IconVideo size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-zinc-900 rounded-lg bg-zinc-300 hover:bg-zinc-400 dark:hover:bg-zinc-800",
    },
    {
      icon: <IconMicrophone size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
    },
    {
      icon: <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
    },
    {
      icon: <IconMapPin size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-700",
    },
  ],
  [
    {
      icon: <IconMicrophone size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
    },
    {
      icon: <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
    },
    {
      icon: <IconMapPin size={12} stroke={2} strokeLinejoin="miter" />,
      className:
        "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
    },
  ],
];

const ButtonGroups = () => {
  return (
    <div className="flex items-center justify-center gap-x-10">
      {buttonGroups.map((buttons, index) => (
        <ButtonGroup key={index} buttons={buttons} />
      ))}
    </div>
  );
};

export default ButtonGroups;
