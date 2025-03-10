import Item from './Item';

const ItemList = ({ items, deleteItem }) => {
  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Item List</h1>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <Item key={item.id} item={item} deleteItem={deleteItem} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
