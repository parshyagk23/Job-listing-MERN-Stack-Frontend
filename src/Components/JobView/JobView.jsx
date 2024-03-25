import React from 'react'
import company from "../../assets/companylogo.png";
import country from '../../assets/country.png'
import { Link } from "react-router-dom";
const JobView = ({job}) => {
  
  return (
  job? <main className="flex w-11/12  mx-16 my-auto mt-8 mb-8  shadow-lg hover:shadow-rose-500 rounded-sm pt-3 pb-3 md:mx-8 lg:mx-12 xs:mx-4 xs:p-2 xs:w-11/12 ">
    <div className="w-2 bg-red-500"></div>

    <div className="flex gap-96 md:gap-24 lg:gap-48 mx:gap-36 xs:flex-col xs:gap-8 " >
    <div className="flex gap-4 lg:gap-4 md:gap-0 xs:gap-2 " >
      <div className="pl-2 pt-2 " >
        <img src={company} width="80%" height="100%"  alt="" />
      </div>
     
      <section className="flex flex-col gap-2 items-start  " >
        <h1 className="font-medium text-xl text-black" >{job.JobPosition}</h1>
        <section className="flex gap-3 xs:gap-2 " >

        <div className="flex gap-2 items-center xs:gap-1 "  >
          <svg
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              
              d="M14.6661 9.27124C15.9361 10.1333 16.826 11.3013 16.826 12.8586V15.6396H20.5339V12.8586C20.5339 10.8378 17.2246 9.64203 14.6661 9.27124Z"
              fill="#919191"
            />
            <path
              d="M7.55626 8.22379C9.60408 8.22379 11.2642 6.56371 11.2642 4.51589C11.2642 2.46807 9.60408 0.807983 7.55626 0.807983C5.50844 0.807983 3.84836 2.46807 3.84836 4.51589C3.84836 6.56371 5.50844 8.22379 7.55626 8.22379Z"
              fill="#919191"
            />
            <path
              
              d="M13.118 8.22379C15.1667 8.22379 16.826 6.56451 16.826 4.51589C16.826 2.46727 15.1667 0.807983 13.118 0.807983C12.6824 0.807983 12.2745 0.900681 11.8852 1.03046C12.6829 2.01696 13.118 3.24723 13.118 4.51589C13.118 5.78454 12.6829 7.01481 11.8852 8.00132C12.2745 8.1311 12.6824 8.22379 13.118 8.22379ZM7.55619 9.15077C5.08116 9.15077 0.140381 10.3929 0.140381 12.8587V15.6396H14.972V12.8587C14.972 10.3929 10.0312 9.15077 7.55619 9.15077Z"
              fill="#919191"
            />
          </svg>

          <h1 className=" w-11 font-medium text-base xs:text-sm " >11&#45;50</h1>
        </div>
        <div className="flex gap-2 items-center xs:gap-1 "  >
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.20035 4.1039C6.73892 3.1316 5.75015 2.45594 4.59658 2.45594H0.888672V0.807983H10.7764V2.45594H8.09025C8.48576 2.93385 8.78239 3.49415 8.95543 4.1039H10.7764V5.75186H9.11198C8.90599 8.059 6.9614 9.87175 4.59658 9.87175H3.99507L9.54045 15.6396H7.25803L1.71265 9.87175V8.22379H4.59658C6.04678 8.22379 7.24979 7.15262 7.44754 5.75186H0.888672V4.1039H7.20035Z"
              fill="#9C9C9C"
            />
          </svg>
          <h1 className="font-medium text-base xs:text-sm">{job.MonthlySalary}</h1>
        </div>
        <div className="flex gap-2 items-center xs:gap-1"  >
          <img src={country} alt="" />
          <h1 className="font-medium text-base xs:text-sm " >{job.Location}</h1>
        </div>
        </section>
        <div className="flex gap-2"  >
          <h1 className="font-medium text-sm text-red-600" >{job.LocationType}</h1>
          <h1 className="font-medium text-sm text-red-600" >{job.JobType}</h1>
        </div>
      </section>
      </div>
      <section className="flex flex-col gap-3 pl-2 items-end" >
          <div className="grid grid-cols-4 gap-2 pr-2  xs:grid-cols-3 xs:pr-0 md:grid-cols-3 " >
            {job.Skills.map((item, i)=>(
              <h1 key={i} className="bg-red-200 text-black font-medium text-base text-center p-1 rounded-sm" >{item}</h1>
            ))}
              
          </div>
          <div className="w-36 rounded bg-red-500 px-2 py-2 mr-2 text-center xs:px-1 xs:py-1 ">
             
              <Link to={`job-details/${job._id}` } className=" font-medium text-xl text-white xs:text-lg " >View Details</Link>
          </div>
      </section>
      </div>
  
  </main>:<h1 className="text-center text-3xl mt-3 font-bold " > JobDetail Not Found</h1>
    
  )
}

export default JobView
