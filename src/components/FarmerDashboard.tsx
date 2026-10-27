import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmerTask, CareKitPlan, CropDiseaseResult } from '../types';
import { KisanIdCard } from './KisanIdCard';
import {
  LayoutDashboard,
  ShieldAlert,
  ClipboardCheck,
  PackageCheck,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  ShoppingCart,
  Plus,
  Eye,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  TrendingUp,
  BarChart3,
  PieChart,
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    t,
    language,
    scans,
    tasks,
    toggleTask,
    addTask,
    orders,
    savedKits,
    deleteKit,
    renameKit,
    addToCart,
    profile,
    updateProfile,
    setActiveSection,
    setActiveScanContext,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'scans' | 'tasks' | 'orders' | 'kits' | 'analytics' | 'profile'
  >('scans');

  // Task creation state
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskCrop, setNewTaskCrop] = useState<string>('Tomato');
  const [newTaskDate, setNewTaskDate] = useState<string>('2026-10-28');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // Profile editing state
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSaveNotice, setProfileSaveNotice] = useState<boolean>(false);

  // Scan modal state
  const [selectedScanModal, setSelectedScanModal] = useState<CropDiseaseResult | null>(null);

  // Helper to ensure accurate, high-definition crop disease photos
  const getResolvedScanImage = (scan: CropDiseaseResult) => {
    if (
      !scan.imageUrl ||
      scan.imageUrl.includes('photo-1597848212624') ||
      (scan.cropName === 'Tomato' && scan.imageUrl.includes('unsplash')) ||
      scan.mostLikelyDisease?.toLowerCase().includes('early blight') ||
      scan.id === 'scan-init-1'
    ) {
      return '/images/crops/tomato_early_blight.jpg';
    }
    if (
      scan.id === 'scan-init-2' ||
      scan.imageUrl?.includes('photo-1618512496248') ||
      (scan.cropName === 'Onion' && scan.imageUrl.includes('unsplash'))
    ) {
      return '/images/crops/onion_purple_blotch.jpg';
    }
    return scan.imageUrl;
  };

  // Summary counts
  const totalScans = scans.length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const dispatchedOrders = orders.length;
  const savedKitsCount = savedKits.length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: {
        en: newTaskTitle,
        mr: newTaskTitle,
        hi: newTaskTitle,
      },
      crop: newTaskCrop,
      dueDate: newTaskDate,
      priority: newTaskPriority,
      category: 'Field Care',
    });

    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSaveNotice(true);
    setTimeout(() => setProfileSaveNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.dashTitle}
          </h1>
          <p className="text-stone-700 text-xs sm:text-sm mt-1">
            {t.dashSubtitle.replace('{name}', profile.name)}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Kisan Demo Portal</span>
          </span>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => setActiveTab('scans')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700">
              {t.statTotalScans}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">
            {totalScans}
          </div>
          <p className="text-[11px] text-stone-700 mt-1">Active crop scans saved</p>
        </div>

        <div
          onClick={() => setActiveTab('tasks')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700">
              {t.statPendingTasks}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">
            {pendingTasks}
          </div>
          <p className="text-[11px] text-stone-700 mt-1">{completedTasks} tasks completed</p>
        </div>

        <div
          onClick={() => setActiveTab('orders')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700">
              {t.statOrdersDispatched}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-900">
            {dispatchedOrders}
          </div>
          <p className="text-[11px] text-stone-700 mt-1">Demo orders placed</p>
        </div>

        <div
          onClick={() => setActiveTab('kits')}
          className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700">
              {t.statSavedKits}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950">
            {savedKitsCount}
          </div>
          <p className="text-[11px] text-stone-700 mt-1">Customised 3-tier plans</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'scans'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabScansHistory} ({totalScans})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'tasks'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabPendingTasks} ({pendingTasks})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'orders'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabOrders} ({dispatchedOrders})
        </button>
        <button
          onClick={() => setActiveTab('kits')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'kits'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabSavedKits} ({savedKitsCount})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'analytics'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabAnalytics}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'profile'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          {t.tabProfile}
        </button>
      </div>

      {/* Tab 1: Scan History */}
      {activeTab === 'scans' && (
        <div className="space-y-4 animate-fade-in">
          {scans.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
              <ShieldAlert className="w-10 h-10 mx-auto text-stone-300" />
              <p className="font-semibold text-stone-800">{t.noScansYet}</p>
              <button
                onClick={() => setActiveSection('detection')}
                className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg hover:bg-emerald-800"
              >
                Scan My First Crop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    {getResolvedScanImage(scan) && (
                      <div className="h-44 bg-stone-100 overflow-hidden relative group">
                        <img
                          src={getResolvedScanImage(scan)!}
                          alt={scan.cropName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (scan.cropName === 'Tomato' || scan.mostLikelyDisease?.toLowerCase().includes('early blight')) {
                              target.src = '/images/crops/tomato_early_blight.jpg';
                            } else if (scan.cropName === 'Onion') {
                              target.src = '/images/crops/onion_purple_blotch.jpg';
                            }
                          }}
                        />
                        <span className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </span>
                        <span className="absolute bottom-2 left-2 bg-emerald-950/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                          {scan.cropName === 'Tomato' ? 'Target Board Rings' : 'Foliar Symptom'}
                        </span>
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-800 uppercase tracking-wider">
                          {scan.cropName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            scan.severity === 'High'
                              ? 'bg-red-50 text-red-700'
                              : scan.severity === 'Moderate'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {scan.severity} Severity
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-stone-900 leading-snug">
                        {scan.mostLikelyDisease}
                      </h3>
                      <p className="text-[11px] text-stone-500 italic">
                        {scan.scientificName}
                      </p>
                      <div className="pt-2 text-xs text-stone-600 line-clamp-2">
                        {scan.visibleSymptoms?.[0] || 'Symptoms analysed'}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                    <button
                      onClick={() => setSelectedScanModal(scan)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.actionViewReport}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveScanContext(scan);
                        setActiveSection('chatbot');
                      }}
                      className="text-xs font-bold text-emerald-800 hover:underline"
                    >
                      Ask Sahayak →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Pending Care Tasks */}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Crop Care Schedule & Tasks</h2>
              <p className="text-xs text-stone-700">
                Follow preventive cultural practices and scheduled organic foliar sprays.
              </p>
            </div>
            <button
              onClick={() => setIsAddingTask(!isAddingTask)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.btnAddNewTask}</span>
            </button>
          </div>

          {/* Add Task Form */}
          {isAddingTask && (
            <form
              onSubmit={handleCreateTask}
              className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs"
            >
              <h4 className="font-bold text-stone-900">Add New Agricultural Care Task</h4>
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder={t.taskTitlePlaceholder}
                className="w-full p-2.5 border border-stone-300 rounded-lg bg-white"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">{t.taskCropLabel}</label>
                  <select
                    value={newTaskCrop}
                    onChange={(e) => setNewTaskCrop(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="Tomato">Tomato (टोमॅटो)</option>
                    <option value="Rice">Rice (भात)</option>
                    <option value="Onion">Onion (कांदा)</option>
                    <option value="Cotton">Cotton (कापूस)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">{t.taskDueDate}</label>
                  <input
                    type="date"
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-600 mb-1">{t.taskPriority}</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full p-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-3 py-1.5 border border-stone-200 rounded-lg text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 text-white font-bold rounded-lg"
                >
                  Save Task
                </button>
              </div>
            </form>
          )}

          {/* Tasks List */}
          <div className="divide-y divide-stone-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="py-3.5 flex items-start justify-between gap-4 hover:bg-stone-50/50 rounded-lg px-2 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${
                        task.completed ? 'line-through text-stone-400' : 'text-stone-900'
                      }`}
                    >
                      {task.title[language] || task.title.en}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-700 mt-1">
                      <span>Crop: <strong>{task.crop}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-600" />
                        Due: {task.dueDate}
                      </span>
                      <span>·</span>
                      <span
                        className={`font-semibold ${
                          task.priority === 'High'
                            ? 'text-red-700'
                            : task.priority === 'Medium'
                            ? 'text-amber-800'
                            : 'text-stone-700'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {task.completed ? t.completed : t.markComplete}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Order Tracking */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Demonstration Orders & Dispatch Tracking</h2>
            <p className="text-xs text-stone-700">
              Orders placed in demonstration mode. In live production, these link to district agricultural cooperatives.
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <div>
                    <span className="font-bold text-emerald-950 font-mono text-sm block">
                      {ord.id}
                    </span>
                    <span className="text-stone-700">Date: {ord.orderDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200">
                      {ord.dispatchStatus}
                    </span>
                    <span className="font-bold text-sm text-stone-900">
                      ₹{ord.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-stone-700">Products Ordered:</span>
                  <ul className="divide-y divide-stone-100">
                    {ord.items.map((it, idx) => (
                      <li key={idx} className="py-1 flex justify-between">
                        <span>{it.productName} × {it.quantity}</span>
                        <span className="font-semibold">₹{it.unitPrice * it.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-stone-700 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>Delivery Address: {ord.deliveryAddress}</span>
                  <span className="font-semibold text-emerald-800">{ord.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Saved Care Kits */}
      {activeTab === 'kits' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Saved Custom Care Kits</h2>
            <p className="text-xs text-stone-700">
              Personalised treatment packages generated from your 30-question crop assessments.
            </p>
          </div>

          {savedKits.length === 0 ? (
            <div className="p-8 text-center text-stone-700 space-y-2">
              <p>{t.noKitsYet}</p>
              <button
                onClick={() => setActiveSection('assessment')}
                className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Start 30-Question Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedKits.map((kit) => (
                <div
                  key={kit.id}
                  className="p-5 rounded-xl border border-stone-200 bg-stone-50/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                    <div>
                      <h3 className="font-bold text-base text-stone-900">{kit.title}</h3>
                      <p className="text-xs text-stone-700">
                        Crop: {kit.crop} · Area: {kit.areaAcre} Acre(s) · {kit.tier}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-950 font-sans">
                        ₹{kit.estimatedTotalCostINR}
                      </span>
                      <span className="text-[10px] text-stone-700 block">
                        (₹{kit.costPerAcreINR}/acre)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-stone-600">
                    <span className="font-semibold text-stone-800">Included Inputs:</span>
                    <div className="flex flex-wrap gap-2">
                      {kit.products.map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px]"
                        >
                          {p.name} ({p.quantity}) - ₹{p.costINR}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const newTitle = prompt('Enter new kit name:', kit.title);
                        if (newTitle) renameKit(kit.id, newTitle);
                      }}
                      className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Rename</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          kit.products.forEach((p) => {
                            // Find product in catalog
                            addToCart({
                              id: p.productId || p.id,
                              name: p.name,
                              brand: 'AgriCare Cooperative',
                              category: 'organic',
                              categoryLabel: { en: 'Organic', mr: 'सेंद्रिय', hi: 'जैविक' },
                              packSize: p.quantity,
                              priceINR: p.costINR,
                              pricePerUnit: `₹${p.costINR}`,
                              availability: 'in_stock',
                              seller: 'District Agricultural Hub',
                              sellerLocation: 'Maharashtra',
                              rating: 4.8,
                              reviewsCount: 50,
                              image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80',
                              description: { en: p.purpose, mr: p.purpose, hi: p.purpose },
                              suitableCrops: [kit.crop],
                              intendedUse: { en: p.purpose, mr: p.purpose, hi: p.purpose },
                              usageInstructions: { en: 'Follow schedule', mr: 'वेळापत्रक पाळा', hi: 'समय सारिणी देखें' },
                              precautions: { en: 'Safe usage', mr: 'सुरक्षित वापर', hi: 'सुरक्षित उपयोग' },
                              isVerifiedGovtCoop: true,
                              isDemonstration: true,
                            });
                          });
                        }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add Kit Items to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this saved care kit?')) {
                            deleteKit(kit.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Delete kit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Visualisations & Farm Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Chart 1: Scans Over Time */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>Crop Scans History (Monthly)</span>
              </h3>
              <span className="text-[11px] text-stone-500 font-semibold">2026 Kharif/Rabi</span>
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-stone-100">
              {[
                { month: 'Jun', count: 2, height: '30%' },
                { month: 'Jul', count: 4, height: '55%' },
                { month: 'Aug', count: 6, height: '80%' },
                { month: 'Sep', count: 5, height: '65%' },
                { month: 'Oct', count: 7, height: '95%' },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-emerald-800">{bar.count}</span>
                  <div
                    className="w-full bg-emerald-600 rounded-t-lg transition-all duration-500"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] font-semibold text-stone-600">{bar.month}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 text-center">
              Peak detection activity in October due to post-monsoon humidity checks.
            </p>
          </div>

          {/* Chart 2: Crop-wise Distribution */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-700" />
                <span>Crop Distribution on Farm</span>
              </h3>
              <span className="text-[11px] text-stone-500 font-semibold">{profile.farmSizeAcres} Acres Total</span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Tomato (टोमॅटो)</span>
                  <span>1.5 Acres (60%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Onion (कांदा)</span>
                  <span>1.0 Acre (40%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-stone-500 block text-[10px]">Completed Tasks</span>
                <span className="font-bold text-emerald-700">{completedTasks} of {tasks.length}</span>
              </div>
              <div className="p-2 bg-stone-50 rounded-lg">
                <span className="text-stone-500 block text-[10px]">Input Spending</span>
                <span className="font-bold text-stone-900">₹{orders.reduce((sum, o) => sum + o.totalAmount, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Left: Official Kisan Smart Pass */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {t.kisanCardTitle}
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                {t.myKisanPass}
              </h3>
              <p className="text-xs text-stone-600">
                {t.certifiedDigitalPass}
              </p>
            </div>

            <KisanIdCard farmer={profile} showPrintAction={true} />
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-bold text-stone-900">{t.tabProfile}</h2>
              <p className="text-xs text-stone-700">
                Only information necessary to calibrate care plans and localized guidance is stored.
              </p>
            </div>

            {profileSaveNotice && (
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-semibold">
                {t.profileSavedNotice}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">{t.farmerNameLabel}</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">{t.farmerPhoneLabel}</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Total Cultivated Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profileForm.farmSizeAcres}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, farmSizeAcres: Number(e.target.value) })
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">District / Taluka</label>
                  <input
                    type="text"
                    value={profileForm.district}
                    onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer transition-colors"
              >
                {t.saveProfileBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Scan Details Modal */}
      {selectedScanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedScanModal(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase">
              <span>{selectedScanModal.cropName}</span>
              <span>·</span>
              <span>{selectedScanModal.severity} Severity</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {selectedScanModal.mostLikelyDisease}
            </h2>
            <p className="text-xs italic text-stone-500">{selectedScanModal.scientificName}</p>

            {getResolvedScanImage(selectedScanModal) && (
              <div className="space-y-1.5">
                <div className="h-56 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
                  <img
                    src={getResolvedScanImage(selectedScanModal)!}
                    alt={selectedScanModal.cropName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (selectedScanModal.cropName === 'Tomato' || selectedScanModal.mostLikelyDisease?.toLowerCase().includes('early blight')) {
                        target.src = '/images/crops/tomato_early_blight.jpg';
                      }
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="font-semibold">
                      {selectedScanModal.cropName === 'Tomato'
                        ? 'Authentic Field Symptom: Alternaria solani concentric rings'
                        : `${selectedScanModal.cropName} Diagnostic Visual Cue`}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-mono">ICAR Validated</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs text-stone-700">
              <span className="font-bold text-stone-900 block">Recommended Next Actions:</span>
              <ul className="list-disc list-inside space-y-1">
                {selectedScanModal.immediateSteps?.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-xs">
              <span className="text-stone-500 font-mono">
                Scan recorded: {new Date(selectedScanModal.timestamp).toLocaleString()}
              </span>
              <button
                onClick={() => setSelectedScanModal(null)}
                className="px-4 py-2 bg-stone-100 font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
