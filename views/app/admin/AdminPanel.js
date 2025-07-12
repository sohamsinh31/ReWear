// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const mockUsers = [
  { id: 1, name: 'Rohan', email: 'Rohan@example.com', points: 150 ,avatarUrl: 'Photos/men.png' },
  { id: 2, name: 'Riya', email: 'Riya@example.com', points: 85, avatarUrl: 'Photos/girl.png' },
  { id: 3, name: 'Ram', email: 'Ram@example.com', points: 70, avatarUrl: 'Photos/men.png' },
  { id: 4, name: 'Preeti', email: 'Preeti@example.com', points: 50, avatarUrl: 'Photos/girl.png' },
];

const mockOrders = [
  {
    id: '1',
    title: 'Denim Jacket',
    description: 'Lightly used, very trendy.',
    category: 'Jackets',
    size: 'M',
    condition: 'Good',
    pointsRequired: 50,
    usedFrequency: 3,
    coverImageUrl: 'Photos/denim.png',
    imageUrls: [],
    isAvailable: true,
    isApproved: true,
    userId: '101',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Cotton Shirt',
    description: 'Worn only once.',
    category: 'Shirts',
    size: 'L',
    condition: 'Like New',
    pointsRequired: 30,
    usedFrequency: 1,
    coverImageUrl: 'Photos/cotton shirt.png',
    imageUrls: [],
    isAvailable: false,
    isApproved: false,
    userId: '102',
    createdAt: new Date().toISOString(),
  }
];

const AdminPanel = () => {
  const [view, setView] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUsers(mockUsers);
    setOrders(mockOrders);
  }, []);

  const handleAccept = (orderId) => {
    console.log(`Accepting order with ID: ${orderId}`);
    // TODO: Replace with actual API call to accept the order
  };

  const handleReject = (orderId) => {
    console.log(`Rejecting order with ID: ${orderId}`);
    // TODO: Replace with actual API call to reject the order
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1 className="panel-title">Admin Panel</h1>
      </header>

      <nav className="admin-nav">
        <button onClick={() => setView('users')}>Manage Users</button>
        <button onClick={() => setView('orders')}>Manage Orders</button>
        <button onClick={() => setView('listings')}>Manage Listings</button>
      </nav>

      <main className="admin-main">
        <h2 className="section-heading">
          {view === 'users' ? 'Manage Users' : view === 'orders' ? 'Manage Orders' : 'Manage Listings'}
        </h2>

        {view === 'users' && (
          <div className="user-list">
            {users.map(user => (
              <div className="user-card" key={user.id}>
                <div className="avatar-icon">
                  <img src={user.avatarUrl} alt={user.name} className="avatar-image" />
                </div>
                <div className="user-details">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Points:</strong> {user.points}</p>
                </div>
                <div className="user-actions">
                  <button>Action 1</button>
                  <button>Action 2</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'orders' && (
          <div className="order-list">
            {orders.map(order => (
              <div className="order-card" key={order.id}>
                <img src={order.coverImageUrl} alt="Cover" className="order-image-large" />
                <div className="order-details">
                  <p><strong>Title:</strong> {order.title}</p>
                  <p><strong>Description:</strong> {order.description}</p>
                  <p><strong>Category:</strong> {order.category}</p>
                  <p><strong>Size:</strong> {order.size}</p>
                  <p><strong>Condition:</strong> {order.condition}</p>
                  <p><strong>Points Required:</strong> {order.pointsRequired}</p>
                  <p><strong>Used Frequency:</strong> {order.usedFrequency}</p>
                  <p><strong>Available:</strong> {order.isAvailable ? 'Yes' : 'No'}</p>
                  <p><strong>Approved:</strong> {order.isApproved ? 'Yes' : 'No'}</p>
                  <p><strong>User ID:</strong> {order.userId}</p>
                  <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="order-actions">
                  <button onClick={() => handleAccept(order.id)}>Accept</button>
                  <button onClick={() => handleReject(order.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'listings' && <p>Listing moderation coming soon...</p>}
      </main>
    </div>
  );
};

export default AdminPanel;
