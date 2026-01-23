interface TaskMeta {
  assignedToEmail: string;
  createdByEmail: string;
  createdAt: Date;
}

export default function TaskMeta({
  assignedToEmail,
  createdByEmail,
  createdAt,
}: TaskMeta) {
  return (
    <div className="w-md my-2 px-6 py-2 rounded">
      <p className=" text-gray-500">Assigned to {assignedToEmail}</p>
      <p className="mt-2 text-gray-500">Created by {createdByEmail}</p>
      <p className="mt-2 text-gray-500">
        Created at {createdAt.toLocaleDateString()}
      </p>
    </div>
  );
}
