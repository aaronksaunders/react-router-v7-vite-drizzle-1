import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { fetchUsers } from "~/loaders";
import type * as Route from "./+types.home";
import { User } from "~/db/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

/**
 * Fetches the list of users and returns them as the loader data.
 *
 * @returns {Promise<{ users: User[] }>} The loader data containing the list of users.
 */
export const loader = async () => {
  const users = await fetchUsers();
  return { users };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <div className="m-4">
      <div>
        {/* LIST USERS */}
        <h1 className="text-xl font-bold">Contacts</h1>
        <div className="flex flex-row gap-2  my-2">
          <Link
            to="/contact/add"
            className="bg-green-500 hover:bg-green-700 text-white text-xs py-2 px-4 rounded"
          >
            Add New Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {loaderData.users.map((user: User) => (
            <div
              className="flex flex-row gap-2 border rounded px-2 py-2"
              key={user.id}
            >
              <Link className="no-underline my-auto" to={`/contact/${user.id}`}>
                {user.name}
              </Link>
              <Link
                className="text-xs no-underline rounded bg-blue-500 hover:bg-blue-700 text-white py-1 px-2"
                to={`/contact/${user.id}/edit`}
                key={user.id}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
