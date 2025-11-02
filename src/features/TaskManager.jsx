import React, { useState, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Card from '../components/Card'
import Button from '../components/Button'

function NewTask({ onAdd }) {
  const [text, setText] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd({ id: Date.now(), text: trimmed, completed: false })
    setText('')
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={text} onChange={e => setText(e.target.value)} className="flex-1 p-2 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700" placeholder="Add task..." />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks-v1', [])
  const [filter, setFilter] = useState('all')

  const addTask = (task) => setTasks(prev => [task, ...prev])
  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const del = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const clearCompleted = () => setTasks(prev => prev.filter(t => !t.completed))

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-3">Task Manager</h2>
      <NewTask onAdd={addTask} />
      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-sm text-gray-500">No tasks</div>
        ) : (
          filtered.map(task => (
            <div key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id)} className="w-5 h-5" />
                <div className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => del(task.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2">
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
          <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">{tasks.filter(t => !t.completed).length} remaining</div>
          <Button variant="danger" onClick={clearCompleted}>Clear completed</Button>
        </div>
      </div>
    </Card>
  )
}
