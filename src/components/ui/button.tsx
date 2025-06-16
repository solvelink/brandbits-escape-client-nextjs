"use client";

import * as Headless from "@headlessui/react";
import { forwardRef } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";

const styles = {
  base: [
    "h-14 text-base px-8 rounded-full text-center font-medium flex justify-center items-center",
    "data-disabled:bg-gray-100 data-disabled:text-gray-200",
  ],
  colors: {
    turquoise: ["bg-turquoise text-white"],
    purple: ["bg-purple text-white"],
    "purple/outline": ["bg-transparent text-purple border border-purple"],
  },
  error: [
    "bg-red text-white animate-shake",
    "data-disabled:bg-red/50 data-disabled:text-white/50",
  ],
};

type ButtonProps = {
  color?: keyof typeof styles.colors;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  children: React.ReactNode;
} & (
  | Omit<Headless.ButtonProps, "as" | "className" | "disabled">
  | Omit<React.ComponentProps<typeof Link>, "className">
);

export const Button = forwardRef(
  (
    { color, className, disabled, error, children, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const classes = clsx(
      className,
      styles.base,
      error ? styles.error : styles.colors[color ?? "turquoise"]
    );

    const onDisabledClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      target.classList.add("animate-shake");
      setTimeout(() => {
        target.classList.remove("animate-shake");
      }, 600);
    };

    if ("href" in props) {
      return (
        <Link
          {...props}
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          data-disabled={disabled ? "true" : undefined}
          onClick={(e) => {
            if (disabled) {
              onDisabledClick(e);
            }
          }}
        >
          {children}
        </Link>
      );
    }
    return (
      <Headless.Button
        {...props}
        className={clsx(classes, "cursor-default")}
        ref={ref}
        data-disabled={disabled ? "true" : undefined}
        onClick={(e) => {
          if (disabled) {
            onDisabledClick(e);
          } else {
            props.onClick?.(e);
          }
        }}
      >
        {children}
      </Headless.Button>
    );
  }
);
