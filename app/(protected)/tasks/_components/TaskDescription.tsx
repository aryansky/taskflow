import clsx from "clsx";

export default function TaskDescription({
  taskDescription,
  className,
}: {
  taskDescription: string;
  className?: string;
}) {
  return (
    <p className={clsx(className)}>
      {taskDescription || "No description provided."}
    </p>
  );
}
