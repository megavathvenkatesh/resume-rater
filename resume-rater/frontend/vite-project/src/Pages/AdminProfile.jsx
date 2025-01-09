import { useContext } from 'react';
import { DashBoardContext } from './DashboardLayout';
import { useNavigate ,useLocation} from 'react-router-dom';
const AdminProfile = () => {
    const location =useLocation();
    //const { userData } = useContext(DashBoardContext)|| {};
    const userData=location.state?.userData;
    console.log(userData)
    const navigate = useNavigate();
    //console.log({"profile":userData})
    const handlePostedJobs = () => {
        navigate('postedjobs', { state: { userData } });
      };
    const handleCreateJobs = () => {
    navigate('createjob', { state: { userData } });
    };
    return (
        <div>
            <h1>Profile</h1>
            <div className=' flex justify-center'>
                <h2>User Details:</h2>
                <br/>
                <ul>
                    {Object.entries(userData || {}).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-evenly'>
            <button className='text-white bg-blue-500 rounded-md p-4' onClick={handlePostedJobs}>View posted jobs</button>
            <button className='text-white bg-blue-500 rounded-md p-4' onClick={handleCreateJobs}>create job</button>
            </div>
        </div>
    );
}

export default AdminProfile;