import { Link } from 'react-router-dom';
import Logo from '../Components/Logo';

const Landing = () => {
  return (
    <div>
      <nav className='ml-40 mt-6'>
        <Logo />
      </nav>
      <div className='h-screen flex items-center justify-evenly'>
        <div className='mt-[-10%]'>
          <div className='ml-40 w-45 m-7'>
            <p className='text-xl'>
              Welcome to Resume Rater, your gateway to streamlined job applications and efficient hiring processes.<br />
              <br />
              Join us in revolutionizing the job application experience with our innovative platform
            </p>
            <br />
          </div>
          <div className="flex justify-evenly w-45">
            <div>
              <Link className='text-white bg-blue-500 rounded-md p-4' to='register'>Register</Link>
            </div>
            <div>
              <Link className='text-white bg-blue-500 rounded-md p-4' to='login'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
