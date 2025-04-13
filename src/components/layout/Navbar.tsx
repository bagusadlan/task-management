import { Link, LinkProps, useNavigate } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

import { ROUTES } from '@/lib/config/routes'

import { useAppContext } from '@/contexts/AppContext'

import { Button, Container, Header, Image } from '@/components/ui'
import { AccountCircleIcon, CloseIcon, MenuIcon } from '@/components/icons'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useAuthContext } from '@/contexts/AuthContext'

const navbarLink: NavbarType[] = [
  {
    to: ROUTES.homepageRoute,
    text: 'TASK'
  },
  {
    to: ROUTES.productsPageRoute,
    text: 'PRODUCTS'
  },
  {
    to: ROUTES.cartPageRoute,
    text: 'CART'
  }
]

export default function Navbar() {
  const navigate = useNavigate()
  const deviceWidth = useMediaQuery()
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext()
  const { logout, isAuthenticated } = useAuthContext()

  const handleCloseSidebar = () => setIsSidebarOpen(false)

  const sidebarMotion = {
    initial: {
      x: !!deviceWidth && deviceWidth >= 768 ? '0%' : '100%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    active: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    handleCloseSidebar()
  }

  return (
    <Header className='z-30 fixed top-0 inset-x-0 bg-background'>
      <Container className='flex justify-between items-center py-2 md:py-0'>
        <Link to={ROUTES.homepageRoute}>
          <Image alt='Logo Celindo' src='/logo.svg' className='max-w-[178px]' />
        </Link>
        <motion.div
          initial='initial'
          animate={isSidebarOpen ? 'active' : 'initial'}
          variants={sidebarMotion}
          className='flex flex-col space-y-4 flex-nowrap md:items-center bg-card md:space-x-4 lg:space-x-8 md:space-y-0 fixed z-40 md:z-30 md:static h-full md:h-auto top-0 right-0 md:flex-row pt-5 px-4 pb-3 md:p-0 w-72 md:duration-0 min-w-max flex-1 md:pointer-events-auto'
        >
          <div className='flex justify-between items-center flex-wrap md:hidden'>
            <Button
              icon={<CloseIcon />}
              variant='ghost'
              size='sm'
              className='rounded-full w-10 h-10 md:hidden ml-auto'
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <nav className='md:flex justify-between py-[26px] items-center h-full md:ml-auto'>
            <div className='flex flex-col md:flex-row gap-9 items-center justify-between h-full'>
              <ul className='flex gap-9 items-center flex-col md:flex-row'>
                {navbarLink.map((link, index) => (
                  <li key={index}>
                    <NavbarLink to={link.to} text={link.text} onClick={handleCloseSidebar} />
                  </li>
                ))}
              </ul>
              {!isAuthenticated && (
                <Button
                  text='Sign In'
                  icon={<AccountCircleIcon />}
                  className='rounded-full py-3 px-6 h-auto text-[16px] w-full md:w-auto'
                  asLink={{ to: ROUTES.loginPageRoute, onClick: handleCloseSidebar }}
                />
              )}
              {isAuthenticated && (
                <Button
                  text='Logout'
                  icon={<AccountCircleIcon />}
                  variant='outlined'
                  color='danger'
                  className='rounded-full py-3 px-6 h-auto text-[16px] w-full md:w-auto'
                  onClick={handleLogout}
                />
              )}
            </div>
          </nav>
        </motion.div>
        <Button
          variant='ghost'
          icon={<MenuIcon className='h-6 w-6' />}
          className={twMerge('rounded-full w-10 h-10 md:hidden')}
          onClick={() => setIsSidebarOpen(true)}
        />
      </Container>
      <div
        className={`z-30 fixed top-0 left-0 w-screen h-screen bg-black/40 duration-500 transition-opacity ${
          isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleCloseSidebar}
      />
    </Header>
  )
}

type NavbarType = LinkProps & {
  text: string
}

function NavbarLink({ to, text, ...props }: NavbarType) {
  return (
    <Link to={to} className='hover:text-link-hover' {...props}>
      {text}
    </Link>
  )
}
