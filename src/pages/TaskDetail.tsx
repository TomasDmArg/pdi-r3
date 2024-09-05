import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTasks, Task, saveTasks } from '../data/tasks';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft02Icon, Delete02Icon, FloppyDiskIcon, PencilEdit01Icon } from 'hugeicons-react';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tasks: Task[] = getTasks();
  const task = tasks.find(t => t.id === parseInt(id || '', 10));
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  if (!task) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen"
      >
        <Card>
          <CardContent className="pt-6">
            <p>Tarea no encontrada</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/')}>Volver al inicio</Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const handleDelete = () => {
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    saveTasks(updatedTasks);
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTask) {
      const updatedTasks = tasks.map(t => t.id === editedTask.id ? editedTask : t);
      saveTasks(updatedTasks);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft02Icon className="mr-2 h-4 w-4" /> Volver
          </Button>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  value={editedTask?.title}
                  onChange={(e) => setEditedTask({ ...editedTask!, title: e.target.value })}
                  className="font-bold text-xl"
                />
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardTitle>{task.title}</CardTitle>
              </motion.div>
            )}
          </AnimatePresence>
          <Badge variant={(task.completed ? "default" : "secondary")}>
            {task.completed ? 'Completa' : 'Pendiente'}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={editedTask?.description}
                    onChange={(e) => setEditedTask({ ...editedTask!, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="completed"
                    checked={editedTask?.completed}
                    onCheckedChange={(checked) => setEditedTask({ ...editedTask!, completed: checked as boolean })}
                  />
                  <Label htmlFor="completed">Completa</Label>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Fecha de creación: {new Date(task.createdAt).toLocaleString()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex space-x-2"
              >
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <FloppyDiskIcon className="mr-2 h-4 w-4" /> Guardar
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex space-x-2"
              >
                <Button variant="outline" onClick={handleEdit}>
                  <PencilEdit01Icon className="mr-2 h-4 w-4" /> Editar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Delete02Icon className="mr-2 h-4 w-4" /> Eliminar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskDetail;