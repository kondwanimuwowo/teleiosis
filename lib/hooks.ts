'use client'

import { useEffect, useState } from 'react'
import { supabase, Teaching, TeachingCategory } from './supabase'

export function useTeachings(categoryId?: string) {
  const [teachings, setTeachings] = useState<Teaching[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeachings = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('teachings')
          .select('*')
          .order('published_date', { ascending: false })

        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }

        const { data, error: dbError } = await query

        if (dbError) {
          throw new Error(dbError.message)
        }

        setTeachings(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teachings')
      } finally {
        setLoading(false)
      }
    }

    fetchTeachings()
  }, [categoryId])

  return { teachings, loading, error }
}

export function useTeachingCategories() {
  const [categories, setCategories] = useState<TeachingCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const { data, error: dbError } = await supabase
          .from('teaching_categories')
          .select('*')
          .order('name', { ascending: true })

        if (dbError) {
          throw new Error(dbError.message)
        }

        setCategories(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useTeachingById(id: string) {
  const [teaching, setTeaching] = useState<Teaching | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeaching = async () => {
      try {
        setLoading(true)
        const { data, error: dbError } = await supabase
          .from('teachings')
          .select('*')
          .eq('id', id)
          .single()

        if (dbError) {
          throw new Error(dbError.message)
        }

        setTeaching(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teaching')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTeaching()
    }
  }, [id])

  return { teaching, loading, error }
}
