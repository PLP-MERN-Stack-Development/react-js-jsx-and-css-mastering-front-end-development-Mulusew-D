import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home'
import Posts from './routes/posts'
import Layout from './components/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Layout>
  )
}
