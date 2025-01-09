import { useContext } from 'react';
import { DashBoardContext } from './DashboardLayout';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const { userData } = useContext(DashBoardContext)|| {};
    const navigate = useNavigate();
    //console.log({"profile":userData})
    const handleViewJobs = () => {
        navigate('alljobs', { state: { userData } });
      };
    const handleAppliedJobs = () => {
    navigate('applied', { state: { userData } });
    };
    return (
        <div>
            <h1>Profile</h1>
            <div className=' flex justify-center'>
                <h2>User Details:</h2>
                <br/> &nbsp;
                <ul>
                    {Object.entries(userData || {}).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-evenly'>
            <button className='text-white bg-blue-500 rounded-md p-4' onClick={handleViewJobs}>View available jobs</button>
            <button className='text-white bg-blue-500 rounded-md p-4' onClick={handleAppliedJobs}>View applied jobs</button>
            </div>
        </div>
    );
}

export default Profile;