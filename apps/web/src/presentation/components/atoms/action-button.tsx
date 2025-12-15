import { ReactNode } from "react";

import { cn } from "@/presentation/utils/cn";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  children: ReactNode;
}

export const ActionButton = ({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: ActionButtonProps) => {
  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:scale-[1.02] active:scale-95",
    secondary:
      "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50",
    ghost: "text-primary-600 hover:bg-primary-50 text-sm font-semibold",
  };

  return (
    <button
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-all",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
