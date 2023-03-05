import React, { useContext, useEffect, useState } from 'react'
import { fetchMovieListApi } from 'services/movie'

export const useMovieList = () => {
    const [movieList, setMovieList] = useState([])
    // const [_, setLoadingState] = useContext()

    useEffect(()=>{
        getMovieList();
    }, [])

    const getMovieList = async () => {
        const result = await fetchMovieListApi();
        console.log(result)
        setMovieList(result.data.content)
    }

    return movieList;
}