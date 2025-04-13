import { ChangeEvent, FormEvent, useState } from 'react'

import { TaskFormType } from '@/lib/types/taskType'
import { Button, Card, Form, Input, Label, Textarea } from '@/components/ui'
import { AddIcon } from '../icons'

const taskDefaultValue = {
  title: '',
  description: ''
}

function TaskForm({ onSubmit }: { onSubmit: (task: TaskFormType) => void }) {
  const [taskForm, setTaskForm] = useState<TaskFormType>(taskDefaultValue)

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setTaskForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    onSubmit(taskForm)
    setTaskForm(taskDefaultValue)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Card className='flex flex-col space-y-2 w-full'>
        <div>
          <Label htmlFor='title' className='text-sm text-accent-foreground mb-1'>
            Title
          </Label>
          <Input
            id='title'
            type='text'
            placeholder='Task title'
            className='mb-2 w-full'
            name='title'
            value={taskForm.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor='title' className='text-sm text-accent-foreground mb-1'>
            Description
          </Label>
          <Textarea
            id='description'
            placeholder='Task description'
            className='mb-2'
            name='description'
            value={taskForm.description}
            onChange={handleInputChange}
          />
        </div>
        <Button disabled={!(taskForm.title && taskForm.description)} type='submit' text='Add Task' icon={<AddIcon />} />
      </Card>
    </Form>
  )
}

export default TaskForm
