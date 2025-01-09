import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';

const ViewApplicants = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const jobId = location.state?.jobId;
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/viewApplicants/${jobId}`);
                setApplicants(response.data);
            } catch (err) {
                setError(err.message);
            }
        };  
        if (jobId) {
            fetchData();
        }
    }, [jobId]);

    const handleResumeLinkClick = (resumeLink) => {
        window.open(resumeLink, '_blank');
    };

    const handleEvaluateClick = () => {
        navigate(`/rankedapplicants`, { state: { jobId: jobId } });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Applicants for Job ID:</h1>
            {error && <p className="text-red-500">Error: {error}</p>}
            {applicants.length === 0 && <p className="text-gray-500">No applicants for this job</p>}
            {applicants.length > 0 && (
                <div>
                    <ul className="divide-y divide-gray-200">
                        {applicants.map((applicant, index) => (
                            <li key={index} className="py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Applicant {index + 1}</h2>
                                </div>
                                <div className="mt-2">
                                    {Object.entries(applicant).map(([key, value]) => (
                                        <p key={key} className="text-gray-600">
                                            <span className="font-semibold">{key}: </span> 
                                            {key === 'resumeLink' ? (
                                                <button 
                                                    onClick={() => handleResumeLinkClick(value)} 
                                                    className="text-blue-500 underline"
                                                >
                                                    View Resume
                                                </button>
                                            ) : (
                                                value
                                            )}
                                        </p>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleEvaluateClick}  className="px-4 py-2 bg-blue-500 text-white rounded">
                        Evaluate
                    </button>
                </div>
            )}
        </div>
    );
};

export default ViewApplicants;
