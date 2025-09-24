"use client"

import { useEffect, useRef, useState } from "react"
import { StudentCard } from "@/components/student-card"
import { Input } from "@/components/ui/input"
import { Search, Phone } from "lucide-react"
import { NormalizedStudent } from "@/lib/supabase"
import { useStudents } from "@/hooks/use-students"

export default function StudentsPage() {
  const headerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStudents, setFilteredStudents] = useState<NormalizedStudent[]>([])
  
  // Use the custom hook to fetch students
  const { students, loading, error } = useStudents()

  // Custom sorting function to prioritize specific students
  const sortStudents = (studentsList: NormalizedStudent[]) => {
    return studentsList.sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      
      // Define priority order: Mayank (1st), Tathagat (2nd), Pranav (3rd)
      const getPriority = (name: string) => {
        if (name.includes('mayank')) return 1
        if (name.includes('tathagat')) return 2
        if (name.includes('pranav')) return 3
        return 999 // All others get lower priority
      }
      
      const aPriority = getPriority(aName)
      const bPriority = getPriority(bName)
      
      // Sort by priority (lower number = higher priority)
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      
      // If same priority, maintain original order
      return 0
    })
  }

  // Update filtered students when students data changes
  useEffect(() => {
    const sortedStudents = sortStudents([...students])
    setFilteredStudents(sortedStudents)
  }, [students])

  // Filter students based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      const sortedStudents = sortStudents([...students])
      setFilteredStudents(sortedStudents)
    } else {
      const filtered = students.filter(student => {
        const searchLower = searchTerm.toLowerCase()
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.skills.some(category => 
            category.items.some(skill => skill.toLowerCase().includes(searchLower))
          ) ||
          student.education.some(edu => 
            edu.degree.toLowerCase().includes(searchLower) ||
            edu.institution.toLowerCase().includes(searchLower) ||
            edu.field.toLowerCase().includes(searchLower)
          )
        )
      })
      const sortedFiltered = sortStudents(filtered)
      setFilteredStudents(sortedFiltered)
    }
  }, [searchTerm, students])




  return (
    <div className="min-h-screen bg-gray-50">
      <header ref={headerRef} className="border-b border-gray-200 bg-black  top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-8 ">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://masai-website-images.s3.ap-south-1.amazonaws.com/Frame_6_2_21456d0338.svg" alt="Misogi AI Logo" className="h-8 w-auto" />
                <h1 className="text-3xl font-bold text-white">
                  Discover <span className="text-orange-500">Talent</span> That Inspires
                </h1>
              </div>
              <p className="text-white max-w-2xl">
                Connect with exceptional students from India's premier institutions. Discover talented individuals from
                Misogi AI.
              </p>
            </div>

            <div className="flex items-center gap-3 ml-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 border-gray-600 focus:border-orange-500 focus:ring-orange-500 text-white"
                />
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
                <Phone className="h-4 w-4 mr-2 inline" />
                Book a call
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading students:</p>
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredStudents.length} of {students.length} students
              {searchTerm && (
                <span className="ml-2">
                  for "<span className="font-medium text-orange-600">{searchTerm}</span>"
                </span>
              )}
            </div>
            
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentCard key={student.email} student={student} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 
                      `No students match your search for "${searchTerm}". Try a different search term.` :
                      "No students available at the moment."
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
