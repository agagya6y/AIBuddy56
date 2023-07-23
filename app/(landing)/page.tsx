
import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import React from 'react'

const Home = () => {
  return (
    <div className='h-full'>
     <LandingNavbar/>
     <LandingHero/>
    
    </div>
  )
}

export default Home