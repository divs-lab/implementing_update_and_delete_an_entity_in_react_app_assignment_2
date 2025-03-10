import { useState, useEffect } from 'react';
import ItemList from './components/ItemList';

const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URI);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      const response = await fetch(API_URI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItem })
      });
      if (response.ok) {
        const addedItem = await response.json();
        setItems([...items, addedItem]);
        setNewItem('');
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const editItem = async (id, updatedName) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName })
      });
      if (response.ok) {
        const updatedItems = items.map(item => item.id === id ? { ...item, name: updatedName } : item);
        setItems(updatedItems);
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Item Manager</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={addItem} style={{ padding: '8px' }}>Add Item</button>
      <ItemList items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
