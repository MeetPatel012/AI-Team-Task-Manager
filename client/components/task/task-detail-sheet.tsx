"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, useUpdateTask } from "@/lib/hooks/useTasks";
import { Calendar, Tag, User, CheckSquare } from "lucide-react";

interface TaskDetailSheetProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailSheet({
  task,
  open,
  onOpenChange,
}: TaskDetailSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateTask = useUpdateTask();

  const form = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "todo",
      priority: task?.priority || "medium",
      dueDate: task?.dueDate || "",
    },
  });

  if (!task) return null;

  const handleSave = async () => {
    const data = form.getValues();
    try {
      await updateTask.mutateAsync({
        id: task._id,
        data,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const toggleSubtask = async (index: number) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index].isCompleted = !updatedSubtasks[index].isCompleted;

    try {
      await updateTask.mutateAsync({
        id: task._id,
        data: { subtasks: updatedSubtasks },
      });
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const priorityColors = {
    low: "bg-gray-500",
    medium: "bg-blue-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  };

  const statusLabels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? (
              <Input
                {...form.register("title")}
                className="text-lg font-semibold"
              />
            ) : (
              task.title
            )}
          </SheetTitle>
          <SheetDescription>Created by {task.createdBy.name}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Actions */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                Edit Task
              </Button>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span>Description</span>
            </h4>
            {isEditing ? (
              <Textarea
                {...form.register("description")}
                rows={4}
                className="resize-none"
              />
            ) : (
              <p className="text-sm text-gray-600">
                {task.description || "No description provided"}
              </p>
            )}
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Status</h4>
              {isEditing ? (
                <Select
                  onValueChange={(value) =>
                    form.setValue("status", value as any)
                  }
                  defaultValue={task.status}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary">{statusLabels[task.status]}</Badge>
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Priority</h4>
              {isEditing ? (
                <Select
                  onValueChange={(value) =>
                    form.setValue("priority", value as any)
                  }
                  defaultValue={task.priority}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge
                  className={`${priorityColors[task.priority]} text-white`}
                >
                  {task.priority}
                </Badge>
              )}
            </div>
          </div>

          {/* Assignee */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Assignee
            </h4>
            <p className="text-sm text-gray-600">
              {task.assignee ? task.assignee.name : "Unassigned"}
            </p>
          </div>

          {/* Due Date */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Due Date
            </h4>
            {isEditing ? (
              <Input type="date" {...form.register("dueDate")} />
            ) : (
              <p className="text-sm text-gray-600">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Subtasks
              </h4>
              <div className="space-y-2">
                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      checked={subtask.isCompleted}
                      onCheckedChange={() => toggleSubtask(index)}
                    />
                    <span
                      className={`text-sm ${
                        subtask.isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
