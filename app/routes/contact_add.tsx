import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import type * as Route from "./+types.contact_add";
import { db } from "~/db";
import { NewUser, users } from "~/db/schema";

export default function ContactAdd() {
  const navigation = useNavigation();
  const navigate = useNavigate();

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
            name="name"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane Doe"
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
            name="username"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            placeholder="janedoe"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            name="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="grid-email"
            type="email"
            placeholder="jane@example.com"
          />
        </div>
        <div className="w-full mt-4 ml-2 flex flex-row gap-2">
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {navigation.state === "submitting" ? "Adding..." : "Add Contact"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
}
/**
 * Handles the form submission for adding a new contact.
 *
 * This action function is called when the contact add form is submitted. It extracts the form data, creates a new user object, and inserts it into the database. If the insert is successful, the user is redirected to the home page. If there is an error, a JSON response is returned with the error message.
 *
 * @param {Route.ActionArgs} param0 - The route action arguments, which include the request object.
 * @returns {Promise<Response>} - A redirect to the home page if the insert is successful, or a JSON response with the error message if there is an error.
 */
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const newUser: NewUser = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
  };

  try {
    await db.insert(users).values(newUser);
    // Redirect to the home page after successful update
    return redirect("/");
  } catch (error) {
    return json({ success: false, error: (error as Error).message });
  }
}
