import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/viewPostedJobs/${userData.id}`);
                setJobs(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchJobs();
    }, [userData]);

    const handleViewApplicants = (jobId) => {
        //console.log(jobId)
        navigate(`/viewapplicants`,{ state: { jobId:jobId } });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Posted Jobs</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            {jobs.length === 0 && <p className="text-gray-500">No jobs available</p>}
            {jobs.length > 0 && (
                <ul className="divide-y divide-gray-200">
                    {jobs.map((job,index) => (
                        <li key={`${job.id}-${index}`}  className="py-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{job.title}</h2>
                                <button
                                    onClick={() => handleViewApplicants(job.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    View Applicants
                                </button>
                            </div>
                            <div className="mt-2">
                                {Object.entries(job).map(([key, value]) => (
                                    <p key={key} className="text-gray-600">
                                        <span className="font-semibold">{key}: </span> {value}
                                    </p>
                                ))}
                                <p className='text-gray-600'><span className="font-semibold">recruiterName:</span>{userData.firstName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostedJobs;
