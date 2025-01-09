import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const userData = location.state?.userData;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/viewAppliedJobs/${userData.id}`);
                setJobs(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchJobs();
    }, [userData]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Applied Jobs</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            {jobs.length === 0 && <p className="text-gray-500">No jobs available</p>}
            {jobs.length > 0 && (
                <ul className="divide-y divide-gray-200">
                    {jobs.map(job => (
                        <li key={job.id} className="py-4">
                            <div className="flex items-center justify-between">
                            </div>
                            <div className="mt-2">
                                {Object.entries(job).map(([key, value]) => (
                                    <p key={key} className="text-gray-600">
                                        <span className="font-semibold">job{key}:</span> {value}
                                    </p>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppliedJobs;
