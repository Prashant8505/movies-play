import React, {useState, useEffect} from 'react'
import Image from '../spider.jpg'
import axios from 'axios'
import {Oval} from 'react-loader-spinner'
import Pagination from './Pagination'

function Movies() {
    const [page, setPage] = useState(1)
    const [hover, setHover] = useState('')
    const [favorites, setFavorites] = useState([])

   
   function goNext(){
      setPage(page + 1)
   }
   function goPrevious(){
      if(page > 1)
       setPage(page - 1)
   }


    const [movies, setMovies] = useState([])
    useEffect(function(){
        //everytime when page reloads
        let res = axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ff0f11f56f8e93d6b81b45166cd751a6&page=${page}`).
        then((res)=>{
            console.table(res.data.results)
            setMovies(res.data.results)
            let oldFav = localStorage.getItem("imdb")
            oldFav = JSON.parse(oldFav) || []
            setFavorites([...oldFav])
        })
    },[page])

    let add = (movie) => {
        let newArray = [...favorites, movie]
        setFavorites([...newArray]) 
        console.log(favorites)
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    let del = (movie) =>{
        let newArray = favorites.filter((m)=> m.id!=movie.id)
        setFavorites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
        console.log(favorites)
    }

  return (
    <div>
        <div className='m-8 text-xl font-bold'>Trending Movies</div>
        {
            movies.length == 0 ?
            <div className='flex justify-center'>
              <Oval color="#00BFFF" 
                    height={80} 
                    width={80}
                    secondaryColor='gray' />
            </div>:
            <div className="flex flex-wrap justify-center">
                {
                    movies.map((movie)=>(
                        <div className={`
                        bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                        md:h-[30vh] md:w-[250px] 
                        h-[25vh] w-[150px]
                        bg-center bg-cover
                        rounded-xl
                        flex items-end
                        m-4
                        hover:scale-110
                        ease-out duration-300
                        
                        relative
                    `}
                    onMouseEnter={()=> setHover(movie.id)}
                    onMouseLeave={()=>setHover("")}
                    >
                        {
                            hover == movie.id && <> {
                                !favorites.find((m)=> m.id == movie.id) ?
                                <div className='absolute top-2 
                                            right-2 p-2 bg-gray-800 
                                            rounded-xl cursor-pointer'
                                     onClick={()=>add(movie)}       
                                          
                                      >💗</div>
                              : <div className='absolute top-2               
                                                right-2 p-2 bg-gray-800 
                                                rounded-xl cursor-pointer'
                                     onClick={()=>del(movie)}             
                                      >❌</div>
              

                            }
                                 </>
                        }
                        
                            <div className="w-full bg-gray-900 text-white py-2 font-bold text-center rounded-b-xl">{movie.title} </div>
                        </div>
             
                    ))
                }
                      
        </div>
        }
        <Pagination page={page} goNext={goNext}
                    goPrevious={goPrevious} />
    </div>
  )
}

export default Movies