import Link from "next/link";
import React from "react";

export default function InvalidAddress() {
  return (
    <main className="wrapper py-10">
      <h1>Невалиден линк</h1>
      <Link className="link" href="/">
        Обратно към началната страница
      </Link>
    </main>
  );
}
