import { Outlet } from "react-router-dom"
import { createContext } from "react"
import { useLocation } from 'react-router-dom';
export const DashBoardContext=createContext();


const DashBoardLayout=()=>{
    const location = useLocation();
    const userData = location.state?.userData;
    const logoutUser=async()=>{
        console.log('logout user')
    }
    return(
        <DashBoardContext.Provider value={{userData,logoutUser}}>
          <main className="dashboard">
              <div>
                  <div className="dashboard-page">
                  <Outlet />
                  </div>
              </div>
          </main>
        </DashBoardContext.Provider>
    )
}

export default DashBoardLayout