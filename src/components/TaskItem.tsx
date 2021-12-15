import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pencil/edit.png';
import { Task } from './TasksList';

interface TasksItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  task: Task
}

export function TaskItem(
{  
  toggleTaskDone, 
  removeTask, 
  editTask, 
  task 
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewtaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewtaskTitle(task.title);
  }

  function handleSubmitEditing() {
    setIsEditing(false);
    editTask(task.id, newTaskTitle);
  }

  const styleMarker = task.done ? styles.taskMarkerDone : styles.taskMarker;
  const styleText = task.done ? styles.taskTextDone : styles.taskText;

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${task.id}`}
            //TODO - use style prop
            style={styleMarker} 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            //TODO - use style prop
            ref={textInputRef}
            style={styleText}
            value={newTaskTitle}
            onChangeText={setNewtaskTitle}
            editable={isEditing}
            onSubmitEditing={() => handleSubmitEditing()} 
          >            
          </TextInput>
        </TouchableOpacity>
      </View>
      
      <View style={styles.iconsContainer}>
        <TouchableOpacity testID={`edit-${task.id}`}          
          //TODO - use onPress (remove task) prop
          onPress={() => {
            if(isEditing) {
              handleCancelEditing();
            } else {
              handleStartEditing();
            }
          }}
        >
          { isEditing ? 
              <Icon 
                name="x"
                size={24} 
                color="#B2B2B2"
              />
            :
              <Image 
                source={editIcon} 
                style={{ width: 22, height: 22, opacity: 0.3 }}                
              />
          }
        </TouchableOpacity>

        <View 
          style={styles.iconsDivider} 
        />

        <TouchableOpacity testID={`trash-${task.id}`}          
          //TODO - use onPress (remove task) prop
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  iconsDivider: {
    width: 24,
    height: 1,
    color: 'rgba(196, 196, 196, 0.24)'
  }
});

