import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Switch } from 'react-native';
import { database } from './firebase';
import { ref, onValue, push, update, remove, set } from 'firebase/database';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = [];
      for (const key in data) {
        loadedTasks.push({ id: key, ...data[key] });
      }
      setTasks(loadedTasks);
    });
  }, []);

  const addTask = () => {
    if (title.trim().length === 0) return;
    const newTaskRef = push(ref(database, 'tasks'));
    set(newTaskRef, {
      title,
      status: false
    });
    setTitle('');
    setIsButtonDisabled(true);
  };

  const toggleTaskStatus = (id) => {
    const taskRef = ref(database, `tasks/${id}`);
    update(taskRef, { status: !tasks.find(task => task.id === id).status });
  };

  const deleteTask = (id) => {
    const taskRef = ref(database, `tasks/${id}`);
    remove(taskRef);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    setIsButtonDisabled(text.trim().length === 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Switch
        value={item.status}
        onValueChange={() => toggleTaskStatus(item.id)}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do-App</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={handleTitleChange}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={isButtonDisabled}
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});
