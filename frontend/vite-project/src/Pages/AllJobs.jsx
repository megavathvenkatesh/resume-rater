import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate} from 'react-router-dom';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate=useNavigate();
    const userData = location.state?.userData;
    

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/viewAvailableJobs/${userData.id}`);
                setJobs(response.data); // Assuming response.data is an array of jobs
            } catch (error) {
                setError(error.message);
            }
        };
        fetchJobs();
    }, [userData.id]);

    const handleApply = (jobId) => {
       navigate(`/viewSingleJob`,{state:{jobId:jobId,userId:userData.id}});
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">All Jobs</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            {jobs.length === 0 && <p>No jobs available</p>}
            {jobs.length > 0 && (
                <ul className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                        <li key={job.id} className="py-4 flex justify-between items-center">
                            <div>
                                <span className="font-bold">{job.title}</span>
                                <span className="text-gray-600"> - {job.jobDescription}</span>
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleApply(job.id)}
                            >
                                Apply
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllJobs;
