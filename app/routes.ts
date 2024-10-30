/**
 * Defines the routes for the application.› 
 *
 * The `routes` array contains the following routes:
 * - The home page at the root URL (`/`)
 * - An "About" page at the `/about` URL
 * - A "Contact" page at the `/contact/:id` URL, with a route parameter for the contact ID
 * - An "Edit Contact" page at the `/contact/:id/edit` URL, also with a contact ID parameter
 * - A "Add Contact" page at the `/contact/add` URL
 *
 * Each route is defined using the `index` or `route` functions from the `@react-router/dev/routes` module, which specify the URL path and the corresponding component file.
 */
import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/contact/:contactId", "routes/contact.tsx", [
    index("routes/contact_posts.tsx"),
    route("post/:postId", "routes/post.tsx"),
  ]),
  route("/contact/:contactId/edit", "routes/contact_edit.tsx"),
  route("/contact/add", "routes/contact_add.tsx"),
];
