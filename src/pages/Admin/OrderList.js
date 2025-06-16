import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import './OrderList.css';

const ITEMS_PER_PAGE = 5;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all | pending | shipped
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterStatus, orders]);

  const applyFilters = () => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order =>
        filterStatus === 'shipped' ? order.isShipped : !order.isShipped
      );
    }

    if (search) {
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(search) ||
        order.user?.email.toLowerCase().includes(search)
      );
    }

    setFilteredOrders(filtered);
    setPage(1);
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/orders/${id}/ship`);
      setOrders(prev =>
        prev.map((o) => o._id === id ? { ...o, isShipped: true } : o)
      );
      alert('Order marked as shipped');
    } catch (err) {
      console.error(err);
      alert('Failed to update shipping');
    }
  };

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  return (
    <div className="order-list-wrapper">
      <aside className="order-sidebar">
        <h4>Filters</h4>
        <button
          className={filterStatus === 'all' ? 'active' : ''}
          onClick={() => setFilterStatus('all')}
        >
          All Orders
        </button>
        <button
          className={filterStatus === 'pending' ? 'active' : ''}
          onClick={() => setFilterStatus('pending')}
        >
          Pending Orders
        </button>
        <button
          className={filterStatus === 'shipped' ? 'active' : ''}
          onClick={() => setFilterStatus('shipped')}
        >
          Shipped Orders
        </button>
      </aside>

      <main className="order-list-container">
        <h2>Order Management</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search by Order ID or Email"
          className="search-box"
        />

        {paginatedOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          paginatedOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <span className={order.isShipped ? 'shipped' : 'pending'}>
                  {order.isShipped ? 'Shipped' : 'Pending'}
                </span>
              </div>
              <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.name || 'Unknown'} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Address:</strong> {`${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>

              {!order.isShipped && (
                <button className="ship-btn" onClick={() => handleApprove(order._id)}>
                  Mark as Shipped
                </button>
              )}
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={page === i + 1 ? 'active' : ''}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderList;
