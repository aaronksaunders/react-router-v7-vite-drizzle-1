import { json, Link, Outlet, useParams, type MetaFunction } from "react-router";
import type * as Route from "./+types.contact";
import { fetchContact } from "~/loaders";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function Contact({ loaderData }: Route.ComponentProps) {
  const { id } = useParams();
  const contact = loaderData.contact;
  console.log("contact", contact);
  return (
    <div className="m-4">
      <h1 className="text-xl font-bold">Contact Listing</h1>
      <div className="flex">
        <div className="my-auto flex-1">
          This is the contact page for {contact.name}
        </div>
        <Link
          to={`/`}
          className="text-xs bg-slate-500 text-white my-auto py-2 px-4 rounded"
        >
          Back To Contacts
        </Link>
      </div>
      <div className="border border-gray-500 p-2 mt-2 rounded">
        <Outlet />
      </div>
    </div>
  );
}

/**
 * Fetches a contact by the given ID and returns it as a JSON response.
 *
 * @param params - The route parameters, which should contain the `id` of the contact to fetch.
 * @returns A JSON response containing the fetched contact.
 */
export async function loader({ params }: Route.LoaderArgs) {
  console.log("contact loader");
  const contact = await fetchContact(params.contactId!);
  return json({ contact });
}
