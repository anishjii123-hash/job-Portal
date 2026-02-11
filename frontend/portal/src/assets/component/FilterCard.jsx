import { RadioGroup } from '@/components/ui/radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { useEffect } from 'react'
import { setSearchQuery } from '@/redux/jobsSlice'
import { useDispatch } from 'react-redux'

const FilterCard = () => {
   const [selectValue, setSelectValue] = useState("")
   const dipatch = useDispatch();
    const changehandler =(value)=>{
        setSelectValue(value)
    }
    useEffect(()=>{
        dipatch(setSearchQuery(selectValue))
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
      array:["0-40K","42-1lakh","1lakh-5lakh","5lakh-10lakh","10lakh+"]
    },
  ]

  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100 bg-[#0bc1f4]  ' >
      <h1 className=' text-center rounded-2xl bg-[#6A38C2] text-white font-semibold shadow-2xl ' >Filter Jobs</h1>
      <hr className='mt-4' />
      <RadioGroup value={selectValue} onValueChange={changehandler}  >
  {filterData.map((item, index) => (
    <div key={index}>
      <h1 className="font-semibold text-lg ">
        {item.filterType}
      </h1>

      {item.array.map((subItem, subIndex) => {
        const id = `${item.filterType}-${subIndex}`

        return (
          <div
            key={subIndex}
            className="flex items-center space-x-2 my-2 "
          >
            <RadioGroupItem value={subItem} id={id} />
            <Label htmlFor={id}>{subItem}</Label>
          </div>
        )
      })}
    </div>
  ))}
</RadioGroup>
    </div>
  )
}

export default FilterCard
