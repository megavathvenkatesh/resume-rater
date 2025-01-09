import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const RankedApplicants = () => {
    const location = useLocation();
    const jobId = location.state?.jobId;
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/processJob/${jobId}`);
                setApplicants(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ranked applicants:', error);
                setLoading(false);
            }
        };

        if (jobId) {
            fetchData();
        }
    }, [jobId]);

    if (loading) {
        return <div className='display items-center flex justify-center'><div><h1>Loading...</h1></div></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Ranked Applicants for Job:</h1>
            {applicants.length === 0 && <p className="text-gray-500">No ranked applicants for this job</p>}
            {applicants.length > 0 && (
                <div className="divide-y divide-gray-200">
                    {applicants.map((applicant, index) => (
                        <div key={index} className="py-4">
                            <h2 className="text-lg font-semibold">Applicant {index + 1}</h2>
                            {Object.entries(applicant).map(([key, value]) => (
                                <p key={key} className="text-gray-600">
                                    <span className="font-semibold">{key}: </span> {value}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default RankedApplicants;
