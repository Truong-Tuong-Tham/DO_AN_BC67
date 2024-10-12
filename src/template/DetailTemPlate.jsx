import React from 'react'
import HeaderDetail from '../page/DetailJob/Component/Header'
import { Outlet } from 'react-router-dom'
import ListTypeJobsDetail from '../page/DetailJob/Component/ListType'
import BackToTop from '../page/Component/BackToTop'

const DetailTemPlate = () => {
  return (
    <div className='w-full'>
<HeaderDetail/>
<BackToTop/>
<ListTypeJobsDetail/>
<Outlet/>

    </div>
  )
}

export default DetailTemPlate