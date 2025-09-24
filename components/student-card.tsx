"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { NormalizedStudent } from "@/lib/supabase"

interface StudentCardProps {
  student: NormalizedStudent
}

export function StudentCard({ student }: StudentCardProps) {
  const router = useRouter()

  // Get top skills from normalized data
  const displaySkills = student.skills
    .flatMap(category => category.items)
    .slice(0, 5) // Show exactly 5 skills

  // Get primary education info (highest degree, excluding AI Engineering course)
  const primaryEducation = student.education[0]
  const degree = primaryEducation?.degree || "Computer Science Graduate"
  const institution = primaryEducation?.institution || ""
  const grade = primaryEducation?.grade

  // Get primary work experience
  const primaryExperience = student.experience[0]
  const currentRole = primaryExperience?.role || ""
  const currentCompany = primaryExperience?.company || ""

  const handleCardClick = () => {
    router.push(`/student/${encodeURIComponent(student.email)}`)
  }

  return (
    <Card
      className="group cursor-pointer border border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg h-[360px] flex flex-col"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-16 w-16 ring-2 ring-gray-200 group-hover:ring-orange-300 flex-shrink-0">
            <AvatarImage src={student.photo_link || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback className="bg-gray-100 text-gray-700 font-semibold text-lg">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 mb-1">
              {student.name}
            </h3>
            {grade && (
              <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200 mb-2">
                {grade} CGPA
              </Badge>
            )}
            <p className="text-sm text-gray-600 leading-relaxed">{degree}</p>
            {institution && <p className="text-xs text-gray-500 mt-1">{institution}</p>}
            {(currentRole || currentCompany) && (
              <div className="text-xs text-orange-600 font-medium mt-1">
                {currentRole && currentCompany ? (
                  <span>{currentRole} @ {currentCompany}</span>
                ) : currentCompany ? (
                  <span>@ {currentCompany}</span>
                ) : currentRole ? (
                  <span>{currentRole}</span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="border-l-4 border-orange-500 pl-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {displaySkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3">
            {student.github && <span className="text-xs text-orange-600 font-medium">GitHub</span>}
            {student.deployed && <span className="text-xs text-orange-600 font-medium">Portfolio</span>}
          </div>
          <div className="text-xs text-gray-500 group-hover:text-orange-600">
            View Profile →
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
