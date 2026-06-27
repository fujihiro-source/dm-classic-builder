import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-700">
        DM Classic Builder
      </h1>

      <p className="mt-4 text-lg text-gray-700">
        2005年までのデュエル・マスターズ デッキビルダー
      </p>

      <Link
        href="/deck/new"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        新しいデッキ
      </Link>

      <p className="mt-10 text-gray-500">
        まだデッキはありません
      </p>
    </main>
  );
}