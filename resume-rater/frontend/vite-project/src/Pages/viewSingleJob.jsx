import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewSingleJob = () => {
    const location = useLocation();
    const [jobData, setJobData] = useState(null);
    const [resume, setResume] = useState(null);
    const [applyLoading, setApplyLoading] = useState(false);
    const[message,setMessage]=useState(null);
    const jobId = location.state?.jobId;
    console.log(jobId)
    const userId=location.state?.userId;
    useEffect(() => {
        const fetchJobinfo = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/viewJob/${jobId}`);
                setJobData(response.data);
            } catch(err) {
                console.log(err);
            }
        };

        fetchJobinfo();
    }, [jobId]);

    const handleApply = async () => {
        setApplyLoading(true);
        try {
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobId', jobId);
            formData.append('userId',userId)

            await axios.post(`http://127.0.0.1:8000/createResume/${userId}/${jobId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Application submitted successfully');
            setMessage('Application submitted successfully');
        } catch(err) {
            console.error('Error applying for job:', err);
        } finally {
            setApplyLoading(false);
        }
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {jobData ? (
                <div>
                    {Object.entries(jobData).map(([key, value]) => (
                        <p key={key} className="mb-2">
                            <strong>job {key}: </strong> {value}
                        </p>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="mt-4">
                <label htmlFor="resume" className="block mb-2">Upload Resume:</label>
                <input 
                    type="file" 
                    id="resume" 
                    accept=".pdf" 
                    onChange={handleResumeChange} 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button 
                onClick={handleApply} 
                disabled={applyLoading}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${applyLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {applyLoading ? 'Applying...' : 'Apply'}
            </button>
            {
                message && (
                    <div>
                        <p>{message}</p>
                    </div>
                )
            }
        </div>
    );
};

export default ViewSingleJob;
