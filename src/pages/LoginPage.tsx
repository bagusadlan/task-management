import { Link } from 'react-router-dom'

import { Container, Card, Text, Stack, Divider } from '@/components/ui'

import { ROUTES } from '@/lib/config/routes'
import { LoginForm } from '@/components/container'

export default function LoginPage() {
  return (
    <Container className='md:mt-14'>
      <Card className='flex flex-col gap-y-3 md:max-w-96 mx-auto px-2 py-0 md:py-6 shadow-none md:shadow-sm'>
        <Stack spacing={0} className='gap-y-3'>
          <Text variant='h3' className='text-xl'>
            Sign In
          </Text>
          <LoginForm />
        </Stack>
        <Stack direction='row' spacing={2} className='mx-auto w-full items-center justify-center my-4'>
          <Divider className='text-muted-foreground w-[30%]' direction='horizontal' />
          <span className='text-muted-foreground'>Or</span>
          <Divider className='text-muted-foreground w-[30%]' direction='horizontal' />
        </Stack>
        <div className='text-xs text-center'>
          Don't have account yet?{' '}
          <Link to={ROUTES.registerPageRoute} className='text-primary'>
            Sign Up
          </Link>
        </div>
      </Card>
    </Container>
  )
}
