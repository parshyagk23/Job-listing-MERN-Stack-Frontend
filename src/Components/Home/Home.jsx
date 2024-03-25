import React, { useState } from 'react'
import { DEFAULT_SKILLS } from '../../utils/Consants'
import { getAllJobPost } from '../../Apis/Job'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobView from '../JobView/JobView';
const Home = () => {
    const [Skill, setSkills] = useState([])
    const [title, setTitle] = useState()
    const [jobDetail, setJobDetail] = useState()
    const AddSkill =(e)=>{
      const selectedSkill = e.target.value
      if(selectedSkill=== 'Skills') return
      if(!Skill.includes(selectedSkill)){
          setSkills([...Skill, selectedSkill])
      }
    }
    const RemoveSkills=(e)=>{
      const removeskill =e.target.value
      const updateSkills=  Skill.filter((value)=> value !== removeskill )
      setSkills(updateSkills)
    }

    const handleApplyFilter =async ()=>{

      if(!Skill && !title){
        toast.error("Feild's can't be empty",{position:"top-center"})
        return
      }
      const filteredSkill = Skill.join(",")
      const responce = await getAllJobPost({title,skill:filteredSkill});
      
      if(!responce){
        toast.error("Job not found",{position:"top-center"})
        return
      }
      setJobDetail(responce.data)
      
    }
    const handleClear =()=>{
      setSkills([])
      setTitle("")
    }
    
    
  return (
    <div>
    <main className="w-11/12 mx-16   my-auto mt-36 p-8 px-14 shadow-lg hover:shadow-rose-500 rounded-sm md:mx-8 lg:mx-12 xs:mx-4 xs:p-2 xs:w-11/12
     ">
        <div className="flex gap-4 border-2 border-slate-400 rounded-lg p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="40"
            fill='#9C9C9C'
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input className="font-medium text-2xl text-slate-400 outline-none w-full xs:text-xl"  type="text" name="" value={title}  placeholder="Type any job title" onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <section className="flex gap-4 justify-between lg:flex-col xs:flex-col  md:flex-col  ">
          <div className="flex h-fit gap-5 mt-4 xs:flex-col ">
            <select name="" id="" className=" h-1/3 font-medium text-lg text-slate-400 border-2 border-slate-400 rounded-lg px-2 xs:w-2/6 " onChange={AddSkill} >
              <option className="font-medium text-lg text-slate-400"  value="Skills">Skills</option>
              {DEFAULT_SKILLS.map((skills, index) => (
                <option className="font-medium text-lg text-slate-400" key={index} value={skills}  >
                  {skills}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-3 gap-4 xs:gap-2">
              {Skill.map((skills , index)=>(
                <div className="flex rounded-md" key={index}>
                <h3 className="font-medium text-base text-center text-black bg-red-300 py-2 w-24 " >{skills}</h3>
                <button className="text-lg bg-red-600 px-2 text-white " value={skills}  onClick={RemoveSkills}  >X</button>
              </div>
              ))}
              
            </div>
          </div>
          <div className="h-fit flex gap-8 mt-4">
            <button className="rounded px-5 py-2 bg-red-500 text-white font-medium text-xl xs:px-3 xs:py-1 xs:text-lg " onClick={handleApplyFilter} >Apply Filter</button>
            <button className="text-red-400 font-medium text-xl  xs:text-lg " onClick={handleClear} >Clear</button>
          </div>
        </section>
        <ToastContainer />
      </main>
        {jobDetail?.map((job,index)=>(
          <div key={index} >
            <JobView job={job} />
          </div>
        ))}
     
          
      
     
      </div>
  )
}

export default Home