import React from "react";
import { Link } from "react-router-dom";
import db from "../../utils/firebase";
import { removeProduct } from "../../redux-store/actions/productsActions";
import { connect } from "react-redux";
function ProductCard({
  data: { id, name, price, description, imageUrl, owner },
  user: { uid },
  removeProduct,
}) {
  return (
    <div className='col-md-4 col-sm-6'>
      <div className='card my-3'>
        <img className='card-img-top' alt='prod' src={imageUrl} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
          <h4 className='card-text text-primary pb-2'>${price}</h4>
          {owner === uid && (
            <div>
              <Link to={`/${id}/edit-product`} className='btn btn-primary mx-2'>
                Edit
              </Link>
              <button
                className='btn btn-danger btn-md mx-2'
                onClick={(e) => {
                  db.collection("products")
                    .doc(id)
                    .delete()
                    .then((res) => removeProduct(id))
                    .catch((error) => console.log(error));
                }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (id) => dispatch(removeProduct(id)),
  };
};
export default connect(null, mapDispatchToProps)(ProductCard);
