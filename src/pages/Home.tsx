import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTasks, saveTasks, Task } from '../data/tasks';
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { InformationCircleIcon, PlusSignIcon } from 'hugeicons-react';

/**
 * Componente de la página de inicio que muestra una lista de tareas.
 * Utiliza componentes de shadcn para los estilos y framer-motion para las animaciones.
 *
 * @returns {JSX.Element} El componente Home renderizado
 */
const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='p-12'
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Tareas</h1>
        <Button asChild>
          <Link to="/create"><PlusSignIcon className="mr-2 h-4 w-4" /> Crear Nueva Tarea</Link>
        </Button>
      </div>
      <Tabs onValueChange={(value: string ) => setFilter(value)} defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="uncompleted">Pendientes</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table className='overflow-hidden'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredTasks.map((task: Task) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 0.99, backgroundColor: "rgba(0,0,0,0.03)" }}
                onClick={() => toggleTaskCompletion(task.id)}
                className="cursor-pointer"
                style={{ overflow: 'visible' }}
              >
                <TableCell className='ml-6'>
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                </TableCell>
                <TableCell className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </TableCell>
                <TableCell className="text-right mr-6">
                  <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Link to={`/task/${task.id}`}><InformationCircleIcon className="mr-2 h-4 w-4" /> Detalles</Link>
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default Home;