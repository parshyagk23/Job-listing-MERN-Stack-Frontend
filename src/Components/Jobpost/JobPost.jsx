import React, {  useState } from 'react'
import { CreatejobPost, updateJobPost } from '../../Apis/Job';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DEFAULT_SKILLS } from '../../utils/Consants'
import addJobImg from '../../assets/addjob.png'
import { useLocation , useNavigate} from 'react-router-dom';

const JobPost = () => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [stateData] = useState(state?.jobDetails);
  const [formData ,setFromData] = useState({
    
          CompanyName:"" || stateData?.CompanyName , 
          logoUrl:"" || stateData?.logoUrl ,
          JobPosition:"" || stateData?.JobPosition ,
          MonthlySalary:"" || stateData?.MonthlySalary ,
          JobType:"" || stateData?.JobType ,
          LocationType:"" || stateData?.LocationType ,
          Location:"" || stateData?.Location ,
          JobDescription:"" || stateData?.JobDescription ,
          AboutCompany:"" || stateData?.AboutCompany ,
          Skills:stateData?.Skills||[],
          information:"" || stateData?.information 
  })


  const addskills =(e)=>{
    const selectedSkill = e.target.value
    if(selectedSkill=== 'select')return
    if(!formData.Skills.includes(selectedSkill)){
        setFromData({...formData ,Skills:[...formData.Skills, selectedSkill]})
    }
     }
     const Removeskills=(e)=>{
      const removeskill =e.target.value
      const updateSkills=    formData.Skills.filter((value)=> value !== removeskill )
      setFromData({...formData ,Skills:updateSkills})
    }
    const HandleOnchange=(e)=>{
      setFromData({...formData , [e.target.name]:e.target.value})

    }
    const HandleClear=()=>{
      setFromData({
        CompanyName:"",
        logoUrl:"",
        JobPosition:"",
        MonthlySalary:"",
        JobType:"",
        LocationType:"",
        Location:"",
        JobDescription:"",
        AboutCompany:"",
        Skills:[],
        information:""
      })

    }

    const HandleSubmit = async ()=>{
      try{
      if(
          !formData.CompanyName || !formData.logoUrl || !formData.AboutCompany ||
          !formData.JobDescription || !formData.JobPosition || !formData.JobType ||
          !formData.MonthlySalary || !formData.Skills || !formData.information ||
          !formData.Location || !formData.LocationType
      ){
        toast.error("Fields can't be empty",{position:"top-center"})
        return
      }
      if(state?.edit){
        const userid = localStorage.getItem('userId')
        
        const responce= await updateJobPost(stateData?._id, formData, userid)
        if(!responce){
          toast.error("Something went wrong",{position:"top-center"})
          return
        }
        toast.success("Job updated successfully",{position:"top-center"})
        setFromData({
          CompanyName:"",
          logoUrl:"",
          JobPosition:"",
          MonthlySalary:"",
          JobType:"",
          LocationType:"",
          Location:"",
          JobDescription:"",
          AboutCompany:"",
          Skills:[],
          information:""
        })
        return
      }
      const responce = await CreatejobPost(formData)
      if(!responce){
        toast.error("Something went wrong",{position:"top-center"})
        return
      }
      toast.success("Job create successfully",{position:"top-center"})
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }catch(error){
      toast.error("Something went wrong",{position:"top-center"})
    }
    }

   

  return (
    <div className="flex flex-wrap ">
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4 xs:w-full">
        <div className="my-auto mx-8 xs:mx-2 lg:mx-2 sm:mx-2 md:mx-2 ">
          <h1 className="mt-16 mb-5 text-black xl:text-4xl font-semibold text-left xs:text-3xl sm:text-3xl md:text-3xl ">
            Add job description
          </h1>
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label
                htmlFor="CompanyName"

                className="w-2/5 text-2xl font-normal xs:text-xl "
              >
                Company Name
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full "
                id="CompanyName"
                name="CompanyName"
                type="text"
                value={formData.CompanyName}
                placeholder="Enter your company name here"
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl  md:gap-2 lg:gap-2 ">
              <label htmlFor="addlogo" className="w-2/5 text-2xl font-normal xs:text-xl">
                Add logo URL
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full " 
                id="addlogo"
                name='logoUrl'
                value={formData.logoUrl}
                type="text"
                placeholder="Enter the link"
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label
                htmlFor="jobPosition"
                className="w-2/5 text-2xl font-normal xs:text-xl"
              >
                Job position
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full " 
                id="jobPosition"
                name="JobPosition"
                type="text"
                placeholder="Enter job position"
                value={formData.JobPosition}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label htmlFor="salary" className="w-2/5 text-2xl font-normal xs:text-xl">
                Monthly salary
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full " 
                id="salary"
                name="MonthlySalary"
                type="text"
                placeholder="Enter amount in rupees"
                value={formData.MonthlySalary}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row justify-between gap-10 xs:justify-between md:justify-between lg:justify-between ">
              <label htmlFor="" className="xl:w-3/12 text-2xl font-normal xs:text-xl xss:w-3/12 ">
                job type
              </label>
              <select
                name="JobType"
                id=""
                className="w-40 rounded border-2 text-slate-600 h-10 text-lg text-center font-medium  "
                value={formData.JobType}
                onChange={HandleOnchange}
              >
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value=""
                >
                  select
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="full time"
                >
                  full time
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="part time"
                >
                  internship
                </option>
              </select>
            </div>
            <div className="flex flex-row justify-between gap-10 xs:justify-between md:justify-between lg:justify-between ">
              <label htmlFor="" className="xl:w-3/12 text-2xl font-normal xs:text-xl xss:w-3/12 ">
                Remote/office
              </label>
              <select
                name="LocationType"
                id=""
                className="w-40 rounded border-2 text-slate-600 h-10 text-lg text-center font-medium"
                value={formData.LocationType}
                onChange={HandleOnchange}
              >
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value=""
                >
                  select
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="Remote"
                >
                  Remote
                </option>
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="Office"
                >
                  Office
                </option>
              </select>
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label htmlFor="Location" className="w-2/5 text-2xl font-normal xs:text-xl">
                Location
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full " 
                id="Location"
                type="text"
                name='Location'
                placeholder="Enter Location"
                value={formData.Location}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label
                htmlFor="jobDescription"
                className="w-2/5 text-2xl font-normal xs:text-xl"
              >
                job Description
              </label>
              <textarea
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded  resize-none xs:text-lg xs:w-full "
                id="jobDescription"
                type="text"
                name='JobDescription'
                rows={5}
                placeholder="Type about job description"
                value={formData.JobDescription}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label
                htmlFor="AboutCompany"
                className="w-2/5 text-2xl font-normal xs:text-xl"
              >
                About Company
              </label>
              <textarea
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded resize-none xs:text-lg xs:w-full "
                id="AboutCompany"
                type="text"
                name='AboutCompany'
                rows={5}
                placeholder="Type about your company"
                value={formData.AboutCompany}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex flex-row justify-between gap-10 xs:justify-between md:justify-between lg:justify-between ">
              <label htmlFor="" className="xl:w-3/12 text-2xl font-normal xs:text-xl xss:w-3/12 ">
                Skills Required
              </label>
              <select
                name="Skills"
                id=""
                className="w-40 rounded border-2 text-slate-600 h-10 text-lg text-center font-medium  "
                onChange={addskills}
                
              >
                <option
                  className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                  value="select"
                >
                  select
                </option>
                {DEFAULT_SKILLS.map((skill,index)=>(
                    <option
                    key={index}
                    className="text-slate-600 h-8 p-2 text-base text-center font-medium"
                    value={skill}
                  >
                    {skill}
                  </option>
                ))}
                
              </select>
            </div>
            <div className="grid grid-cols-5 gap-4 xs:gap-2 xs:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 ">
              {formData.Skills.map((skills , index)=>(
                <div className="flex rounded-md" key={index}>
                <h3 className="font-medium text-base text-center text-black bg-red-300 py-2 w-24 " >{skills}</h3>
                <button className="text-lg bg-red-600 px-2 text-white " value={skills}  onClick={Removeskills}  >X</button>
              </div>
              ))}
              </div>
            <div className="flex flex-row gap-10 xs:gap-2 xs:text-xl md:gap-2 lg:gap-2 ">
              <label
                htmlFor="Information"
                className="w-2/5 text-2xl font-normal xs:text-xl"
              >
                Information
              </label>
              <input
                className="w-3/4 text-xl text-slate-600 h-12 p-2 border-2 outline-none rounded xs:text-lg xs:w-full "
                id="Information"
                type="text"
                name='information'
                placeholder="Enter the additional information"
                value={formData.information}
                onChange={HandleOnchange}
              />
            </div>
            <div className="flex gap-3 justify-end" >
              <button className="w-36 rounded-md border-2 border-slate-400 text-slate-600  font-medium text-lg p-1 " onClick={HandleClear} >Cancel</button>
              <button className="w-36 rounded-md bg-red-500 text-white text-center font-medium text-lg p-1 "  onClick={HandleSubmit}  >{state?.edit?'+ Edit job':'+ Add job'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/4 xs:w-full">
        <h1 className=" mx-28 my-auto absolute mt-12 xl:text-4xl text-center text-white text-4xl font-medium  xs:text-center xs:text-2xl  ">
          Recruiter add job details here
        </h1>
        <img src={addJobImg} className="w-full h-full" alt="addjobImg" />
      </div>
      <ToastContainer />
    </div>

  )
}

export default JobPost
