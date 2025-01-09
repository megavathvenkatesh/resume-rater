import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useContext,useState } from 'react';
import { DashBoardContext } from '../pages/DashBoardLayout';

const LogoutContainer=()=>{
    const[showLogout,setShowLogout]=useState(false)
    const {user,logoutUser}=useContext(DashBoardContext)
return (
<>
    <button type='button' className='btn logout-btn' onClick={()=> setShowLogout(!showLogout)}>
    <FaUserCircle />
    {user?.name}
    <FaCaretDown />
    </button>
    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
    <button type='button' className='dropdown-btn' onClick={logoutUser}>Logout</button>
    </div>
</>
)
}
export default LogoutContainer;