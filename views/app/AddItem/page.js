import React from 'react'
import TopNavbar from '../components/TopBar'
import BottomNav from '../components/BottomBar'
import { navItems } from '../components/NavItems'
import AddItemPage from './AddItem'

const page = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <TopNavbar />
            <AddItemPage />
            <BottomNav items={navItems} />
        </div>
    )
}

export default page
