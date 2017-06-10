import React from 'react';

const ProductPreview = ({ design, currentProduct }) => (
  <div>
    <h1>{design.name}</h1>
    <img className="img-thumbnail" alt="Product" src={currentProduct.imageUrl || design.imageUrl} />
  </div>
);

export default ProductPreview;
