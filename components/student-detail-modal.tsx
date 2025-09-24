"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, Briefcase, Code, ExternalLink, Github, Play, Mail, MapPin } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface StudentDetailModalProps {
  student: {
    id: string
    name: string
    email: string
    education: string
    experience: string
    skills: string
    photo: string
    githubUrl: string
    projectUrl: string
    demoUrl: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // GSAP animation for modal content
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [isOpen])

  if (!student) return null

  // Parse skills into categories
  const skillsLines = student.skills.split("\n").filter((line) => line.trim())
  const skillsCategories = skillsLines
    .map((line) => {
      const [category, skills] = line.split(":")
      return {
        category: category?.replace(/^[•\-*]\s*/, "").trim() || "Skills",
        skills:
          skills
            ?.split(",")
            .map((s) => s.trim())
            .filter(Boolean) || [],
      }
    })
    .filter((cat) => cat.skills.length > 0)

  // Parse experience
  const experienceLines = student.experience.split("\n").filter((line) => line.trim())
  const company = experienceLines[0] || "Previous Experience"
  const role = experienceLines[1] || ""
  const details = experienceLines.slice(2)

  // Parse education
  const educationParts = student.education.split(" from ")
  const degree = educationParts[0] || student.education
  const institution = educationParts[1]?.split(" (")[0] || ""
  const grade = student.education.match(/$$Grade = ([\d.]+)$$/)?.[1]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card/95 backdrop-blur-sm border-orange/20">
        <ScrollArea className="max-h-[90vh]">
          <div ref={contentRef} className="p-6 space-y-6">
            {/* Header */}
            <DialogHeader className="space-y-4">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 ring-4 ring-orange/20">
                  <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback className="bg-orange/10 text-orange font-bold text-2xl">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <DialogTitle className="text-3xl font-bold text-foreground">{student.name}</DialogTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-orange hover:bg-orange/90 text-orange-foreground"
                      asChild
                    >
                      <a href={`mailto:${student.email}`} target="_blank" rel="noopener noreferrer">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </a>
                    </Button>
                    {student.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={student.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <Separator className="bg-border/50" />

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-orange" />
                <h3 className="text-xl font-semibold text-foreground">Education</h3>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">{degree}</h4>
                  {institution && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{institution}</span>
                    </div>
                  )}
                  {grade && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange/10 text-orange border-orange/20">
                        Grade: {grade}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-orange" />
                <h3 className="text-xl font-semibold text-foreground">Experience</h3>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{company}</h4>
                    {role && <p className="text-sm text-orange font-medium">{role}</p>}
                  </div>
                  {details.length > 0 && (
                    <div className="space-y-2">
                      {details.map((detail, index) => (
                        <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                          {detail.replace(/^[◦•\-*]\s*/, "• ")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-orange" />
                <h3 className="text-xl font-semibold text-foreground">Technical Skills</h3>
              </div>
              <div className="space-y-4">
                {skillsCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">{category.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-orange/10 text-orange border-orange/20 hover:bg-orange/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-orange" />
                <h3 className="text-xl font-semibold text-foreground">Projects & Links</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.projectUrl && (
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Best Project</h4>
                      <p className="text-sm text-muted-foreground">Live deployment showcase</p>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={student.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
                {student.demoUrl && (
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Demo Video</h4>
                      <p className="text-sm text-muted-foreground">Project walkthrough</p>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={student.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
