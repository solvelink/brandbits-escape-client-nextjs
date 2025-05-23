import * as Headless from "@headlessui/react";
import { Link, LinkProps } from "react-router";
import { forwardRef } from "react";
import clsx from "clsx";

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
};

type ButtonProps = {
  color?: keyof typeof styles.colors;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
} & (
  | Omit<Headless.ButtonProps, "as" | "className" | "disabled">
  | Omit<LinkProps, "className">
  | { href: string }
);

export const Button = forwardRef(
  (
    { color, className, disabled, children, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const classes = clsx(
      className,
      styles.base,
      styles.colors[color ?? "turquoise"]
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
