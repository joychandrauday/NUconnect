import Button from '../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import icon from "../assets/images/connections.png";
import { FcHome } from 'react-icons/fc';
const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <img src={icon} alt="" className='w-2/5 overly'/>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Page not Found.
          </h1>
          <p className='mt-4 text-gray-500 '>Here are some helpful links:</p>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180 text-rose-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Go back</span>
            </button>
            <button
              onClick={() => navigate('/')} 
              className='flex items-center justify-center w-1/2 px-5 py-1 text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 '
            >
              <FcHome></FcHome>

              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
