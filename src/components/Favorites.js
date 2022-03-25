import React , {useState, useEffect} from 'react'
import Pagination from './Pagination'

function Favorites() {

  const [curGenre, SetCurGenre] = useState("All Genres")
  const [favourites, setFavourites] = useState([])
  const [genres, setGenres] = useState([])
  const [rating, setRating] = useState(0)
  const [popularity, setPopularity] = useState(0)
  const [search, setSearch] = useState("")
  const [rows, setRows] = useState(5)
  const [curPage, setCurPage] = useState(1)

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }

  useEffect(()=>{
    let oldFav = localStorage.getItem("imdb")
    oldFav = JSON.parse(oldFav) || []
    setFavourites([...oldFav])
  },[])

useEffect(()=>{
  let temp = favourites.map((movie)=> genreids[movie.genre_ids[0]])
   temp = new Set(temp)
  setGenres(["All Genres",...temp])
},
[favourites])

  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb", JSON.stringify(newArray))
  }

//Filter
  let filteredMovies = []
  filteredMovies = curGenre == "All Genres" ? favourites : 
  favourites.filter((movie)=> genreids[movie.genre_ids[0]] == curGenre)

//Sorting  
  if(rating == 1){
     filteredMovies = filteredMovies.sort(function(objA, objB){
       return objA.vote_average - objB.vote_average
     })
  }else if(rating == -1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objB.vote_average - objA.vote_average
    })
  }

  if(popularity == 1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objA.popularity - objB.popularity
    })
 }else if(popularity == -1){
   filteredMovies = filteredMovies.sort(function(objA, objB){
     return objB.popularity - objA.popularity
   })
 }
 
 

//Searching
filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )
//pagination
let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (curPage - 1) * rows
  let ei = Number(si) + Number(rows)

  filteredMovies = filteredMovies.slice(si, ei);

  let goPrevious = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1)
    }
  }

  let goNext = () => {
    if (curPage < maxPage) {
      setCurPage(curPage + 1)
    }
  }



  return (
    <div>
      <div className='flex justify-center flex-wrap space-x-2 mt-2'>
        {
          genres.map((genre)=>
          <button className={curGenre == genre ?
          'm-2 bg-blue-500 hover:bg-blue-400 text-xl p-2  text-white rounded-xl font-bold':
          ' m-2 text-xl p-2 bg-gray-400 text-white rounded-xl font-bold'}
          onClick={()=>{
            setCurPage(1)
            SetCurGenre(genre)}}
          >{genre}</button>
          )
        }
       
        </div>
      <div className='text-center'>
        <input type='text' placeholder='Search' value={search} 
               onChange={(e)=>setSearch(e.target.value)}
               className='border border-2 text-center p-2 m-2'/>
        <input type='number' placeholder='Rows' value={rows}
               onChange={(e)=>setRows(e.target.value)}
               className='border border-2 text-center p-2 m-2'/>
      </div>
      <div>
      <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/ios/50/000000/chevron-up.png"
                         className='mr-2 cursor-pointer w-5'
                         onClick={()=>{
                           setPopularity(0)
                           setRating(-1)}}/>
                    Rating
                    <img src="https://img.icons8.com/ios/50/000000/chevron-down.png"
                         className='ml-2 mr-2 w-5 cursor-pointer'
                         onClick={()=>{
                           setPopularity(0)
                           setRating(1)}}/>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/ios/50/000000/chevron-up.png"
                         className='mr-2 cursor-pointer w-5'
                         onClick={()=>{
                           setRating(0)
                           setPopularity(-1)}}/>
                    Popularity
                    <img src="https://img.icons8.com/ios/50/000000/chevron-down.png"
                         className='ml-2 mr-2 w-5 cursor-pointer'
                         onClick={()=>{
                           setRating(0)
                           setPopularity(1)}}/>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{movie.original_title}</div>
                          <div className="text-sm text-gray-500">{movie.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.vote_average}</div>
                    </td>
                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.popularity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {genreids[movie.genre_ids[0]]}
                      </span>                                                                                                                                           
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button href="#" className="text-indigo-600 hover:text-indigo-900"
                       onClick={() => del(movie)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      </div>
      <div className='mt-4'>
        <Pagination page={curPage} goNext={goNext}
                    goPrevious={goPrevious} />
      </div>
    </div>
  )
}

export default Favorites