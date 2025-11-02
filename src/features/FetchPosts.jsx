import React, { useEffect, useState, useRef, useCallback } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const PAGE_SIZE = 10 // how many posts per API page
const VISIBLE_LIMIT = 10 // how many posts displayed at once before clicking "Load More"

export default function FetchPosts() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(VISIBLE_LIMIT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef()

  // ✅ Fetch posts from DummyJSON (English)
  const fetchPage = useCallback(async (pageToLoad = 1) => {
    setLoading(true)
    setError(null)
    try {
      const skip = (pageToLoad - 1) * PAGE_SIZE
      const res = await fetch(`https://dummyjson.com/posts?limit=${PAGE_SIZE}&skip=${skip}`)
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()

      if (data.posts.length < PAGE_SIZE) setHasMore(false)
      setPosts(prev => (pageToLoad === 1 ? data.posts : [...prev, ...data.posts]))
    } catch (e) {
      setError(e.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  // ✅ Initial load
  useEffect(() => {
    fetchPage(1)
    setPage(1)
    setVisibleCount(VISIBLE_LIMIT)
    setHasMore(true)
  }, [fetchPage])

  // ✅ Infinite scroll (auto-load first 3 pages)
  const lastPostRef = useCallback(
    node => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && page < 3) {
          setPage(prev => {
            const next = prev + 1
            fetchPage(next)
            return next
          })
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, fetchPage, page]
  )

  // ✅ Search filter
  const results = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.body.toLowerCase().includes(query.toLowerCase())
  )

  // ✅ Only show limited posts until user loads more
  const visiblePosts = results.slice(0, visibleCount)

  // ✅ "Load More" button expands visible posts or fetches new ones if needed
  const handleLoadMore = () => {
    if (visibleCount < results.length) {
      // show next batch of posts
      setVisibleCount(prev => prev + VISIBLE_LIMIT)
    } else if (hasMore) {
      // fetch next page if we’ve shown all fetched posts
      const next = page + 1
      fetchPage(next)
      setPage(next)
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Posts (DummyJSON API)</h2>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visiblePosts.map((p, index) => {
          const isLast = index === visiblePosts.length - 1
          return (
            <article
              key={p.id}
              ref={isLast ? lastPostRef : null}
              className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow transition hover:shadow-md"
            >
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{p.body}</p>
            </article>
          )
        })}
      </div>

      {/* ✅ Footer controls */}
      <div className="flex items-center justify-center">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {!loading && (hasMore || visibleCount < results.length) && (
          <Button onClick={handleLoadMore} className="mt-2">
            Load More
          </Button>
        )}
        {!hasMore && visibleCount >= results.length && (
          <div className="text-sm text-gray-500 mt-2">No more posts 🎉</div>
        )}
      </div>
    </Card>
  )
}
