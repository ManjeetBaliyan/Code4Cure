// Home of the website
import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

function Home() {
  return (
    <div>
      {/* Add the Components on the Home page.*/}
       <Header/> 
       <SpecialityMenu/>
       <TopDoctors/>
       <Banner/>
    </div>
  )
}

export default Home