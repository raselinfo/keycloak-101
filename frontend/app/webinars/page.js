import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAccessToken } from "../../utils/sessionTokenAccessor";
import { SetDynamicRoute } from "@/utils/setDynamicRoute";

async function getAllWebinars() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/webinars`;

  let accessToken = await getAccessToken();

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  }

  throw new Error("Failed to fetch data. Status: " + resp.status);
}

export default async function Webinars() {
  const session = await getServerSession(authOptions);

  if (session && session.roles?.includes("user")) {
    // console.log(">>>session", session);
    try {
      const webinars = await getAllWebinars();
      return (
        <main>
          <SetDynamicRoute></SetDynamicRoute>
          <h1 className="text-4xl text-center">Webinars</h1>
          <table className="border border-gray-500 text-lg ml-auto mr-auto mt-6">
            <thead>
              <tr>
                <th className="bg-blue-900 p-2 border border-gray-500">Id</th>
                <th className="bg-blue-900 p-2 border border-gray-500">Name</th>
                <th className="bg-blue-900 p-2 border border-gray-500">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {webinars.webinars.map((w) => (
                <tr key={w.Id}>
                  <td className="p-1 border border-gray-500">{w.id}</td>
                  <td className="p-1 border border-gray-500">{w.name}</td>
                  <td className="p-1 border border-gray-500">{w.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      );
    } catch (err) {
      console.error(err);

      return (
        <main>
          <h1 className="text-4xl text-center">Webinars</h1>
          <p className="text-red-600 text-center text-lg">
            Sorry, an error happened. Check the server logs.
          </p>
        </main>
      );
    }
  }

  redirect("/unauthorized");
}
