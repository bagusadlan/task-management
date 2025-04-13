import { FormEvent, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Button, Container, Input, Card, Text, Stack, Divider, Form } from '@/components/ui'
import { ROUTES } from '@/lib/config/routes'
import { VisibilityIcon, VisibilityOffIcon } from '@/components/icons'
import { useAuthContext } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthContext()

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setRegisterForm({
      ...registerForm,
      [name]: value
    })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const { username, email, password } = registerForm

    if (!username || !email || !password) {
      setError('All fields are required')
      return
    }

    try {
      setIsLoading(true)
      const success = await register(username, email, password)
      console.log({ success })

      if (success) {
        navigate(ROUTES.homepageRoute)
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during sign in')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className='md:mt-14'>
      <Card className='flex flex-col gap-y-3 md:max-w-96 mx-auto px-2 py-0 md:py-6 shadow-transparent md:shadow-normal'>
        <Form onSubmit={onSubmit}>
          <Stack spacing={0} className='gap-y-3'>
            <Text variant='h3' className='text-xl'>
              Sign Up
            </Text>
            <Input
              type='text'
              name='username'
              value={registerForm.username}
              onChange={handleInputChange}
              placeholder='Username'
              className='w-full flex-1'
            />
            <Input
              type='email'
              name='email'
              value={registerForm.email}
              onChange={handleInputChange}
              placeholder='Email'
              className='w-full flex-1'
            />
            <div className='flex relative items-center'>
              <Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={registerForm.password}
                onChange={handleInputChange}
                autoComplete='on'
              />
              <div className='absolute right-3 cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? (
                  <VisibilityIcon className='text-muted-foreground' />
                ) : (
                  <VisibilityOffIcon className='text-muted-foreground' />
                )}
              </div>
            </div>
            <Button
              text='Sign Up'
              variant='outlined'
              color='primary'
              className='w-full'
              type='submit'
              loading={isLoading}
            />

            {error && (
              <Card className='bg-danger/10 border-danger/50 mb-4 p-3'>
                <Text variant='error'>{error}</Text>
              </Card>
            )}
          </Stack>
        </Form>
        <Stack direction='row' spacing={2} className='mx-auto w-full items-center justify-center my-4'>
          <Divider className='text-muted-foreground w-[30%]' direction='horizontal' />
          <span className='text-muted-foreground'>Or</span>
          <Divider className='text-muted-foreground w-[30%]' direction='horizontal' />
        </Stack>
        <div className='text-xs text-center'>
          Already have an account?{' '}
          <Link to={ROUTES.loginPageRoute} className='text-primary'>
            Sign In
          </Link>
        </div>
      </Card>
    </Container>
  )
}
