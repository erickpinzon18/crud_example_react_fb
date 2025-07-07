import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo usuario
  const createUser = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log('Usuario creado con ID:', docRef.id);
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // Actualizar usuario
  const updateUser = async () => {
    try {
      const userRef = doc(db, 'users', editingUser.id);
      await updateDoc(userRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      console.log('Usuario actualizado');
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        console.log('Usuario eliminado');
        fetchUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser();
    } else {
      createUser();
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
    setEditingUser(null);
    setShowModal(false);
  };

  // Abrir modal para editar
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      status: user.status || 'active'
    });
    setShowModal(true);
  };

  // Abrir modal para crear
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      
      <div className="dashboard-content">
        {/* Información del usuario actual */}
        <div className="user-info">
          <div className="user-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="user-details">
            <h2>{user.displayName || 'Administrador'}</h2>
            <p>{user.email}</p>
            <p className="user-id">ID: {user.uid}</p>
          </div>
        </div>

        {/* CRUD de Usuarios */}
        <div className="crud-section">
          <div className="crud-header">
            <h2>Gestión de Usuarios</h2>
            <button onClick={openCreateModal} className="create-button">
              + Nuevo Usuario
            </button>
          </div>

          {loading ? (
            <div className="loading">Cargando usuarios...</div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData) => (
                    <tr key={userData.id}>
                      <td>{userData.name || 'Sin nombre'}</td>
                      <td>{userData.email}</td>
                      <td>
                        <span className={`role-badge ${userData.role}`}>
                          {userData.role === 'admin' ? 'Administrador' : 'Usuario'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${userData.status}`}>
                          {userData.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        {userData.createdAt ? 
                          new Date(userData.createdAt).toLocaleDateString() : 
                          'N/A'
                        }
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => openEditModal(userData)}
                            className="edit-button"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => deleteUser(userData.id)}
                            className="delete-button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="no-data">
                  No hay usuarios registrados
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear/editar usuario */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h3>
              <button onClick={resetForm} className="close-button">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Rol:</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Estado:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={resetForm} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
