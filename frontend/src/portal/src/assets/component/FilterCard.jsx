// import { RadioGroup } from '@/components/ui/radio-group'
// import { RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from "@/components/ui/label"
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { setSearchQuery } from '@/redux/jobsSlice'
// import { useDispatch } from 'react-redux'

// const FilterCard = () => {
//    const [selectValue, setSelectValue] = useState("")
//    const dipatch = useDispatch();
//     const changehandler =(value)=>{
//         setSelectValue(value)
//     }
//     useEffect(()=>{
//         dipatch(setSearchQuery(selectValue))
//     },[selectValue])
//   const filterData = [
//     {
//       filterType:"Location",
//       array:["Delhi NCR","Bangalore","Gurugram","Hyderabad","Mumbai","Chennai","Kolkata"]
//     },
//       {
//       filterType:"Industry",
//       array:["Frontend Developer","Backend Developer","Data Science","Full Stack Developer"]
//     },
//       {
//       filterType:"Salary Range",
//       array:["0-40K","42-1lakh","1lakh-5lakh","5lakh-10lakh","10lakh+"]
//     },
//   ]

//   return (
//     <div className='p-5 rounded-md shadow-xl border border-gray-100 bg-[#0bc1f4]  ' >
//       <h1 className=' text-center rounded-2xl bg-[#6A38C2] text-white font-semibold shadow-2xl ' >Filter Jobs</h1>
//       <hr className='mt-4' />
//       <RadioGroup value={selectValue} onValueChange={changehandler}  >
//   {filterData.map((item, index) => (
//     <div key={index}>
//       <h1 className="font-semibold text-lg ">
//         {item.filterType}
//       </h1>

//       {item.array.map((subItem, subIndex) => {
//         const id = `${item.filterType}-${subIndex}`

//         return (
//           <div
//             key={subIndex}
//             className="flex items-center space-x-2 my-2 "
//           >
//             <RadioGroupItem value={subItem} id={id} />
//             <Label htmlFor={id}>{subItem}</Label>
//           </div>
//         )
//       })}
//     </div>
//   ))}
// </RadioGroup>
//     </div>
//   )
// }

// export default FilterCard
import { RadioGroup } from '@/components/ui/radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobsSlice'

const FilterCard = () => { 
  const [selectValue, setSelectValue] = useState("")
  const dispatch = useDispatch();

  const changeHandler =(value)=>{
    setSelectValue(value)
  }

  useEffect(()=>{
    dispatch(setSearchQuery(selectValue))
  },[selectValue])

  const filterData = [
    {
      filterType:"Location",
      array:["Delhi NCR","Bangalore","Gurugram","Hyderabad","Mumbai","Chennai","Kolkata"]
    },
    {
      filterType:"Industry",
      array:["Frontend Developer","Backend Developer","Data Science","Full Stack Developer"]
    },
    {
      filterType:"Salary Range",
      array:["0-40K","42K-1Lakh","1Lakh-5Lakh","5Lakh-10Lakh","10Lakh+"]
    },
  ]

  return (
    <div className='p-5 rounded-xl shadow-xl border border-[#2a1a4a] 
      bg-gradient-to-b from-[#0B0016] via-[#12001F] to-[#1A0033] 
      text-white max-w-sm mx-auto sm:mx-0'>

      <h1 className='text-center rounded-2xl bg-[#6A38C2] text-white font-semibold shadow-lg py-2 mb-4'>
        Filter Jobs
      </h1>

      <RadioGroup value={selectValue} onValueChange={changeHandler}>
        {filterData.map((item, index) => (
          <div key={index} className='mb-4'>
            <h2 className="font-semibold text-base sm:text-lg mb-2">{item.filterType}</h2>

            {item.array.map((subItem, subIndex) => {
              const id = `${item.filterType}-${subIndex}`

              return (
                <div key={subIndex} className="flex items-center space-x-2 my-1">
                  <RadioGroupItem 
                    value={subItem} 
                    id={id} 
                    className="border-gray-400 checked:bg-[#6A38C2] focus:ring-2 focus:ring-[#7209b7]"
                  />
                  <Label htmlFor={id} className="text-sm sm:text-base text-gray-200">{subItem}</Label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard;