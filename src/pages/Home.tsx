import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { showAlertTaskExist, showConfirmDelete } from '../components/Alerts';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    if(!tasks.find(task => task.title === newTaskTitle)) { 
      const dataTask: Task = {
        id: tasks.length,
        title: newTaskTitle,
        done: false
      };
      setTasks(oldState => [...oldState, dataTask]);
    } else {
      showAlertTaskExist();
    }
  }

  function handleToggleTaskDone(taskId: number) {
    //TODO - toggle task done if exists
    setTasks(oldState => oldState.map(task => {
      if(task.id === taskId) {
        task.done = !task.done;
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const removeTask = () => setTasks(oldState => oldState.filter(task => task.id !== id));
    showConfirmDelete({ removeTask });    
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(oldState => oldState.map(task => {
      if(task.id === taskId) {
        task.title = taskNewTitle;
      }
      return task;
    }));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})