import { useState, useEffect } from 'react'
import { NormalizedStudent } from '@/lib/supabase'

export function useStudents() {
  const [students, setStudents] = useState<NormalizedStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true)
        setError(null)
        
        // Dynamic import to avoid SSR issues
        const { DatabaseService } = await import('@/lib/database')
        const { students: fetchedStudents } = await DatabaseService.getStudents({ limit: 50 })
        
        setStudents(fetchedStudents)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch students'
        setError(errorMessage)
        console.error('Error fetching students:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  return { students, loading, error }
}

export function useStudent(email: string) {
  const [student, setStudent] = useState<NormalizedStudent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!email) return

    async function fetchStudent() {
      try {
        setLoading(true)
        setError(null)
        
        // Dynamic import to avoid SSR issues
        const { DatabaseService } = await import('@/lib/database')
        const fetchedStudent = await DatabaseService.getStudent(email)
        
        setStudent(fetchedStudent)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch student'
        setError(errorMessage)
        console.error('Error fetching student:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [email])

  return { student, loading, error }
}
