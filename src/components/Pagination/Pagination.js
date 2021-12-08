import "./Pagination.css";

const Pagination = ({ currentPage, pagesCount, setCurrentPage }) => {
  const arrPusher = (start, stop) => {
    const arrBtns = [];
    for (let i = start; i <= stop; i++) {
      arrBtns.push(
        <div
          id={i}
          key={i}
          className={`pagination-btn-page ${i === currentPage ? "pagination-btn-page-cur" : undefined
            }`}
          onClick={() => setCurrentPage(i)}
        >
          <span>{i}</span>
        </div>
      );
    }
    return arrBtns;
  };

  const pageCounter = () => {
    const maxCountOfPage = 7;
    const midleOfNumeration = Math.floor(maxCountOfPage / 2);
    if (pagesCount <= maxCountOfPage || currentPage <= midleOfNumeration) {
      return pagesCount <= maxCountOfPage
        ? arrPusher(1, pagesCount)
        : arrPusher(1, maxCountOfPage);
    } else {
      const startCounting = currentPage - midleOfNumeration;
      const endCounting = currentPage + midleOfNumeration;
      return arrPusher(startCounting, endCounting);
    }
  };

  const changePage = (dir) => {
    switch (dir) {
      case "prev":
        if (currentPage > 1) {
          setCurrentPage((page) => page - 1);
        }
        break;
      case "next":
        if (currentPage < pagesCount) {
          setCurrentPage((page) => page + 1);
        }
        break;
      default:
        return;
    }
  };

  return (
    <section>
      <div className="pagination">
        <div
          className="pagination-btn-control"
          onClick={() => changePage("prev")}
        >
          <svg
            width="64"
            version="1.1"
            height="64"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
          >
            <g>
              <g fill="#68a0f5bd">
                <path d="m38.719,14.973c-0.781-0.781-2.046-0.781-2.828,0l-15.879,15.88c-0.207,0.204-0.375,0.481-0.477,0.755-0.266,0.73-0.086,1.551 0.465,2.102l15.879,15.879c0.391,0.392 0.902,0.586 1.414,0.586s1.023-0.194 1.415-0.586c0.78-0.781 0.78-2.046 0-2.827l-14.473-14.477 14.483-14.484c0.782-0.781 0.782-2.047 0.001-2.828z" />
                <path d="m32,.021c-17.645,0-32,14.354-32,32 0,17.645 14.355,32 32,32s32-14.355 32-32c0-17.645-14.355-32-32-32zm0,60c-15.438,0-28-12.561-28-28s12.562-28 28-28c15.439,0 28,12.561 28,28s-12.561,28-28,28z" />
              </g>
            </g>
          </svg>
        </div>
        <div className="pagination-pages">{pageCounter()}</div>
        <div
          className="pagination-btn-control"
          onClick={() => changePage("next")}
        >
          <svg
            width="64"
            version="1.1"
            height="64"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
          >
            <g>
              <g fill="#68a0f5bd">
                <path d="m28.154,14.479c-0.781-0.781-2.046-0.781-2.825,0-0.781,0.78-0.781,2.045 0,2.824l14.46,14.463-14.473,14.47c-0.78,0.78-0.78,2.045 0,2.826 0.391,0.389 0.901,0.584 1.413,0.584 0.511,0 1.022-0.195 1.413-0.584l15.866-15.865c0.218-0.22 0.394-0.516 0.491-0.811 0.24-0.718 0.053-1.51-0.481-2.045l-15.864-15.862z" />
                <path d="M32.029,0.059C14.401,0.059,0.059,14.4,0.059,32.029S14.401,64,32.029,64S64,49.658,64,32.029    S49.657,0.059,32.029,0.059z M32.029,60.004c-15.425,0-27.975-12.549-27.975-27.975S16.604,4.055,32.029,4.055    s27.975,12.549,27.975,27.975S47.454,60.004,32.029,60.004z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
