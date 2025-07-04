import React from 'react';
import '../componentsStyles/NoProducts.css';

const NoProducts = ({ keyword }) => {
    return (
        <div className="no-products-container">
            <div className="no-products-content">
                <div className="no-products-icon" role="img" aria-label="warning emoji">
                    ⚠️
                </div>
                <h3 className="no-products-title">No Products Found</h3>
                <p className="no-products-message">
                    {keyword
                        ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.`
                        : "No products are currently available. Please check back later."
                    }

                    
                </p>
            </div>
        </div>
    );
};

export default NoProducts;
