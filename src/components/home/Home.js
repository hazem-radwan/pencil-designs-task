import React, { useEffect } from "react";
import dbInstance from "../../utils/firebase";
import ProductCard from "../shared/productCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../../redux-store/actions/productsActions";
function Home({ user, products, setProducts }) {
  useEffect(() => {
    dbInstance
      .collection("products")
      .get()
      .then((snapShot) => {
        const data = snapShot.docs.map((doc) => {
          const newDoc = { id: doc.id, ...doc.data() };
          console.log(newDoc);
          return newDoc;
        });
        setProducts([...data]);
      })
      .catch((e) => console.log(e));
  }, [setProducts]);
  return (
    <div className='container'>
      <h2 className='text-left mt-4 pt-4 text-primary'>Products</h2>
      <div className='row'>
        <Link to='/add-product' className='btn btn-primary btn-md'>
          Add New Product
        </Link>
      </div>
      <div className='row mt-4'>
        {products.map((product) => (
          <ProductCard user={user} key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = ({ products }) => {
  return {
    products: products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (payload) => dispatch(setProducts(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
