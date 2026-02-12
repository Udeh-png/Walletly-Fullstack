import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sign-up");
  return <div></div>;
}
