import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
