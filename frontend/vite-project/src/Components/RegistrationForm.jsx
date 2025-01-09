import{ useState } from 'react';
import Logo from '../Components/Logo'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
export const RegistrationForm = () => {
    const navigate=useNavigate();
    const[errorMessage,setErrorMessage]=useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        phone: ''
    });
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleShowPassword=()=>{
        setShowPassword(!showPassword);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/signup/', formData);
            console.log(response.status);
            if(response.data.role=='REC'){
                navigate('/admin',{state:{userData:response.data}});
            }
            else {
                navigate('/dashboard',{state:{userData:response.data}});
            }
        } catch (error) {
            setErrorMessage(error.response.data.email[0]);
            console.error('Error:', error.response.data);
        }
    };

    return (
        <>
        <div className='flex justify-center p-4'>
        <Logo/>
        </div>
        <div className='display align-middle flex justify-center p-4'>
        <h1 className='text-3xl'>Register</h1>
        </div>
        {passwordMatchError && (
                <div className="text-red-500 text-sm text-center mb-4">{passwordMatchError}</div>
            )}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">Firstname:</label>
                <input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Lastname:</label>
                <input type="text" id="lastname" name="lastName" value={formData.lastName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
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
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Role</option>
                    <option value="APP">Applicant</option>
                    <option value="REC">Recruiter</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            {errorMessage && (
                <div className="flex justify-center">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </form>
        <div className='flex justify-center'>
            <h3 className='text-lg'>Already a member? <Link to='/login'className='underline'>Login</Link></h3>
        </div>
        </>
    );
};
