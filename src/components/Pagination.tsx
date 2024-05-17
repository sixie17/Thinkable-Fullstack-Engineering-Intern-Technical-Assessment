import Link from "next/link";

function Pagination({
  pageSize,
  currentPage,
  setPage,
}: {
  pageSize: number;
  currentPage: number;
  setPage: (page: number) => void;
}) {
  const numbers = Array.from({ length: pageSize }, (_, index) => index + 1);

  return (
    <nav aria-label="pagination" className="mx-auto my-20 container">
      <ul className="mx-auto flex flex-wrap gap-x-5 gap-y-7 justify-center">
        {currentPage === 1 ? null : (
          <li className="block">
            <button
              onClick={() => setPage(currentPage - 1)}
              className="px-3 py-2 rounded-md leading-tight bg-white hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
          </li>
        )}
        {numbers.map((number) => (
          <li key={number} className="block">
            <button
              onClick={() => {
                setPage(number);
              }}
              className={`px-3 py-2 leading-tight  hover:bg-blue-200 border-transparent border rounded-lg text-black  dark:text-white mx-2 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === number
                  ? "text-white bg-blue-500 dark:bg-blue-500"
                  : " dark:bg-gray-800 dark:bg-opacity-70"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage === pageSize ? null : (
          <li className="block">
            <button
              onClick={() => setPage(currentPage + 1)}
              className="px-3 py-2 rounded-md leading-tight bg-white hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Pagination;
