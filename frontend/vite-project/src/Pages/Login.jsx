import { useState } from 'react';
import Logo from '../Components/Logo';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', formData);
            console.log(response);
            if(response.data.error){
                setErrorMessage('Invalid username or password');
            }
            else if(response.data.role=='APP'){
            navigate('/dashboard',{state:{userData:response.data}});
            }
            else{
                navigate('/admin',{state:{userData:response.data}})
            }
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    
    }
    return (
        <>
            <div className='flex justify-center m-4'>
                <Logo />
            </div>
            <div className='flex justify-center m-4'>
                <h3 className='text-3xl'>Login</h3>
            </div>
            <div className='flex justify-center p-4'>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <input type="checkbox" id="togglePassword" name="togglePassword" checked={showPassword} onChange={toggleShowPassword} className="mr-2" />
                        <label htmlFor="togglePassword" className="text-gray-700 text-sm">Show Password</label>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
            {errorMessage && (
                <div className="flex justify-center">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
            <div className='flex justify-center'>
            <h3 className='text-lg'>new member? <Link to='/register'className='underline'>Register</Link></h3>
        </div>
        </>
    );
};

export default Login;
