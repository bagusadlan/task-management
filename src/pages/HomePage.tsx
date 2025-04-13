import { useState, useEffect } from 'react'

import { TaskForm } from '@/components/container'
import { CheckIcon, DeleteOutlineIcon, UndoIcon } from '@/components/icons'
import { Button, Card, Stack, Text } from '@/components/ui'
import { TaskFormType, TaskType } from '@/lib/types/taskType'

export default function TaskManagement() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = ({ title, description }: TaskFormType) => {
    if (title.trim() === '') return

    const newTask: TaskType = {
      taskID: Date.now(),
      title,
      description: description,
      completed: false
    }

    setTasks([newTask, ...tasks])
  }

  const toggleTaskStatus = (taskID: TaskType['taskID']) => {
    setTasks(tasks.map(task => (task.taskID === taskID ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskID: TaskType['taskID']) => {
    setTasks(tasks.filter(task => task.taskID !== taskID))
  }

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'active') return !task.completed
    if (activeTab === 'completed') return task.completed
    return true
  })

  return (
    <Card className='max-w-4xl mx-auto p-2 sm:py-6 sm:px:2'>
      <Text variant='h2' className='text-2xl md:text-3xl md:mb-6 text-center'>
        Task Management
      </Text>

      <TaskForm onSubmit={addTask} />

      <Stack direction='row' spacing={0} className='mt-8 mb-4 bg-accent rounded-lg overflow-hidden'>
        <Button
          onClick={() => setActiveTab('all')}
          variant={activeTab === 'all' ? 'default' : 'ghost'}
          className='flex-1 h-auto rounded-none'
          text='All Tasks'
        />
        <Button
          onClick={() => setActiveTab('active')}
          variant={activeTab === 'active' ? 'default' : 'ghost'}
          className='flex-1 h-auto rounded-none'
          text='Active'
        />
        <Button
          onClick={() => setActiveTab('completed')}
          variant={activeTab === 'completed' ? 'default' : 'ghost'}
          className='flex-1 h-auto rounded-none'
          text='Completed'
        />
      </Stack>

      <Stack spacing={4}>
        <Text variant='h2' className='text-xl font-semibold'>
          {activeTab === 'all' && 'All Tasks'}
          {activeTab === 'active' && 'Active Tasks'}
          {activeTab === 'completed' && 'Completed Tasks'}
          <span className='ml-2 text-accent-foreground/50'>({filteredTasks.length})</span>
        </Text>

        {filteredTasks.length === 0 ? (
          <Card className='text-center p-8 bg-accent rounded-lg shadow-none'>
            <Text className='text-accent-foreground/60'>No tasks to display</Text>
          </Card>
        ) : (
          <div>
            {filteredTasks.map(task => (
              <Card
                key={task.taskID}
                className={`mb-4 border ${task.completed ? 'bg-success/10 border-success/50' : 'border-accent'}`}
              >
                <Stack direction='row' className='justify-between mb-2'>
                  <Text
                    variant='h3'
                    className={`text-lg font-medium ${
                      task.completed ? 'line-through text-accent-foreground/50' : 'text-accent-foreground'
                    }`}
                  >
                    {task.title}
                  </Text>
                  <Stack spacing={2} className='md:flex-row md:gap-x-2'>
                    <Button
                      onClick={() => toggleTaskStatus(task.taskID)}
                      color={task.completed ? 'caution' : 'success'}
                      text={task.completed ? 'Undo' : 'Complete'}
                      icon={task.completed ? <UndoIcon /> : <CheckIcon />}
                      size='sm'
                    />
                    <Button
                      onClick={() => deleteTask(task.taskID)}
                      color='danger'
                      text='Delete'
                      icon={<DeleteOutlineIcon />}
                      size='sm'
                    />
                  </Stack>
                </Stack>
                <Text className={`text-sm ${task.completed ? 'text-accent-foreground/50' : 'text-accent-foreground'}`}>
                  {task.description}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </Stack>
    </Card>
  )
}
