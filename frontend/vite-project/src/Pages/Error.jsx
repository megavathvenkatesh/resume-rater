import { Link ,useRouteError} from "react-router-dom"

const Error=()=>{
    const error=useRouteError()
    if(error.status==404){
        return (
            <div className="w-screen flex items-center justify-center">
                <div>
                <h1>Something went wrong</h1>
                <Link className='text-blue-400 w-1/2 underline hover:bg-transparent' to='/dashboard'>Back home</Link>
                </div>
            </div>
        )
    }
    return(
        <div>
            <Link to='/'>Back home</Link>
        </div>
    )
}
export default Error