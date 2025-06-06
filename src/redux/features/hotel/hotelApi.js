import { baseURL } from '@/utils/baseURL'
import  {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const hotelApi=createApi({
    reducerPath:'hotelApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${baseURL()}/api/`,
        prepareHeaders:async(headers,{getState})=>{
            const token=await window?.Clerk?.session?.getToken();
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }
        }

    }),
    endpoints:(builder)=>({
        getHotels:builder.query({
            query:()=>({
                url:'hotels',
                method:'GET'
            })
        }),
        getHotelById:builder.query({
            query:(id)=>({
                url:`hotels/${id}`,
                method:'GET'
            })
        }),
        createHotel:builder.mutation({
            query:(hotelData)=>({
               url:'hotels',
               method:'POST',
               body:hotelData
            })
        })
    })
})

export const {useGetHotelsQuery,useGetHotelByIdQuery,useCreateHotelMutation} = hotelApi
export default hotelApi
