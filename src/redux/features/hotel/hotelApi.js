import { baseURL } from '@/utils/baseURL'
import  {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const hotelApi=createApi({
    reducerPath:'hotelApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${baseURL()}/api/`,

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
        })
    })
})

export const {useGetHotelsQuery,useGetHotelByIdQuery} = hotelApi
export default hotelApi
