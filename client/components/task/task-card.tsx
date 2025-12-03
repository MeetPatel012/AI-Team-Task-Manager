import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, GripVertical } from "lucide-react";
import { Task } from "@/lib/hooks/useTasks";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const priorityColors = {
  low: "bg-gray-500",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing mt-1"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 pl-9">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`${priorityColors[task.priority]} text-white text-xs`}
          >
            {task.priority}
          </Badge>

          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                {getInitials(task.assignee.name)}
              </AvatarFallback>
            </Avatar>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
