import { useParams, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function Contact() {
  const { id } = useParams();
  return (
    <div>
      <h1>Contact {id}</h1>
    </div>
  );
}
