import { Outlet } from "react-router-dom"
import { createContext } from "react"
import { useLocation } from 'react-router-dom';
export const AdminContext=createContext();


const AdminLayout=()=>{
    const location = useLocation();
    const userData = location.state?.userData;
    const logoutUser=async()=>{
        console.log('logout user')
    }
    return(
        <AdminContext.Provider value={{userData,logoutUser}}>
          <main className="admin">
              <div>
                  <div className="admin-page">
                  <Outlet />
                  </div>
              </div>
          </main>
        </AdminContext.Provider>
    )
}

export default AdminLayout