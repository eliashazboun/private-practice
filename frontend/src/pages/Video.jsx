import { useState } from "react"
import BookingCalendar from "../components/BookingCalendar/BookingCalendar"
import axios from 'axios'

const Video = () => {
   

    const [response, setResponse] = useState()

    const data = {
        

    }

    const handleClick = async (e) => {
        try{
            const res = await axios.post('/api/login')
            // const res = await axios.get('/api/clients')
            const json = JSON.stringify(res)

            setResponse(json)
            
            console.log(json)



        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className="video">
            <div className="wrapper">
                <h1>testing</h1>
                <button onClick={handleClick}>Hello</button>
                {response}

            </div>
            
        </div>
    )
}

export default Video