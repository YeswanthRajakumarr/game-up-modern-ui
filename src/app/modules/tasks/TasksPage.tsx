import React, { useState } from 'react';
import { MOCK_TASKS, MOCK_CLASSES } from '../../../shared/mockData';
import { useAuth } from '../../global-context/AuthContext';
import type { Task } from '../../../shared/types';
import { Calendar, CheckCircle, Clock, FileText, Filter, Plus, Search, X, Upload } from 'lucide-react';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
}

const TaskCreationModal = ({ isOpen, onClose, onSave }: TaskCreationModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    xpReward: 100,
    assignedTo: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: `t${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    });
    setFormData({ title: '', description: '', subject: '', dueDate: '', xpReward: 100, assignedTo: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Create New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Task Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="e.g., Algebra Linear Equations"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="Task instructions and requirements..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">XP Reward</label>
            <input
              type="number"
              min="1"
              value={formData.xpReward}
              onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Assign To Classes</label>
            <div className="space-y-2">
              {MOCK_CLASSES.map(cls => (
                <label key={cls.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.assignedTo.includes(cls.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, assignedTo: [...formData.assignedTo, cls.id] });
                      } else {
                        setFormData({ ...formData, assignedTo: formData.assignedTo.filter(id => id !== cls.id) });
                      }
                    }}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">{cls.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-600/20"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TaskSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSubmit: (file: File) => void;
}

const TaskSubmissionModal = ({ isOpen, onClose, task, onSubmit }: TaskSubmissionModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
      setFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Submit Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-1">{task.title}</h3>
            <p className="text-sm text-slate-600">{task.description}</p>
            <div className="mt-2 text-xs text-slate-500">
              Subject: {task.subject} • XP Reward: {task.xpReward}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload File</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
                {file && (
                  <p className="text-xs text-slate-500 mt-2">{(file.size / 1024).toFixed(2)} KB</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const TasksPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED'>('ALL');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'ALL' || 
       (filter === 'PENDING' && task.status === 'PENDING') ||
       (filter === 'SUBMITTED' && task.status === 'SUBMITTED') ||
       (filter === 'GRADED' && task.status === 'GRADED');
    
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.subject.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleCreateTask = (newTask: Partial<Task>) => {
    setTasks([...tasks, newTask as Task]);
  };

  const handleSubmitTask = (file: File) => {
    if (selectedTask) {
      setTasks(tasks.map(t => 
        t.id === selectedTask.id 
          ? { ...t, status: 'SUBMITTED' as const, submittedFileUrl: URL.createObjectURL(file) }
          : t
      ));
      alert(`Task "${selectedTask.title}" submitted successfully!`);
    }
  };

  const handleOpenSubmit = (task: Task) => {
    setSelectedTask(task);
    setShowSubmitModal(true);
  };

  const statusColors = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    SUBMITTED: 'bg-blue-100 text-blue-700 border-blue-200',
    GRADED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    OVERDUE: 'bg-red-100 text-red-700 border-red-200',
  };

  const statusIcons = {
    PENDING: Clock,
    SUBMITTED: FileText,
    GRADED: CheckCircle,
    OVERDUE: Clock,
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
              <h1 className="text-2xl font-bold text-slate-800">
                  {user?.role === 'TEACHER' ? 'Class Tasks' : 'My Quests'}
              </h1>
              <p className="text-slate-500">Manage and track your assignments</p>
          </div>
          {user?.role === 'TEACHER' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                  <Plus className="w-5 h-5" />
                  Create New Task
              </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-lg">
                {(['ALL', 'PENDING', 'SUBMITTED', 'GRADED'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map(task => {
              const Icon = statusIcons[task.status];
              return (
                <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm
                              ${task.subject === 'Math' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 
                                task.subject === 'Science' ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                                task.subject === 'History' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 
                                'bg-gradient-to-br from-emerald-500 to-teal-600'
                              }`}>
                               {task.subject.slice(0, 2)}
                           </div>
                           <div>
                               <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                               <p className="text-sm text-slate-500 mb-2">{task.description}</p>
                               <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                                   <span className="flex items-center gap-1">
                                       <Calendar className="w-3 h-3" />
                                       Due {task.dueDate}
                                   </span>
                                   <span>•</span>
                                   <span className="text-indigo-500">+{task.xpReward} XP</span>
                               </div>
                           </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                           <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${statusColors[task.status]}`}>
                               <Icon className="w-3 h-3" />
                               {task.status}
                           </div>
                           
                           {user?.role === 'STUDENT' && task.status === 'PENDING' && (
                               <button 
                                 onClick={() => handleOpenSubmit(task)}
                                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                               >
                                   Submit
                               </button>
                           )}
                           {user?.role === 'TEACHER' && task.status === 'SUBMITTED' && (
                               <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
                                   Grade
                               </button>
                           )}
                      </div>
                  </div>
                </div>
              );
            })}
            
            {filteredTasks.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-slate-500 font-medium">No tasks found</h3>
                </div>
            )}
        </div>
      </div>

      <TaskCreationModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSave={handleCreateTask}
      />
      <TaskSubmissionModal 
        isOpen={showSubmitModal} 
        onClose={() => setShowSubmitModal(false)} 
        task={selectedTask}
        onSubmit={handleSubmitTask}
      />
    </>
  );
};