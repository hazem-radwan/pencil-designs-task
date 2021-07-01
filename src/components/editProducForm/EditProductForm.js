import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../utils/validations/schema";
import { useHistory, useParams } from "react-router-dom";
import db, { deleteImage, uploadImage } from "../../utils/firebase";
function EditProductForm({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const newDoc = doc.data();
        setProduct(newDoc);
        Object.keys(newDoc).forEach((key) => {
          setValue(key, newDoc[key]);
        });
      })
      .catch((e) => console.log(e));
  }, [id, setValue]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    if (image) {
      deleteImage(product.imageUrl);
      uploadImage(image, (url) => {
        console.log(url);
        updateProduct({ ...data, owner: user.uid, imageUrl: url });
      });
    } else
      updateProduct({ ...data, owner: user.uid, imageUrl: product.imageUrl });
  };
  const onFileChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      return;
    }
    setImage(null);
  };
  function updateProduct(data) {
    db.collection("products")
      .doc(id)
      .set({
        ...data,
      })
      .then(() => {
        reset();
        console.log("product updated successfully ");
        history.push("/");
      })
      .catch((e) => {
        setIsSubmitting(false);
        console.log(e);
      });
  }
  return (
    <div className='container align-left'>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className='col-md-4 mt-4'>
          <h2 className='text-primary py-4'>Edit Product</h2>
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
                className='form-control'
                placeholder='please set price image'
                {...register("price")}
              />
              {errors.password && (
                <p className='text-danger'>{errors.password.message}</p>
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
              {/* {!image && (
                <p className='text-secondary'>This field is required</p>
              )} */}
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
                disabled={isSubmitting}
                type='submit'
                className='btn btn-primary btn-md'>
                Edit Product
              </button>
            </div>
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}

export default EditProductForm;
