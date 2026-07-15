export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;
  return (
    <div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => (
            <button
              className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
