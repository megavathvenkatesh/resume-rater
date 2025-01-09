import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import HomeLayout from './Pages/HomeLayout'
import Error from './Pages/Error'
import Landing from './Pages/Landing'
import Register from './Pages/Register'
import Login from './Pages/Login'
import DashBoard from './Pages/DashboardLayout'
import AllJobs from './Pages/AllJobs'
import Profile from './Pages/Profile'
import AppliedJobs from './Pages/AppliedJobs'
import ViewSingleJob from './Pages/viewSingleJob'
import AdminLayout from './Pages/Admin'
import AdminProfile from './Pages/AdminProfile'
import PostedJobs from './Pages/PostedJobs'
import CreateJobs from './Pages/CreateJobs'
import ViewApplicants from './Pages/ViewApplicants'
import RankedApplicants from './Pages/RankedApplicants'

 const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element:<Landing/>
      },
      {
        path:'register',
        element:<Register/>

      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'dashboard',
        element:<DashBoard/>,
        children:[
          {
            index:true,
            element:<Profile/>
          },
          {
            path:'alljobs',
            element:<AllJobs/>
          },
          {
            path:'applied',
            element:<AppliedJobs/>  
          },
        ],
      },
      {
        path:'admin',
        element:<AdminLayout/>,
        children:[
          {
            index:true,
            element:<AdminProfile/>
          },
          {
            path:'postedjobs',
            element:<PostedJobs/>
          },
          {
            path:'createjob',
            element:<CreateJobs/>  
          },
        ],
      },
      {
        path:'viewsinglejob',
        element:<ViewSingleJob/>
      },
      {
        path:'viewapplicants',
        element:<ViewApplicants/>
      },
      {
        path:'rankedapplicants',
        element:<RankedApplicants/>
      },
    ]
  }
 ])

 const App=()=>{
  return <RouterProvider router={router}/>
 }

 export default App;