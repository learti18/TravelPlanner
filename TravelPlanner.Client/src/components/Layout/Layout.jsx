import {React,useState} from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import MobileMenu from '../MobileMenu/Mobilemenu';

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Login', path: '/login' },
      ];
  return (
    <div>
        
        <Navbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigation={navigation}
        />
        <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navigation={navigation}
        />
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
