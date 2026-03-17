import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { 
  Warehouse, MapPin, Edit2, Key, UserMinus, UserCheck, Trash2, 
  Search, Filter, Plus, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { adminAPI, countriesAPI, warehouseAPI } from '../services/api';
import { formatDateTime } from '../utils/helpers';
import WarehouseManagement from './WarehouseManagement';
import ClearOrdersModal from './modals/ClearOrdersModal';
import ConfirmModal from './modals/ConfirmModal';
import Loading from './Loading';
// import '../styles/AdminView.css';

// OSL Admin Level labels
const OSL_LEVELS = [
  { value: 0, label: 'Level 0 - Super Admin (Full privileges)' },
  { value: 1, label: 'Level 1 - Admin (No fulfillment qty adjust)' },
  { value: 2, label: 'Level 2 - Viewer (View & download only)' }
];

function AdminView() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [logPagination, setLogPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 1 });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearOrdersModal, setShowClearOrdersModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ title: '', message: '', onConfirm: () => {}, variant: 'primary' as any });
  const [clearOrdersMode, setClearOrdersMode] = useState<'country' | 'all'>('country');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [newUser, setNewUser] = useState({ email: '', name: '', role: '', country: '', oslAdminLevel: 0, warehouseId: '' });

  // Fetch users
  const fetchUsers = async (page = 1, overrides: any = {}) => {
    setIsLoading(true);
    try {
      const response = await adminAPI.getUsers({
        search: overrides.search !== undefined ? overrides.search : (searchTerm || undefined),
        role: overrides.role !== undefined ? overrides.role : (roleFilter || undefined),
        isActive: overrides.isActive !== undefined ? overrides.isActive : (statusFilter === '' ? undefined : statusFilter === 'active'),
        page,
        limit: pagination.limit
      });
      if (response.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch activity logs
  const fetchActivityLogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await adminAPI.getActivityLogs({ page, limit: logPagination.limit });
      if (response.success) {
        setActivityLogs(response.data.logs);
        setLogPagination(response.data.pagination);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch activity logs');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      if (response.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Fetch countries
  const fetchCountries = async () => {
    try {
      const response = await countriesAPI.getAll();
      if (response.success) {
        setCountries(response.data.countries);
      }
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await warehouseAPI.getAll();
      if (response.success) {
        setWarehouses(response.data.warehouses);
      }
    } catch (err) {
      console.error('Failed to fetch warehouses:', err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchCountries();
    fetchWarehouses();
  }, []);

  // Fetch when tab changes
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'activity') {
      fetchActivityLogs();
    }
  }, [activeTab]);

  // Handle search
  const handleSearch = () => {
    fetchUsers(1);
  };

  // Handle create user
  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.name || !newUser.role) {
      toast.error('Email, name, and role are required');
      return;
    }

    if (newUser.role === 'Country Office' && !newUser.country) {
      toast.error('Country is required for Country Office users');
      return;
    }

    if (newUser.role === 'OSL Team' && !newUser.warehouseId) {
      toast.error('Warehouse is required for OSL Team users');
      return;
    }

    try {
      const userData: any = {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        country: newUser.country
      };

      if (newUser.role === 'OSL Team') {
        userData.oslAdminLevel = parseInt(newUser.oslAdminLevel.toString()) || 0;
        userData.warehouseId = parseInt(newUser.warehouseId);
      }

      const response = await adminAPI.createUser(userData);
      if (response.success) {
        toast.success(`User created! Temp password: ${response.data.tempPassword}`, { duration: 10000 });
        setShowCreateModal(false);
        setNewUser({ email: '', name: '', role: '', country: '', oslAdminLevel: 0, warehouseId: '' });
        fetchUsers();
        fetchStats();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create user');
    }
  };

  // Handle update user
  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const userData: any = {
        name: selectedUser.name,
        role: selectedUser.role,
        country: selectedUser.country,
        isActive: selectedUser.is_active
      };

      if (selectedUser.role === 'OSL Team') {
        userData.oslAdminLevel = parseInt(selectedUser.osl_admin_level?.toString() || '0');
        userData.warehouseId = selectedUser.warehouse_id ? parseInt(selectedUser.warehouse_id.toString()) : null;
      }

      const response = await adminAPI.updateUser(selectedUser.id, userData);
      if (response.success) {
        toast.success('User updated successfully');
        setShowEditModal(false);
        setSelectedUser(null);
        fetchUsers();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user');
    }
  };

  // Handle reset password
  const handleResetPassword = async (userId: any) => {
    setConfirmConfig({
      title: 'Reset Password',
      message: 'Reset password for this user? They will receive an email with a temporary password.',
      onConfirm: async () => {
        try {
          const response = await adminAPI.resetPassword(userId);
          if (response.success) {
            toast.success(`Password reset! New temp password: ${response.data.tempPassword}`, { duration: 10000 });
            fetchUsers();
          }
        } catch (err: any) {
          toast.error(err.message || 'Failed to reset password');
        }
      },
      variant: 'warning'
    });
    setShowConfirmModal(true);
  };

  // Handle toggle user status
  const handleToggleStatus = async (user: any) => {
    const action = user.is_active ? 'deactivate' : 'activate';
    setConfirmConfig({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      message: `Are you sure you want to ${action} this user?`,
      onConfirm: async () => {
        try {
          if (user.is_active) {
            await adminAPI.deactivateUser(user.id);
          } else {
            await adminAPI.activateUser(user.id);
          }
          toast.success(`User ${action}d successfully`);
          fetchUsers();
          fetchStats();
        } catch (err: any) {
          toast.error(err.message || `Failed to ${action} user`);
        }
      },
      variant: action === 'deactivate' ? 'danger' : 'primary'
    });
    setShowConfirmModal(true);
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!deletePassword) {
      toast.error('Password confirmation is required');
      return;
    }

    try {
      const response = await adminAPI.deleteUser(selectedUser.id, {
        confirmPassword: deletePassword,
        reason: deleteReason
      });
      if (response.success) {
        toast.success('User deleted successfully');
        setShowDeleteModal(false);
        setSelectedUser(null);
        setDeletePassword('');
        setDeleteReason('');
        fetchUsers();
        fetchStats();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  // Handle quick role change
  const handleQuickRoleChange = async (userId: any, currentRole: string, newRole: string) => {
    if (currentRole === newRole) return;

    setConfirmConfig({
      title: 'Change User Role',
      message: `Change user role from "${currentRole}" to "${newRole}"? This will take effect immediately.`,
      onConfirm: async () => {
        try {
          const userData: any = { role: newRole };

          if (newRole === 'OSL Team') {
            userData.oslAdminLevel = 0;
          }

          if (currentRole === 'Country Office' && newRole !== 'Country Office') {
            userData.country = null;
          }

          const response = await adminAPI.updateUser(userId, userData);
          if (response.success) {
            toast.success('User role updated successfully');
            fetchUsers();
            fetchStats();
          }
        } catch (err: any) {
          toast.error(err.message || 'Failed to update user role');
        }
      },
      variant: 'primary'
    });
    setShowConfirmModal(true);
  };

  return (
    <div className="admin-view p-6">
      <div className="admin-header mb-6">
        <h2 className="admin-title text-2xl font-bold">System Administration</h2>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {[
            { label: 'Total Users', value: stats.total_users, color: 'text-blue-600' },
            { label: 'Active Users', value: stats.active_users, color: 'text-emerald-600' },
            { label: 'Country Office', value: stats.country_office_users, color: 'text-orange-600' },
            { label: 'Lab Team', value: stats.lab_users, color: 'text-purple-600' },
            { label: 'OSL Team', value: stats.osl_users, color: 'text-indigo-600' },
            { label: 'Active (7d)', value: stats.active_last_week, color: 'text-pink-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] shadow-[8px_8px_16px_#e6e9ef,-8px_-8px_16px_#ffffff] border border-white/50">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-100 mb-8">
        {[
          { id: 'users', label: 'User Management', icon: '👥' },
          { id: 'warehouses', label: 'Warehouse Management', icon: '🏢' },
          { id: 'orders', label: 'Order Management', icon: '🗑️' },
          { id: 'activity', label: 'Activity Logs', icon: '📋' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`pb-4 px-2 font-black text-xs uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="adminTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="admin-content">
          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-8 items-center">
            <div className="bg-white shadow-[inset_4px_4px_8px_#e6e9ef,inset_-4px_-4px_8px_#ffffff] flex items-center gap-3 px-4 py-3 rounded-2xl flex-1 min-w-[300px]">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full font-medium"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={roleFilter}
                onChange={(e) => { 
                  const newRole = e.target.value;
                  setRoleFilter(newRole); 
                  fetchUsers(1, { role: newRole || undefined }); 
                }}
                className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="OSL Team">OSL Team</option>
                <option value="Laboratory Team">Laboratory Team</option>
                <option value="Country Office">Country Office</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => { 
                  const newStatus = e.target.value;
                  setStatusFilter(newStatus); 
                  fetchUsers(1, { isActive: newStatus === '' ? undefined : newStatus === 'active' }); 
                }}
                className="bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button 
                onClick={() => setShowCreateModal(true)} 
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                Create User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-[32px] shadow-[12px_12px_24px_#e6e9ef,-12px_-12px_24px_#ffffff] border border-white/50 overflow-hidden">
            {isLoading ? (
              <Loading />
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Location</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Last Login</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(user => (
                    <tr key={user.id} className={`hover:bg-blue-50/30 transition-colors ${!user.is_active ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-5 font-black text-gray-800">
                        {user.name}
                        {user.must_change_password && (
                          <span className="ml-2 text-xs text-orange-500" title="Must change password">🔑</span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-600">{user.email}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <select
                            value={user.role}
                            onChange={(e) => handleQuickRoleChange(user.id, user.role, e.target.value)}
                            className="text-[10px] font-black bg-gray-100 border-none rounded-lg px-3 py-1.5 uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500/20"
                          >
                            <option value="Country Office">Country Office</option>
                            <option value="Laboratory Team">Laboratory Team</option>
                            <option value="OSL Team">OSL Team</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                          {user.role === 'OSL Team' && user.osl_admin_level !== null && (
                            <span className="text-[9px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black">
                              L{user.osl_admin_level}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-700">
                        {user.role === 'OSL Team' && user.warehouse_id ? (
                          <span title="Warehouse Location" className="flex items-center gap-1">
                            <Warehouse size={14} className="text-blue-500" />
                            {warehouses.find(w => w.id === user.warehouse_id)?.name || `Warehouse #${user.warehouse_id}`}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-red-500" />
                            {user.country || '-'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${user.is_active ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[10px] text-gray-400 font-black uppercase">{formatDateTime(user.last_login) || 'Never'}</td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setSelectedUser({...user}); setShowEditModal(true); }}
                            className="p-2 bg-white shadow-sm border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 transition-all"
                            title="Edit user"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleResetPassword(user.id)}
                            className="p-2 bg-white shadow-sm border border-gray-100 rounded-xl text-gray-400 hover:text-orange-600 transition-all"
                            title="Reset password"
                          >
                            <Key size={14} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className={`p-2 bg-white shadow-sm border border-gray-100 rounded-xl transition-all ${user.is_active ? 'text-gray-400 hover:text-red-600' : 'text-gray-400 hover:text-emerald-600'}`}
                            title={user.is_active ? 'Deactivate user' : 'Activate user'}
                          >
                            {user.is_active ? <UserMinus size={14} /> : <UserCheck size={14} />}
                          </button>
                          <button
                            onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                            className="p-2 bg-white shadow-sm border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 transition-all"
                            title="Delete user permanently"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                onClick={() => fetchUsers(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-3 bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] rounded-xl text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="bg-white shadow-[inset_4px_4px_8px_#e6e9ef,inset_-4px_-4px_8px_#ffffff] px-6 py-2 rounded-full">
                <span className="text-xs font-black text-gray-700 uppercase tracking-widest">
                  Page {pagination.page} <span className="text-gray-300 mx-2">/</span> {pagination.totalPages}
                </span>
              </div>
              <button
                onClick={() => fetchUsers(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="p-3 bg-white shadow-[6px_6px_12px_#e6e9ef,-6px_-6px_12px_#ffffff] rounded-xl text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Activity Logs Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-[32px] shadow-[12px_12px_24px_#e6e9ef,-12px_-12px_24px_#ffffff] border border-white/50 overflow-hidden">
          {isLoading ? (
            <Loading />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Entity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Details</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activityLogs.map(log => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-5 text-[10px] text-gray-400 font-black uppercase">{formatDateTime(log.created_at)}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-black text-gray-800 text-sm">{log.user_name || 'System'}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{log.user_email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-gray-700">{log.entity_type ? `${log.entity_type} #${log.entity_id}` : '-'}</td>
                    <td className="px-6 py-5 text-[10px] text-gray-500 font-medium max-w-xs truncate">
                      {log.details ? JSON.stringify(log.details) : '-'}
                    </td>
                    <td className="px-6 py-5 text-[10px] text-gray-400 font-black tracking-widest">{log.ip_address || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Warehouse Management Tab */}
      {activeTab === 'warehouses' && (
        <div className="admin-content">
          <WarehouseManagement />
        </div>
      )}

      {/* Order Management Tab */}
      {activeTab === 'orders' && (
        <div className="neu-flat p-8">
          <div className="order-management-header mb-6">
            <h3 className="text-xl font-bold">Order History Management</h3>
            <p className="text-gray-500">
              Select specific orders to delete or clear orders by country/all records.
            </p>
          </div>

          <div className="warning-section p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-4 mb-8">
            <div className="warning-icon text-2xl">⚠️</div>
            <div className="warning-content">
              <h4 className="font-bold text-orange-800">Critical Action</h4>
              <p className="text-sm text-orange-700">Deleting orders will permanently remove them and all related data. This cannot be undone.</p>
            </div>
          </div>

          <div className="order-management-actions flex gap-4 mb-8">
            <button
              onClick={() => {
                setClearOrdersMode('country');
                setShowClearOrdersModal(true);
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              🗑️ Clear by Country
            </button>
            <button
              onClick={() => {
                setConfirmConfig({
                  title: 'Nuclear Option: Clear All Orders',
                  message: '⚠️ WARNING: This will delete ALL orders from ALL countries! This action is permanent and cannot be undone. Are you absolutely sure?',
                  variant: 'danger',
                  onConfirm: () => {
                    setClearOrdersMode('all');
                    setShowClearOrdersModal(true);
                  }
                });
                setShowConfirmModal(true);
              }}
              className="px-6 py-3 bg-red-800 text-white rounded-xl font-bold hover:bg-red-900 transition-colors"
            >
              💣 Clear All Orders
            </button>
          </div>

          <div className="info-section text-sm text-gray-600">
            <h4 className="font-bold mb-2">Deletion Options:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Clear by Country:</strong> Delete all orders for a specific country (with optional date range)</li>
              <li><strong>Clear All Orders:</strong> Nuclear option - deletes ALL orders from ALL countries</li>
            </ul>
            <p className="mt-4 italic">
              <strong>Note:</strong> All deletions are logged and require your password confirmation.
            </p>
          </div>
        </div>
      )}

      {/* Clear Orders Modal */}
      {showClearOrdersModal && (
        <ClearOrdersModal
          mode={clearOrdersMode}
          onClose={() => setShowClearOrdersModal(false)}
          onSuccess={() => {
            toast.success('Order history cleared successfully');
          }}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal 
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmConfig.onConfirm}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmVariant={confirmConfig.variant}
        />
      )}
    </div>
  );
}

export default AdminView;
