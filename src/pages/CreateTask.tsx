import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTasks, saveTasks, Task } from '../data/tasks';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { ArrowLeft02Icon } from 'hugeicons-react';

/**
 * Componente para crear una nueva tarea.
 * Utiliza componentes de shadcn para los estilos y framer-motion para las animaciones.
 *
 * @returns {JSX.Element} El componente CreateTask renderizado
 */
const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario para crear una nueva tarea.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tasks: Task[] = getTasks();
    const newTask: Task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description,
      createdAt: new Date(),
      completed,
    };
    saveTasks([...tasks, newTask]);
    navigate('/');
  };

  const handleGoBack = ()=>{
    navigate('/');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center min-h-[100vh]'
    >
      <Card className="w-full max-w-md mx-auto my-auto">
        <CardHeader className='flex flex-col gap-5'>
            <Button variant={"secondary"} className='flex flex-row items-center gap-4 w-fit' onClick={handleGoBack}>
                <ArrowLeft02Icon /> Volver
            </Button>
          <CardTitle>Crear Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked as boolean)}
              />
              <Label htmlFor="completed">Completa</Label>
            </div>
            <Button type="submit" className="w-full">Crear Tarea</Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateTask;