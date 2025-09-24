"use client"

import { useParams, useRouter } from "next/navigation"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Code,
  ExternalLink,
  Github,
  Play,
  MapPin,
  Calendar,
  Star,
  Award,
  Clock,
  Globe,
  Download,
  Share2,
  Zap,
  Target,
  Trophy,
  Rocket,
} from "lucide-react"
import { useStudent } from "@/hooks/use-students"

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const studentId = decodeURIComponent(params.id as string)
  
  // Use the custom hook to fetch student data
  const { student, loading, error } = useStudent(studentId)

 



  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
          <p className="text-sm font-medium text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-black mb-3">
            {error ? 'Error Loading Profile' : 'Profile Not Found'}
          </h1>
          {error && (
            <p className="text-sm text-gray-500 mb-4">{error}</p>
          )}
          <Button onClick={() => router.push("/")} variant="outline" className=" text-gray-700 hover:bg-gray-50 text-sm border">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Button>
        </div>
      </div>
    )
  }

  // Use normalized data
  const skillsCategories = student.skills
  const allExperiences = student.experience
  const allEducation = student.education
  
  // For header display, use the first/primary ones
  const primaryExperience = student.experience[0]
  const company = primaryExperience?.company || "Previous Experience"
  const role = primaryExperience?.role || ""
  
  const primaryEducation = student.education[0]
  const degree = primaryEducation?.degree || student.name
  const institution = primaryEducation?.institution || ""
  const grade = primaryEducation?.grade

  return (
    <div className="min-h-screen bg-white">
      <div ref={headerRef} className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="gap-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-sm font-medium border bg-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Candidates
            </Button>
            <div className="flex items-center gap-3">
              <div className="group relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white border-gray-200 text-gray-400 pointer-events-none text-xs"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1.5 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  Coming soon features
                </div>
              </div>
              <div className="group relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white border-gray-200 text-gray-400 pointer-events-none text-xs"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  <Download className="h-3 w-3" />
                  Resume
                </Button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1.5 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  Coming soon features
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div ref={sidebarRef} className="lg:col-span-1 space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 ring-2 ring-gray-200 shadow-sm">
                    <AvatarImage src={student.photo_link || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold text-xl">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
                  <p className="text-gray-600 font-medium text-sm">{role || "Software Developer"}</p>
                  {grade && (
                    <Badge className="bg-gray-100 text-gray-700 text-xs px-3 py-1 font-medium">
                      <Trophy className="h-3 w-3 mr-1" />
                      {grade} CGPA
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-orange-100">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-500">{institution || "Bangalore, India"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 font-medium">Available Now</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    size="sm"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm font-medium py-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Interview
                  </Button>
                  <div className="flex justify-center">
                    {student.github && (
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50" asChild>
                        <a href={student.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-gray-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Technical Skills</h3>
              </div>

              <div className="space-y-4">
                {skillsCategories.map((category, index) => {
                  // Define different color schemes for each category
                  const colorSchemes = [
                    {
                      dot: "bg-orange-500",
                      badge: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
                    },
                    {
                      dot: "bg-blue-500", 
                      badge: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                    },
                    {
                      dot: "bg-green-500",
                      badge: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                    },
                    {
                      dot: "bg-purple-500",
                      badge: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                    },
                    {
                      dot: "bg-red-500",
                      badge: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                    },
                    {
                      dot: "bg-indigo-500",
                      badge: "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                    },
                    {
                      dot: "bg-pink-500",
                      badge: "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200"
                    },
                    {
                      dot: "bg-teal-500",
                      badge: "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200"
                    }
                  ];
                  
                  const colorScheme = colorSchemes[index % colorSchemes.length];
                  
                  return (
                    <div key={index} className="space-y-2">
                      <h4 className="text-xs font-medium text-gray-700 flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${colorScheme.dot}`} />
                        {category.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {category.items.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className={`${colorScheme.badge} transition-colors text-xs px-2 py-0.5 font-medium`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-3 w-3 text-gray-600" />
                Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Experience</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs font-medium">
                    Mid-level
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Projects</span>
                  <span className="text-xs font-medium text-gray-900">2+ Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Status</span>
                    <Badge className="bg-orange-500 text-white text-xs font-medium">Available</Badge>
                </div>
              </div>
            </div>
          </div>

          <div ref={mainContentRef} className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                  <Rocket className="h-3 w-3 text-gray-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Summary</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {degree.includes("B.Tech") ? "Computer Science Engineering" : "Software Development"} professional with experience at {company}. Specialized in modern web technologies with a track record of developing scalable solutions.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-gray-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Education</h2>
              </div>

              <div className="space-y-4">
                {allEducation.length > 0 ? (
                  allEducation.map((education, index) => (
                    <div key={index} className="relative pl-6 border-l border-orange-200">
                      <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-orange-400 border-2 border-white"></div>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-gray-900">{education.degree || 'Degree'}</h3>
                            {education.field && (
                              <p className="text-xs text-gray-600">{education.field}</p>
                            )}
                            {education.institution && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs">{education.institution}</span>
                              </div>
                            )}
                            {education.grade && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-gray-400 fill-gray-400" />
                                <span className="text-xs text-gray-600">CGPA: {education.grade}/10.0</span>
                              </div>
                            )}
                          </div>
                          {education.year && (
                            <Badge className="bg-gray-100 text-gray-700 text-xs">{education.year}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">No education information available</p>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                  <Briefcase className="h-3 w-3 text-gray-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Experience</h2>
              </div>

              <div className="space-y-4">
                {allExperiences.length > 0 ? (
                  allExperiences.map((experience, index) => (
                    <div key={index} className="relative pl-6 border-l border-orange-200">
                      <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-orange-400 border-2 border-white"></div>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-gray-900">{experience.company || 'Company'}</h3>
                            {experience.role && <p className="text-xs text-gray-600">{experience.role}</p>}
                          </div>
                          {experience.duration && (
                            <Badge className="bg-gray-100 text-gray-700 text-xs">{experience.duration}</Badge>
                          )}
                        </div>

                        {experience.description && experience.description.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700 flex items-center gap-1">
                              <Award className="h-3 w-3 text-gray-500" />
                              Key Contributions
                            </h4>
                            <div className="space-y-2">
                              {experience.description.map((detail, detailIndex) => (
                                <div
                                  key={detailIndex}
                                  className="flex items-start gap-2 p-3 bg-gray-50 rounded-md"
                                >
                                  <div className="h-4 w-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="h-1 w-1 rounded-full bg-gray-500" />
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed flex-1">
                                    {detail.replace(/^[◦•\-*]\s*/, "")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Briefcase className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">No experience information available</p>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                  <Code className="h-3 w-3 text-gray-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Projects</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.deployed && (
                  <div className="group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-300 transition-all duration-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Live Project
                        </h3>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        A web application built with modern technologies featuring responsive design and best practices.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 2).map((category, index) => (
                          category.items.slice(0, 2).map((skill, skillIndex) => (
                            <Badge key={`${index}-${skillIndex}`} variant="secondary" className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5">
                              {skill}
                            </Badge>
                          ))
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 text-xs"
                        asChild
                      >
                        <a href={student.deployed} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-3 w-3 mr-1" />
                          View Project
                        </a>
                      </Button>
                    </div>
                  </div>
                )}

                {student.demo_video && (
                  <div className="group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-300 transition-all duration-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Demo Video
                        </h3>
                        <Play className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Technical walkthrough demonstrating implementation and features.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5">
                          Demo
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5">
                          Technical
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 text-xs"
                        asChild
                      >
                        <a href={student.demo_video} target="_blank" rel="noopener noreferrer">
                          <Play className="h-3 w-3 mr-1" />
                          Watch Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Ready to connect?</h2>
                  <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                    {student.name} brings technical expertise and proven experience. Schedule a conversation to discuss potential opportunities.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-6 py-2 text-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Interview
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-green-500" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-gray-400 fill-gray-400" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
