import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'

import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Layout/Routes/Private.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import AdminRoute from './components/Layout/Routes/AdminRoute.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import CreateCategory from './pages/Admin/CreateCategory.jsx'
import CreateProduct from './pages/Admin/createProduct.jsx'
import Users from './pages/Admin/Users.jsx'
import Orders from './pages/user/Orders.jsx'
import Profile from './pages/user/Profile.jsx'


function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path ="user" element={<Dashboard/>}/>
      <Route path ="user/orders" element={<Orders/>}/>
      <Route path ="user/profile" element={<Profile/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
    <Route path='/admin' element={<AdminDashboard/>}/>
    <Route path='/admin/create-category' element={<CreateCategory/>}/>
    <Route path='/admin/create-product' element={<CreateProduct/>}/>
    <Route path='/admin/users' element={<Users/>}/>
    </Route>
    <Route path='/register' element={<Register/>} />
    <Route path='/forgot-password' element={<ForgotPassword/>} />

    <Route path='/login' element={<Login/>} />
    <Route path='about' element={<About/>} />
    <Route path='contact' element={<Contact/>} />
    <Route path='policy' element={<Policy/>} />
    <Route path='*' element={<Pagenotfound/>} />
   </Routes>

    </>
      
          
  )
}

export default App;
