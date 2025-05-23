import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";
import { Link, LinkProps } from "react-router";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
} & (
  | Omit<Headless.ButtonProps, "as" | "className" | "disabled">
  | Omit<LinkProps, "className">
  | { href: string }
);

export const CircleButton = forwardRef(
  (
    { className, disabled, children, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const classes = clsx(
      className,
      "w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 border-purple"
    );

    if ("to" in props) {
      return (
        <Link
          {...props}
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }
    if ("href" in props) {
      return (
        <a
          {...props}
          className={classes}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Headless.Button
        {...props}
        className={clsx(classes, "cursor-default")}
        ref={ref}
        data-disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            const target = e.target as HTMLElement;
            target.classList.add("animate-shake");
            setTimeout(() => {
              target.classList.remove("animate-shake");
            }, 600);
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
