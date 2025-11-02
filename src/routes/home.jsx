import React from 'react'
import TaskManager from '../features/TaskManager'
import FetchPosts from '../features/FetchPosts'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskManager />
        <div>
          <Card>
            <h2 className="text-lg font-semibold mb-2">Welcome</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This demo app shows reusable components, state management, a custom hook for localStorage,
              theme switching, and API integration (posts). Resize to see responsive behavior. ✨
            </p>
          </Card>
        </div>
      </div>

      <FetchPosts />
    </div>
  )
}
