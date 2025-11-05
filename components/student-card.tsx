"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { NormalizedStudent } from "@/lib/supabase";
import { companyLogo } from "@/data/static/config.json";
import { useState, useEffect } from "react";

interface StudentCardProps {
  student: NormalizedStudent;
}

// Global state to manage popup stack
interface PopupData {
  studentEmail: string;
  studentName: string;
  company: string;
  timeout: NodeJS.Timeout;
}

let popupStack: PopupData[] = [];
const MAX_POPUPS = 3;

export function StudentCard({ student }: StudentCardProps) {
  const router = useRouter();
  const [showPlacedPopup, setShowPlacedPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(-1);

  // Get top skills from normalized data
  const displaySkills = student.skills
    .flatMap((category) => category.items)
    .slice(0, 5); // Show exactly 5 skills

  // Get primary education info (highest degree, excluding AI Engineering course)
  const primaryEducation = student.education[0];
  const degree = primaryEducation?.degree || "Computer Science Graduate";
  const institution = primaryEducation?.institution || "";
  const grade = primaryEducation?.grade;

  // Get primary work experience
  const primaryExperience = student.experience[0];
  const currentRole = primaryExperience?.role || "";
  const currentCompany = primaryExperience?.company || "";

  // Find company logo based on student name
  const companyInfo = companyLogo.find(
    (company) => company.name.toLowerCase() === student.name.toLowerCase()
  );

  // Update popup position when stack changes
  useEffect(() => {
    const index = popupStack.findIndex((p) => p.studentEmail === student.email);
    setPopupIndex(index);
    setShowPlacedPopup(index >= 0);
  }, [student.email]);

  const removeFromStack = (email: string) => {
    const index = popupStack.findIndex((p) => p.studentEmail === email);
    if (index >= 0) {
      clearTimeout(popupStack[index].timeout);
      popupStack.splice(index, 1);
      // Trigger re-render for all components
      window.dispatchEvent(new CustomEvent("popupStackChanged"));
    }
  };

  const addToStack = (studentData: {
    email: string;
    name: string;
    company: string;
  }) => {
    // Remove if already exists
    removeFromStack(studentData.email);

    // Remove oldest if at max capacity
    if (popupStack.length >= MAX_POPUPS) {
      const oldest = popupStack.shift();
      if (oldest) {
        clearTimeout(oldest.timeout);
      }
    }

    // Add new popup to front of stack
    const timeout = setTimeout(() => {
      removeFromStack(studentData.email);
    }, 3000);

    popupStack.unshift({
      studentEmail: studentData.email,
      studentName: studentData.name,
      company: studentData.company,
      timeout,
    });

    // Trigger re-render for all components
    window.dispatchEvent(new CustomEvent("popupStackChanged"));
  };

  useEffect(() => {
    const handleStackChange = () => {
      const index = popupStack.findIndex(
        (p) => p.studentEmail === student.email
      );
      setPopupIndex(index);
      setShowPlacedPopup(index >= 0);
    };

    window.addEventListener("popupStackChanged", handleStackChange);
    return () =>
      window.removeEventListener("popupStackChanged", handleStackChange);
  }, [student.email]);

  const handleCardClick = () => {
    if (companyInfo) {
      addToStack({
        email: student.email,
        name: student.name,
        company: companyInfo.company,
      });
      return;
    }
    router.push(`/student/${encodeURIComponent(student.email)}`);
  };

  return (
    <div className="relative">
      <Card
        className="group cursor-pointer border border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg h-[320px] sm:h-[360px] flex flex-col relative"
        onClick={handleCardClick}
      >
        {/* Overlay for dimming effect - only shows when placed */}
        {companyInfo && (
          <div className="absolute inset-0 bg-white/50 rounded-lg z-10 pointer-events-none" />
        )}

        {/* Placed tag - above overlay */}
        {companyInfo && (
          <div className="absolute top-0 left-0 z-30 overflow-hidden rounded-tl-lg">
            <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-md">
              Placed
            </div>
          </div>
        )}

        <CardContent className="p-4 sm:p-6 flex flex-col h-full relative">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Avatar
              className={`h-12 w-12 sm:h-16 sm:w-16 ring-2 flex-shrink-0 ${
                companyInfo
                  ? "ring-gray-200 grayscale"
                  : "ring-gray-200 group-hover:ring-orange-300"
              }`}
            >
              <AvatarImage
                src={student.photo_link || "/placeholder.svg"}
                alt={student.name}
              />
              <AvatarFallback
                className={`font-semibold text-sm sm:text-lg ${
                  companyInfo
                    ? "bg-gray-100 text-gray-500"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold text-base sm:text-lg mb-1 line-clamp-1 ${
                  companyInfo
                    ? "text-gray-500"
                    : "text-gray-900 group-hover:text-orange-600"
                }`}
              >
                {student.name}
              </h3>
              {grade && (
                <Badge
                  variant="secondary"
                  className={`text-xs mb-2 ${
                    companyInfo
                      ? "bg-gray-100 text-gray-500 border-gray-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  {grade} CGPA
                </Badge>
              )}
              <p
                className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                  companyInfo ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {degree}
              </p>
              {institution && (
                <p
                  className={`text-xs mt-1 line-clamp-1 ${
                    companyInfo ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {institution}
                </p>
              )}
              {(currentRole || currentCompany) && (
                <div
                  className={`text-xs font-medium mt-1 line-clamp-1 ${
                    companyInfo ? "text-gray-500" : "text-orange-600"
                  }`}
                >
                  {currentRole && currentCompany ? (
                    <span>
                      {currentRole} @ {currentCompany}
                    </span>
                  ) : currentCompany ? (
                    <span>@ {currentCompany}</span>
                  ) : currentRole ? (
                    <span>{currentRole}</span>
                  ) : null}
                </div>
              )}
            </div>

            {/* Company logo - positioned above overlay */}
            {companyInfo && (
              <div className="flex-shrink-0 relative z-20">
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm group-hover:border-orange-200 group-hover:shadow-md transition-all duration-200">
                  <img
                    src={companyInfo.logo}
                    alt={companyInfo.company}
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                    title={companyInfo.company}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2 sm:space-y-3">
            <div
              className={`border-l-4 pl-2 sm:pl-3 ${
                companyInfo ? "border-gray-400" : "border-orange-500"
              }`}
            >
              <h4
                className={`text-xs sm:text-sm font-semibold mb-2 ${
                  companyInfo ? "text-gray-500" : "text-gray-900"
                }`}
              >
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {displaySkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 ${
                      companyInfo
                        ? "bg-gray-50 text-gray-500 border-gray-300"
                        : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              {student.github && (
                <span
                  className={`text-xs font-medium ${
                    companyInfo ? "text-gray-500" : "text-orange-600"
                  }`}
                >
                  GitHub
                </span>
              )}
              {student.deployed && (
                <span
                  className={`text-xs font-medium ${
                    companyInfo ? "text-gray-500" : "text-orange-600"
                  }`}
                >
                  Portfolio
                </span>
              )}
            </div>
            <div
              className={`text-xs ${
                companyInfo
                  ? "text-gray-400"
                  : "text-gray-500 group-hover:text-orange-600"
              }`}
            >
              View Profile →
            </div>
          </div>
        </CardContent>

        {/* Placed Student Popup */}
        {showPlacedPopup && popupIndex >= 0 && (
          <div
            className="fixed right-4 z-[60] animate-in slide-in-from-top-2 duration-300 transition-all"
            style={{
              top: `${16 + popupIndex * 80}px`,
            }}
          >
            <div className="bg-white border border-orange-200 rounded-lg shadow-lg p-4 min-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Candidate Already Placed
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {student.name} has been placed at {companyInfo?.company}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromStack(student.email);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
