import Link from "next/link";

export default function Nav() {
  return (
    <ul className="mt-3">
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/">
          Home
        </Link>
      </li>
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/webinars">
          Webinars
        </Link>
      </li>
      <li className="my-1">
        <Link className="hover:bg-gray-500" href="/webinars/create">
          Create Webinar
        </Link>
      </li>
    </ul>
  );
}
