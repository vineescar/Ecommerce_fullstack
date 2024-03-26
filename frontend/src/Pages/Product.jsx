import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  //const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch('http://localhost:4000/allproducts') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])
    

    console.log('All Products:', allproducts);
   console.log('Products ID:', productId); // Log all products to the console

  // Check if products is not undefined or null before using find
  const product = allproducts && allproducts.find((e) => e.id === Number(productId));

  if (!product) {
    // Handle the case when the product with the specified ID is not found
    return <p>Product not found</p>; // You can replace this with your own error handling or redirection logic
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
