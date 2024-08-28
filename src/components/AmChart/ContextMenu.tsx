import React from 'react';

const ContextMenu = ({ x, y, onSelect, onEdit, onRemove, visible }) => {
  if (!visible) return null;

  const menuStyle = {
    position: 'absolute',
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: '#2c2c2c',
    border: '1px solid #ccc',
    padding: '5px',
    zIndex: 1000,
    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
    color:'white'
  };

  return (
    <div style={menuStyle}>
      {/* <div onClick={onSelect}>Select</div>
      <div onClick={onEdit}>Edit</div> */}
      <div onClick={onRemove}>Remove</div>
    </div>
  );
};

export default ContextMenu;
