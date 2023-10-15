import { Routes } from "@/lib/constants";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="p-10">
      <div className="wrapper">
        <p className="mb-5 text-lg">
          За да достъпите тази страница трябва да сте влезли в системата с
          активен акаунт.
        </p>
        <Link className="text-3xl text-blue-500" href={Routes.LOGIN}>
          Вход в системата
        </Link>
      </div>
    </main>
  );
}
