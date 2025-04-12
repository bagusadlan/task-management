import { Outlet } from 'react-router-dom'
import Header from './Navbar'

export default function Layout() {
  return (
    <>
      <Header />
      <main className='pt-[65px] md:pt-[100px]'>
        <Outlet />
      </main>
    </>
  )
}
