// provides type safety/inference
import { Form, json, Link, redirect, useNavigation } from "react-router-dom";
import { fetchContact } from "~/loaders";
import type * as Route from "./+types.contact_edit";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { EditUser, users } from "~/db/schema";

// renders after the loader is done
export default function ContactEdit({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  const navigation = useNavigation();
  console.log(contact);

  // TODO: add form
  // create the form
  return (
    <Form method="post" className="w-full max-w-lg m-8">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Name
          </label>
          <input
            defaultValue={contact.name}
            name="name"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Username
          </label>
          <input
            defaultValue={contact.username}
            name="username"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Email
          </label>
          <input
            defaultValue={contact.email}
            name="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
        <div className="w-full mt-4 ml-2 flex flex-row gap-2">
          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {navigation.state === "submitting" ? "Saving..." : "Save"}
          </button>
          {/* DELETE BUTTON */}
          <button
            type="submit"
            name="intent"
            value="delete"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          {/* CANCEL BUTTON */}
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Cancel
          </Link>
        </div>
      </div>
    </Form>
  );
}

/**
 * Fetches a contact by the given ID and returns it as a JSON response.
 *
 * @param params - The route parameters, which should contain the `id` of the contact to fetch.
 * @returns A JSON response containing the fetched contact.
 */
export async function loader({ params }: Route.LoaderArgs) {
  const contact = await fetchContact(params.id!);
  return json({ contact });
}

/**
 * Handles the form submission for the contact edit page.
 *
 * If the "intent" form field is "delete", it deletes the contact from the database and redirects to the home page.
 * Otherwise, it updates the contact in the database with the new form data and redirects to the home page.
 *
 * @param request - The incoming HTTP request.
 * @param params - The route parameters, which should contain the `id` of the contact to update or delete.
 * @returns A redirect to the home page on success, or a JSON response with an error message on failure.
 */
export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  // if the intent is delete, delete the contact
  if (intent === "delete") {
    try {
      await db.delete(users).where(eq(users.id, parseInt(params.id!)));
      return redirect("/");
    } catch (error) {
      return json({ success: false, error: (error as Error).message });
    }
  }

  // if the intent is not delete, update the contact
  const updates: EditUser = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
  };

  try {
    await db
      .update(users)
      .set(updates)
      .where(eq(users.id, parseInt(params.id!)));

    // Redirect to the home page after successful update
    return redirect("/");
  } catch (error) {
    return json({ success: false, error: (error as Error).message });
  }
}
