import { json, Link, useParams, type MetaFunction } from "react-router";
import type * as Route from "./+types.post";
import { fetchPost, fetchPostsByContact } from "~/loaders";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function ContactPost({ loaderData }: Route.ComponentProps) {
  const { postId } = useParams();
  const post = loaderData.post;
  return (
    <div>
      <div
        className="flex flex-col gap-2 px-2 py-2 border-b last:border-b-0 "
        key={post.id}
      >
        <div className="flex-1 no-underline my-auto">{post.title}</div>
        <div className="flex-1 no-underline my-auto">{post.content}</div>
      </div>
      <div className="flex gap-2  mt-2 flex-row-reverse">
        <Link
          to={`/contact/${post.authorId}`}
          className="bg-gray-500 hover:bg-gray-700 text-white text-xs py-2 px-4 rounded"
        >
          Back To Post List
        </Link>
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
  const post = await fetchPost(params.postId!);
  return json({ post });
}
