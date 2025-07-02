import React from 'react';
import '../componentsStyles/Pagination.css'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="pagination">
            <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    className={`pagination-btn ${num === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(num)}
                >
                    {num}
                </button>
            ))}

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
