import { FormEvent, useState } from 'react'

import { useAuthContext } from '@/contexts/AuthContext'

import { Button, Input, Form, Card, Text } from '@/components/ui'

import { VisibilityIcon, VisibilityOffIcon } from '@/components/icons'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib/config/routes'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const { email, password } = loginForm

    if (!email || !password) {
      setError('All fields are required')
      return
    }

    try {
      setIsLoading(true)
      const success = await login(email, password)

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
    <Form onSubmit={onSubmit} className='flex flex-col gap-y-3'>
      <Input
        type='email'
        name='email'
        value={loginForm.email}
        onChange={handleInputChange}
        placeholder='Enter email'
        className='w-full flex-1'
      />
      <div className='flex relative items-center'>
        <Input
          name='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={loginForm.password}
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
      <Button type='submit' text='Sign In' variant='outlined' color='primary' className='w-full' loading={isLoading} />

      {error && (
        <Card className='bg-danger/10 border-danger/50 mb-4 p-3'>
          <Text variant='error'>{error}</Text>
        </Card>
      )}
    </Form>
  )
}
