import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
const {option} = Select


const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([ ])
  const [name, setName] = useState(" ")
  const [category, setcategory] = useState(" ")
  const [description, setDescription] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [quantity, setquantity] = useState(" ");
  const [shipping, setshipping] = useState(" ");
  const [photo, setphoto] = useState(" ");


   //get all categories
   const getAllcategory = async () => {
    try{
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.category);
      }
    }catch(error){
      console.log(error)
       toast.error('something went wrong in getting category')
    }
  };

  useEffect(() => {
    getAllcategory();
 }, [])

 //create product function
  const  handleCreate= async (e) => {
     e.preventDefault()
     try{
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("category", category)
      productData.append("photo", photo)
      const {data} = axios.post('/api/v1/product/create-product', productData )
      if(data?.success){
            toast.error(data?.mesaage)
      }else{
        toast.success('product created successfuly')
        navigate('/dashboard/admin/products')
      }
     }
     catch(error){
      console.log(error)
      toast.error(['something went wrong'])
     }
  };


  return (
  <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3">

      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
                </div>
                <div className="col-md-9">
                 <h1>Create Product</h1>
                 <div className = "m-1 w-75">
                    <select bordered= {false} 
                    placeholder= "select a category" 
                    size= "large" 
                    showSearch className= "form-select mb-3" onchange= {(value) => {setcategory(value)} }>
                      {categories?.map(c => (
                        <option key={c._id} value={c._id}>
                        {c.name}</option>
                      ))}
                    </select>
                  <div className="mb-3">
                    <label className="btn btn-secondary col-md-12">
                      {photo ? photo.name : "upload photo"}
                    <input type="file" 
                    name="photo" 
                    accept="image/*" 
                    onchange={(e) => setphoto(e.target.files[0])} 
                    hidden/>
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                          <img src={URL.createObjectURL(photo)} 
                          alt="product-photo" height={'200p'} 
                          className="img img-responsive" />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input type="text" 
                    value={name} placeholder="write a name" 
                    className="form-control"  
                    onchange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="text" 
                    value={description} placeholder="write a description" 
                    className="form-control"  
                    onchange={(e) => setDescription(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="number" 
                    value={price} 
                    placeholder="write a price" 
                    className="form-control"  
                    onchange={(e) => setPrice(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="number" 
                    value={quantity} 
                    placeholder="write a quantity" 
                    className="form-control"  
                    onchange={(e) => setquantity(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <select
                      bordered={false} 
                      placeholder="select shipping" 
                      size="large"
                      showSearch
                      className="form-select mb-3"  
                      onchange={(value) => { setshipping(value)
                      }}
                      >
                       <option value="0">No</option>
                       <option value="1">Yes</option>
                      </select>
                  </div>
                  <div className="mb-3">
                     <button className="btn btn-primary" onClick={handleCreate} >CREATE PRODUCT</button>
                  </div>
                 </div>
                </div>
                </div>
            </div>
  </Layout>
  )
}

export default CreateProduct
