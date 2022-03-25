import React , {useState, useEffect} from 'react'
import Image from '../spider.jpg'
import axios from 'axios'

export default function () {
  const [movie, setMovie] = useState({})
    useEffect(function(){
        let res = axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=ff0f11f56f8e93d6b81b45166cd751a6").
        then((res)=>{
            console.table(res.data.results)
            setMovie(res.data.results[1])
        })
    },[])
  return (
    <div>
        <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[60vh] bg-center bg-cover flex items-end justify-center`}>
            <div className='text-5xl text-white p-4 bg-gray-900
            flex justify-center bg-opacity-50 w-full'>{movie.title}</div>
        </div>
    </div>
  )
}
