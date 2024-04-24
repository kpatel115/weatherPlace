import { server_details } from '../api/server';
import { useState, useEffect } from 'react'
// just to get the details data from server.ts 
export const useGetData = (id:string) => {

    const [ detailData, setData ] = useState<any>(null)

    async function handleDataFetch(){
      try {
        const response = await server_details.get(id);
        setData(response)
      } catch (error) {
        console.error("error fetching data: ", error)
      }
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

  return {
    detailData, getData:handleDataFetch,
  }}
