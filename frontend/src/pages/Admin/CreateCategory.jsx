import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import categoryFrom from "../../components/Form/categoryForm";

const CreateCategory = () => {
  const [categories,setCategories] = useState([]);
   const [name, setName] = useState("")
   const [visible, setvisible] = useState(false)
   const [selected, setSelected] =useState(null);
   const [updatedName, setupdatedName] = useState("")
   //handleForm
   const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if(data?.success) {
        toast.success(`${name} is created`);
        getAllcategory; 
      }else {
        toast.error(data.message);
      }
    }
    catch(error) {
      console.log(error)
      toast.error('something went wrong in input From')
    }
   }
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

//update category
const handleupdate = async (e ) => {
  e.preventDefault()
  try{
    const {data} = await axios.put(`/api/v1/category/update-category/${selected_id}`, {name:updatedName})
    if(data.success){
      toast.success(`${updatedName} is  updated`)
      setSelected(null)
      setupdatedName("")
      setvisible(false)
      getAllcategory();
    }else{
      toast.error(data.message)
    }
  }catch(error){
  toast.error('something went wrong')
  }
};
//delete category
const handledelete = async (pId) => {
  try{
    const {data} = await axios.delete(
      `/api/v1/category/delete-category/${pId}`,
    );
    if(data.success){
      toast.success(`category is  deleted`);
      getAllcategory();
    }else{
      toast.error(data.message)
    }
  }catch(error){
  toast.error('something went wrong')
  }
};
    
  return (
   <Layout title={"Dashboard - Create Category"}>
    <div className="container-fluid m-3 p-3">

      <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
                </div>
                <div className="col-md-9">
                 <h1>Manage Category</h1>
                 <div className ='p-3'>
                     <categoryFrom handleSubmit = {handleSubmit} 
                     value = {name} 
                     setvalue= {setName}
                     />
                 </div>
                 <div className = "w-75">
                      <table className="table">
                        <thead>
                         <tr>
                            <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                         </tr>
                       </thead>
                       <tbody>
                           {categories?.map( c => (
                           <>
                           <tr> 
                           <td key={c._id}>{c.name}</td>  
                           <td>
                           <button className = "btn btn-primary ms-2" 
                           onClick={() => {
                            setvisible(true); 
                            setupdatedName(c.name);
                            setSelected(c);
                          }}
                           >
                            Edit</button>
                           <button className = "btn btn-danger ms-2" onClick={() => {handledelete(c._id)} }>
                            Delete</button>
                           </td>
                           </tr> 
                           </>  
                           ))} 
                       </tbody>   
                      </table>
                 </div>
                 <modal oncancel={() => setvisible(false)} 
                 footer={null} 
                 visible={visible}
                 >
                <categoryFrom value={updatedName} setvalue={setupdatedName} handleSubmit={handleupdate}/>
                 </modal>
                 </div>
                 </div>
             </div>
    </Layout>
  )
}

export default CreateCategory
