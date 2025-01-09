import React, { useState } from 'react';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
const CreateJobs = () => {
    const location =useLocation();
    const userData=location.state?.userData;
    const [formData, setFormData] = useState({
        title: '',
        deadline: '',
        jobDescription: '',
        recruiter:`${userData.id}`
    });
    const [message,setMessage]=useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/newJob/', formData);
            console.log(response.data); // Handle successful response
            if(response.data.error=='Invalid request'){
            setMessage('error');
            }
            else{
                setMessage('Job created successfully')
            }
        } catch (error) {
            console.error('Error:', error); // Handle error
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Create Job</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-gray-700 font-semibold mb-2">Deadline:</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="jobDescription" className="block text-gray-700 font-semibold mb-2">Job Description:</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Job
                </button>
            </form>
            {
                message && (
                    <div>
                        job created successfully
                    </div>
                )
            }
        </div>
    );
};

export default CreateJobs;
