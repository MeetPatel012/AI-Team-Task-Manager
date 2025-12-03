"use client";

import { useProjects } from "@/lib/hooks/useProjects";
import { ProjectCard } from "@/components/project/project-card";
import { NewProjectDialog } from "@/components/project/new-project-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function ProjectsPage() {
  const { data, isLoading, error } = useProjects();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-gray-600">
            Manage your team projects and collaborate effectively
          </p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load projects
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching projects"}
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !error && data && (
        <>
          {data.projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-6 mb-4">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Get started by creating your first project to organize tasks and
                collaborate with your team.
              </p>
              <NewProjectDialog />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
