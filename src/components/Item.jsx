const Item = ({ item, deleteItem }) => {
    return (
      <li
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f3f4f6',
          padding: '8px',
          borderRadius: '8px',
          marginBottom: '8px',
        }}
      >
        <span>{item.name}</span>
        <button
          onClick={() => deleteItem(item.id)}
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </li>
    );
  };
  
  export default Item;
  