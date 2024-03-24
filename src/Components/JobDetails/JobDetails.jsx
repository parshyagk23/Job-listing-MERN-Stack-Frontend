import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { getJobDetails } from "../../Apis/Job";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import companylogo from "../../assets/companylogo.png";

const JobDetails = () => {
  const { id } = useParams();
  const [Jobdetail, setJobdetails] = useState()
  const navigate = useNavigate()
  const [isEditable ,setIsEditable] = useState()
  const [isLoggedIn] = useState(!!localStorage.getItem('token'))
  useEffect(()=>{
    fetchJobDetailsById()
  },[])

  const fetchJobDetailsById = async ()=>{
    try {
      if(!id) return
      const responce = await getJobDetails(id)
      setJobdetails(responce.data)
      setIsEditable(responce.isEditable)
    } catch (error) {
      toast.error("Something wend wrong" ,{position:'top-center'})
    }

  }
 useEffect(()=>{
  
 },[])
 const timeAgo =( dateString) =>{
  const date = new Date(dateString);
  const seconds = Math.floor((new Date()- date)/1000);
  const intervals = {
    yr: 31536000,
    m: Number(2592000),
    w: 604800,
    d: 86400,
    hr: 3600,
    min: 60
  };

  if (seconds < 60) {
      return 'just now';
  }
  for(let interval in intervals){
      const intervalInSeconds = intervals[interval];
      const count = Math.floor(seconds / intervalInSeconds);
      if(count>=1){
        if(count ===1){
          return `${count} ${interval} ago`
        }else{
          return `${count} ${interval}s ago`
        }
      }
  }
 }
  return (
    <main className="pt-20 pb-16">
      <section className="w-9/12 h-24 mx-40 mt-10 bg-slate-100 md:mx-24 xs:w-11/12 xs:mx-4 ">
        
          {Jobdetail?(<h1 className="font-medium text-3xl text-center pt-3 rounded-md xs:text-xl " >
                        {Jobdetail.JobPosition} work from {Jobdetail.LocationType} {Jobdetail.JobType==='full time '?'job':'internship '}
                         at {Jobdetail.CompanyName}
                    </h1>):
                     (<h1 className="font-medium text-3xl text-center pt-3 rounded-md xs:text-xl" >WordPress Development work from home job/internship at Adyaka Infosec
                     Private Limited</h1>) 
          }
        
      </section>
      <section className="w-4/5 bg-slate-100 mt-10 mx-32 p-8 md:mx-20  xs:w-11/12 xs:mx-4 ">
        <div className="flex gap-2">
        {Jobdetail?<h4 className="text-slate-300 text-center text-xl font-medium" >
           {timeAgo(Jobdetail.UpdatedAt)}
           </h4>:<h4 className="text-slate-300 text-center text-xl font-medium" >Full Time</h4>} 
           {Jobdetail?<h4 className="text-slate-300 text-center text-xl font-medium" >
           {Jobdetail.JobType}
           </h4>:<h4 className="text-slate-300 text-center text-xl font-medium" >Full Time</h4>} 
          
          <img src={Jobdetail?Jobdetail.logoUrl:companylogo} width="30px" height="30px" alt="" />
          {Jobdetail?<h4 className="text-slate-300 text-center text-xl font-medium" >
           {Jobdetail.CompanyName}
           </h4>:<h4 className="text-slate-300 text-center text-xl font-medium" >Google</h4>} 
        </div>
        <div className="flex justify-between">
          {Jobdetail?
          <h1 className="font-bold text-4xl text-center">
          {Jobdetail.JobPosition}
          </h1>:
          <h1 className="font-bold text-4xl text-center">
            WordPress Development
          </h1>}
          
            {isLoggedIn && isEditable &&  <div className="w-40 bg-red-500 rounded-md p-2 text-center "><button className=" text-xl font-medium text-white" 
            onClick={()=>{
              navigate("/job-post", {
                state: {
                    jobDetails: Jobdetail,
                    edit: true,
                },
              });
            }} >Edit job</button> </div>}
         
        </div>
        <div className="mt-1">
          {Jobdetail?<h1 className="font-medium text-xl  text-red-500">
           {Jobdetail.Location} | India
          </h1>:<h1 className="font-medium text-xl  text-red-500">
            Bangalore | India
          </h1>}
        </div>
        <div className="flex gap-7 mt-3">
          <div>
            <span className="flex gap-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.375 14C18.375 14.8653 18.1184 15.7112 17.6377 16.4306C17.1569 17.1501 16.4737 17.7108 15.6742 18.042C14.8748 18.3731 13.9951 18.4597 13.1465 18.2909C12.2978 18.1221 11.5183 17.7054 10.9064 17.0936C10.2946 16.4817 9.87787 15.7022 9.70906 14.8535C9.54025 14.0049 9.62689 13.1252 9.95803 12.3258C10.2892 11.5263 10.8499 10.8431 11.5694 10.3623C12.2888 9.88159 13.1347 9.625 14 9.625C15.1603 9.625 16.2731 10.0859 17.0936 10.9064C17.9141 11.7269 18.375 12.8397 18.375 14ZM27.125 7V21C27.125 21.2321 27.0328 21.4546 26.8687 21.6187C26.7046 21.7828 26.4821 21.875 26.25 21.875H1.75C1.51794 21.875 1.29538 21.7828 1.13128 21.6187C0.967187 21.4546 0.875 21.2321 0.875 21V7C0.875 6.76794 0.967187 6.54538 1.13128 6.38128C1.29538 6.21719 1.51794 6.125 1.75 6.125H26.25C26.4821 6.125 26.7046 6.21719 26.8687 6.38128C27.0328 6.54538 27.125 6.76794 27.125 7ZM25.375 12.0695C24.3814 11.7758 23.4772 11.2381 22.7445 10.5055C22.0119 9.77283 21.4742 8.86856 21.1805 7.875H6.81953C6.52576 8.86856 5.98807 9.77283 5.25545 10.5055C4.52283 11.2381 3.61856 11.7758 2.625 12.0695V15.9305C3.61856 16.2242 4.52283 16.7619 5.25545 17.4945C5.98807 18.2272 6.52576 19.1314 6.81953 20.125H21.1805C21.4742 19.1314 22.0119 18.2272 22.7445 17.4945C23.4772 16.7619 24.3814 16.2242 25.375 15.9305V12.0695Z"
                  fill="#999999"
                />
              </svg>
              <h5 className="font-normal text-lg text-slate-400" >Stipend</h5>
            </span>
            {Jobdetail?<h1 className="font-medium text-xl text-slate-600" >{Jobdetail.MonthlySalary}/month</h1>:
            <h1 className="font-medium text-xl text-slate-800" >15000/month</h1>}
          </div>
          <div>
            <span className="flex gap-3 items-center ">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66666 15.8333C1.66666 17.25 2.74999 18.3333 4.16666 18.3333H15.8333C17.25 18.3333 18.3333 17.25 18.3333 15.8333V9.16663H1.66666V15.8333ZM15.8333 3.33329H14.1667V2.49996C14.1667 1.99996 13.8333 1.66663 13.3333 1.66663C12.8333 1.66663 12.5 1.99996 12.5 2.49996V3.33329H7.49999V2.49996C7.49999 1.99996 7.16666 1.66663 6.66666 1.66663C6.16666 1.66663 5.83332 1.99996 5.83332 2.49996V3.33329H4.16666C2.74999 3.33329 1.66666 4.41663 1.66666 5.83329V7.49996H18.3333V5.83329C18.3333 4.41663 17.25 3.33329 15.8333 3.33329Z"
                  fill="#999999"
                />
              </svg>
              <h5 className="font-normal text-lg text-slate-400"  >Duration</h5>
            </span>
            {Jobdetail?<h1 className="font-medium text-xl text-slate-600" >{Jobdetail.JobType}</h1>:
            <h1 className="font-medium text-xl text-slate-800" >6 months</h1>}
          </div>
        </div>
        <section className="mt-5" >
          <h1 className="font-bold text-2xl">About Company</h1>
          {Jobdetail?<p className="font-normal text-xl text-slate-800  text-left mt-2 ">
            {Jobdetail.AboutCompany}
          </p>:
          <p className="font-normal text-xl text-slate-800  text-left mt-2 ">
          We provide technology-based services to help businesses and
          organizations achieve their goals. We offer a wide range of
          services, including software development, system integration,
          network and security services, cloud computing, and data analytics.
          Our primary focus is on leveraging technology to streamline business
          processes, improve productivity, and enhance overall efficiency.
        </p>}
        </section>
        <section className="mt-5" >
          <h1 className="font-bold text-2xl">Job Description</h1>
          {Jobdetail?<p className="font-normal text-xl text-slate-800  text-left mt-2 ">
            {Jobdetail.JobDescription}
          </p>:
          <p className="font-normal text-xl text-slate-800  text-left mt-2 ">
          We provide technology-based services to help businesses and
          organizations achieve their goals. We offer a wide range of
          services, including software development, system integration,
          network and security services, cloud computing, and data analytics.
          Our primary focus is on leveraging technology to streamline business
          processes, improve productivity, and enhance overall efficiency.
        </p>}
        </section>
        <section className="mt-5" >
          <h1 className="font-bold text-2xl">Skill(s) Required</h1>
          <div  className="grid grid-cols-7 gap-4 md:grid-cols-4 lg:grid-cols-6 xs:grid-cols-3  "  >
          {Jobdetail?Jobdetail.Skills.map((skill,index)=>(
            
              <div key={index} className="w-28 min-h-10 mt-2  rounded-full bg-red-100 font-normal text-slate-700 text-2xl text-center" >{skill}</div>

              )):
              <div className="max-w-28 min-h-10 mt-2 rounded-full bg-red-100 font-normal text-slate-700 text-2xl text-center" >html</div>
            }
            </div>
          
        </section>
        <section className="mt-5" >
          <h1 className="font-bold text-2xl">Additional information</h1>
          {Jobdetail?<p className="font-normal text-xl text-slate-800  text-left mt-2 ">
            {Jobdetail.information}
          </p>:
          <p className="font-normal text-xl text-slate-800  text-left mt-2 ">
            information
        </p>}
        </section>
        
      </section>
      <ToastContainer />
    </main>
  );
};

export default JobDetails;
