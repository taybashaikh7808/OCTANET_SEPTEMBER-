import React, { useState, useEffect } from 'react';

function App() {
  // Load tasks from localStorage or start with an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage when tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Handle toggling task's completion
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle editing a task
  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTask({ text: tasks[index].text, index });
    setNewTask(tasks[index].text);
  };

  // Handle saving an edited task
  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === currentTask.index ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setNewTask('');
    setCurrentTask(null);
  };

  // Clear all tasks
  const handleClearAll = () => {
    setTasks([]);
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
    return true; // 'all' tasks
  });

  return (
    <div style={styles.app}>
      <h1>To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder={isEditing ? "Edit task" : "Add a new task"}
          style={styles.input}
        />
        {isEditing ? (
          <button onClick={handleSaveTask} style={styles.saveButton}>
            Save
          </button>
        ) : (
          <button onClick={handleAddTask} style={styles.addButton}>
            Add
          </button>
        )}
      </div>

      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          style={filter === 'all' ? styles.activeFilterButton : styles.filterButton}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={filter === 'completed' ? styles.activeFilterButton : styles.filterButton}
        >
          Completed Task
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          style={filter === 'incomplete' ? styles.activeFilterButton : styles.filterButton}
        >
          Task To Complete
        </button>
        <button onClick={handleClearAll} style={styles.clearButton}>
          Clear All
        </button>
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
              style={styles.checkbox}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              {task.text}
            </span>
            <div>
              <button onClick={() => handleEditTask(index)} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => handleDeleteTask(index)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Enhanced styles for a cleaner and more professional look
const styles = {
  app: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  inputContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    width: '70%',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '600px',
    margin: '0 auto',
  },
  filterButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  activeFilterButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  clearButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  checkbox: {
    marginRight: '10px',
  },
  editButton: {
    marginRight: '10px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default App;
