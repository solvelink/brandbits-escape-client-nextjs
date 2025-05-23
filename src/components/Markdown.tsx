import ReactMarkdown from "react-markdown";
import clsx from "clsx";

export const Markdown = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className={clsx("rich-text flex flex-col gap-4", className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};
