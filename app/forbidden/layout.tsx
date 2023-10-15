import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вилмар | Защитен Ресурс",
  description:
    "Тази страница се показва ако потребителят се опита да достъпи защитен ресурс без да е влязал в системата.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
