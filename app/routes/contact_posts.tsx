import { json, Link, useParams, type MetaFunction } from "react-router";
import type * as Route from "./+types.contact_posts";
import { fetchPostsByContact } from "~/loaders";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function ContactPosts({ loaderData }: Route.ComponentProps) {
  const { contactId } = useParams();
  const posts = loaderData.posts;
  return (
    <div>
      <div>
        {posts.map((post: any) => (
          <div
            className="flex flex-col gap-2 px-2 py-2 border-b-2 last:border-b-0 hover:bg-gray-200 hover:cursor-pointer"
            key={post.id}
          >
            <Link
              className="no-underline my-auto"
              to={`/contact/${contactId}/post/${post.id}`}
            >
              <div className="flex-1 no-underline my-auto">{post.title}</div>
              <div className="flex-1 no-underline my-auto">{post.content}</div>
            </Link>
          </div>
        ))}
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
  console.log("contact_posts loader");
  const posts = await fetchPostsByContact(params.contactId!);
  return json({ posts });
}
