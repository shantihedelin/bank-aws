import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-gray-900">Nova Bank</h1>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to Nova Bank!
        </h2>
        <p className="text-gray-700">
          Nova Bank is a simple banking application that allows you to manage
          your accounts and transactions.
        </p>

        <Link href={"/register"}>
          <button className="no-underline w-40 h-12 text-slate-800 border border-solid p-2 border-gray-400 rounded-2xl bg-white shadow-md hover:underline cursor-pointer">
            <p className="m-0 text-md">Create account</p>
          </button>
        </Link>
      </div>
    </main>
  );
}
