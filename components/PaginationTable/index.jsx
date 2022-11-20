function Paginationtable({
  firstIndex,
  lastIndex,
  total,
  handleNextPage,
  handlePrePage,
  totalPage,
  currentPage,
}) {
  return (
    <>
      <div class="flex flex-col items-center">
        {/* Help text */}
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900">{firstIndex + 1}</span> to{" "}
          <span class="font-semibold text-gray-900 ">
            {lastIndex < total ? lastIndex : total}
          </span>{" "}
          of <span class="font-semibold text-gray-900">{total}</span> Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          {/* Buttons  */}
          <button
            class={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-l hover:bg-slate-900 ${
              currentPage === 1 && "disabled:bg-slate-300"
            }`}
            onClick={handlePrePage}
            disabled={currentPage === 1 && "disabled:bg-slate-200"}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            class={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border-0 border-l border-slate-700 rounded-r hover:bg-gray-90 ${
              currentPage === totalPage && "disabled:bg-slate-300"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPage && "disabled:bg-slate-200"}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Paginationtable;
