import { Link } from "react-router-dom";

// icons
import {
  UilEllipsisV,
  UilEditAlt,
  UilTrashAlt,
  UilSignout,
} from "@iconscout/react-unicons";

const Dropdown = () => {
  return (
    <>
      <div className="hs-dropdown relative inline-flex [--placement:left-top] rtl:[--placement:right-top]">
        <button
          id="hs-dropright"
          type="button"
          className="hs-dropdown-toggle rounded"
        >
          <UilEllipsisV size={16} />
        </button>
        <div
          className="hs-dropdown-menu transition-[opacity,margin] w-40 duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow rounded py-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-600"
          aria-labelledby="hs-dropright"
        >
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            to=""
          >
            <UilEditAlt size={14} className="me-1" />
            <span>Edit</span>
          </Link>
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            to=""
          >
            <UilSignout size={14} className="me-1" />
            <span>Refresh</span>
          </Link>
          <hr className="my-2 dark:border-gray-600" />
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded text-sm text-danger hover:bg-gray-100 dark:hover:bg-gray-700"
            to=""
          >
            <UilTrashAlt size={14} className="me-1" />
            <span>Delete</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
