
const populateAppointments = async (client) => {
    const time_array = []
    let requests = []

    for(let i = 1; i<=12;i++){
        for(let j = 1;j<60;j+=15){

            let hour = i.toString(10)
            let minute = j.toString(10)
            if(minute.length === 1){
                minute = minute + '0'
            }
            time_array.push(`${hour}:${minute}`)
        }
    }

    const date_array = []

    for (let i = 1; i<=6; i++){
        for(let j = 1; j<25; j+=5){
            let month = i.toString()
            let day = j.toString()
            if(i<10){
                month = '0'+month
            }
            if(j<10){
                day='0' + day
            }
            let date = `2023-${day}-${month}`

            let formattedDate = new Date(date),
            fmonth = '' + (formattedDate.getMonth() + 1),
            fday = '' + formattedDate.getDate(),
            year = formattedDate.getFullYear();

            if (fmonth.length < 2) 
                fmonth = '0' + fmonth;
            if (fday.length < 2) 
                fday = '0' + fday;

            formattedDate = [year, month, day].join('-');
            date_array.push(formattedDate)
        }
    }

    for(let i = 0; i<10; i++){
        for(let j = 0; j<20;j++){
            console.log('populating')
            let flag;
            if (j % 2 === 0){
                flag = true
            }else{
                flag=false
            }
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    start_time: time_array[j],
                    end_time: time_array[j+1],
                    date: date_array[i],
                    client_id: client._id,
                    title: 'Elias',
                    isPaid: flag,
                })
            };
            requests.push(fetch('/api/appointments',requestOptions));
        }
    }

    await Promise.all(requests)
}

export default populateAppointments