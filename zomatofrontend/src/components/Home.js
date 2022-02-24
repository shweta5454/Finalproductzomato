import React from 'react'
import Wallpaper from './Wallpaper'
import Quicksearch from './Quicksearch'
import Filter from '../components/Filter'
import { Link } from 'react-router-dom'
// import QuickSearch from './QuickSearch'
export default function Home() {
    return (
        <div>
            <React.Fragment>
                <Wallpaper s2="pqr"/> 
                <Quicksearch/> 
               
            </React.Fragment>
           
        </div>
    )
}