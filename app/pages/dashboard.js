import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 text-white flex justify-between">
        <h1 className="font-bold text-xl">Dashboard</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Logout
        </button>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-semibold">Welcome</h2>
        <p className="mt-2 text-gray-600">
          You are successfully logged in.
        </p>
      </div>
    </div>
  );
}
