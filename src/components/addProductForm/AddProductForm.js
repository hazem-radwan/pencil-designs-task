import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../utils/validations/schema";
import { useHistory } from "react-router-dom";
import db, { uploadImage } from "../../utils/firebase";
import "./AddProductForm.css";

function AddProductForm({ user: { uid } }) {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  // on file Change method
  const onFileChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      return;
    }
    setImage(null);
  };
  // submitting from
  const onSubmit = (data) => {
    setSubmitting(true);
    if (!image) {
      setSubmitting(false);
      return;
    }
    /// upload file progress and saving doc to db ;
    uploadImage(image, (url) => {
      const productData = { ...data, owner: uid, imageUrl: url };
      saveToDB(productData);
    });
  };
  // saving date to db
  const saveToDB = (data) => {
    db.collection("products")
      .add({ ...data })
      .then(() => {
        console.log("product created sucessfully");
        reset();
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='container align-left'>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className='col-md-4 mt-4'>
          <h2 className='text-primary py-4'>Add Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group mt-4'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Product Name'
                {...register("name")}
              />
              {errors.name && (
                <p className='text-danger'>{errors.name.message}</p>
              )}
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='price'>Price</label>
              <input
                name='price'
                type='number'
                min='1'
                className='form-control'
                placeholder='please add product price'
                {...register("price")}
              />
              {errors.price && (
                <p className='text-danger'>{errors.price.message}</p>
              )}
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='image-upload'>Upload Image</label>
              <input
                type='file'
                className='form-control'
                name='file-upload'
                accept='image/x-png,image/jpeg'
                onChange={(event) => {
                  onFileChange(event);
                }}
              />
              {!image && (
                <p className='text-secondary'>This field is required</p>
              )}
            </div>

            <div className='form-group mt-4'>
              <label htmlFor='description'>Description</label>
              <textarea
                name='description'
                type='text'
                className='form-control'
                placeholder="please add product's description"
                {...register("description")}
              />
              {errors.description && (
                <p className='text-danger'>{errors.description.message}</p>
              )}
            </div>
            <div className='form-group align-center mt-4'>
              <button
                disabled={submitting}
                type='submit'
                className='btn btn-primary btn-md'>
                Create new Product
              </button>
            </div>
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}

export default AddProductForm;
