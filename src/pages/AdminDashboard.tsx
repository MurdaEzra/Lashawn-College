import React, { useEffect, useState, useRef, Fragment } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Download,
  GraduationCap,
  CreditCard,
  ShieldAlert,
  Edit3,
  Save,
  X,
  DollarSign,
  Trash2,
  Check,
  Award,
  UserPlus,
  Copy,
  Printer } from
'lucide-react';
import { useStudentContext, Student } from '../contexts/StudentContext';
import {
  DRIVING_CATEGORIES,
  getFeeByCode,
  REGISTRATION_FEE,
  getAllSubclasses } from
'../data/courseCategories';
// Fee Structure State
const DEFAULT_FEES = {
  // Category A
  A1: {
    theoryOnly: 4000,
    practical: 7000,
    both: 10000
  },
  A2: {
    theoryOnly: 4800,
    practical: 8400,
    both: 12000
  },
  A3: {
    theoryOnly: 4000,
    practical: 7000,
    both: 10000
  },
  // Category B
  B1: {
    theoryOnly: 6400,
    practical: 11200,
    both: 16000
  },
  B2: {
    theoryOnly: 6400,
    practical: 11200,
    both: 16000
  },
  B3: {
    theoryOnly: 8000,
    practical: 14000,
    both: 20000
  },
  // Category C
  C: {
    theoryOnly: 7600,
    practical: 13300,
    both: 19000
  },
  C1: {
    theoryOnly: 8800,
    practical: 15400,
    both: 22000
  },
  CE: {
    theoryOnly: 10400,
    practical: 18200,
    both: 26000
  },
  // Category D
  D1: {
    theoryOnly: 9600,
    practical: 16800,
    both: 24000
  },
  D2: {
    theoryOnly: 11200,
    practical: 19600,
    both: 28000
  },
  D3: {
    theoryOnly: 12800,
    practical: 22400,
    both: 32000
  },
  // Category E, F, G
  E: {
    theoryOnly: 14000,
    practical: 24500,
    both: 35000
  },
  F: {
    theoryOnly: 7200,
    practical: 12600,
    both: 18000
  },
  G: {
    theoryOnly: 6000,
    practical: 10500,
    both: 15000
  },
  // Other Courses
  'Microsoft Office Suite': {
    theoryOnly: 0,
    practical: 0,
    both: 8000
  },
  'Basic IT & Networking': {
    theoryOnly: 0,
    practical: 0,
    both: 10000
  },
  'First Aid Training': {
    theoryOnly: 0,
    practical: 0,
    both: 5000
  },
  'Basic Mechanics': {
    theoryOnly: 0,
    practical: 0,
    both: 7000
  },
  'KRA PIN Registration': {
    theoryOnly: 0,
    practical: 0,
    both: 500
  },
  'HELB Application Assistance': {
    theoryOnly: 0,
    practical: 0,
    both: 800
  },
  'eCitizen Service Support': {
    theoryOnly: 0,
    practical: 0,
    both: 500
  },
  'Driving License Renewal': {
    theoryOnly: 0,
    practical: 0,
    both: 1000
  }
};
export function AdminDashboard() {
  const {
    students: contextStudents,
    loading: studentsLoading,
    error: studentError,
    updateStudent,
    deleteStudent,
    addStudent
  } = useStudentContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [students, setStudents] = useState(contextStudents);
  const [activeTab, setActiveTab] = useState<'students' | 'fees' | 'register'>(
    'students'
  );
  const [fees, setFees] = useState(DEFAULT_FEES);
  const [editingFee, setEditingFee] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    theoryOnly: 0,
    practical: 0,
    both: 0
  });
  const [feeSaved, setFeeSaved] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Student Detail Modal State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentData, setEditStudentData] = useState<Partial<Student>>({});
  const [printMode, setPrintMode] = useState<
    'none' | 'export' | 'receipt' | 'registration'>(
    'none');
  const [additionalPayment, setAdditionalPayment] = useState<number | ''>('');
  // Registration Form State
  const [regStep, setRegStep] = useState(1);
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [newRegNumber, setNewRegNumber] = useState('');
  const [amountPaid, setAmountPaid] = useState<number | ''>('');
  const [regFormData, setRegFormData] = useState({
    applicationType: '',
    branch: '',
    drivingCategory: '',
    subclassCode: '',
    drivingClass: '',
    studentName: '',
    idNumber: '',
    gender: '',
    dob: '',
    nationality: '',
    county: '',
    email: '',
    phone: '',
    previousExperience: '',
    healthCondition: '',
    kinName: '',
    kinRelationship: '',
    kinPhone: '',
    kinEmail: '',
    kinCity: '',
    isSelfSponsored: 'yes',
    sponsorName: '',
    sponsorRelationship: '',
    sponsorPhone: '',
    sponsorEmail: '',
    sponsorCity: '',
    schedule: '',
    source: '',
    salesPerson: '',
    termsAccepted: false,
    privacyAccepted: false
  });
  const handleRegChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setRegFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subclass if category changes
      ...(name === 'drivingCategory' ?
      {
        subclassCode: ''
      } :
      {})
    }));
  };
  const changeRegStep = async (direction: 1 | -1) => {
    setIsStepLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setRegStep((prev) => prev + direction);
    setIsStepLoading(false);
    window.scrollTo(0, 0);
  };
  const nextRegStep = () => changeRegStep(1);
  const prevRegStep = () => changeRegStep(-1);
  const generateRegistrationNumber = () => {
    const year = new Date().getFullYear();
    const prefix = `LASH-${year}-`;
    const highestNumber = contextStudents.reduce((max, student) => {
      if (!student.id.startsWith(prefix)) {
        return max;
      }
      const sequence = Number(student.id.slice(prefix.length));
      if (Number.isNaN(sequence)) {
        return max;
      }
      return Math.max(max, sequence);
    }, 0);
    const nextNumber = highestNumber + 1;
    return `${prefix}${String(nextNumber).padStart(4, '0')}`;
  };
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReg(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newRegNum = generateRegistrationNumber();
      setNewRegNumber(newRegNum);
      const courseFee = getFeeByCode(regFormData.subclassCode) || 0;
      const totalFee = courseFee + REGISTRATION_FEE;
      const paid = typeof amountPaid === 'number' ? amountPaid : 0;
      const selectedSubclass = getAllSubclasses().find(
        (s) => s.code === regFormData.subclassCode
      );
      const courseName = selectedSubclass ?
      `${selectedSubclass.code} — ${selectedSubclass.name}` :
      regFormData.drivingCategory;
      await addStudent({
        registrationNumber: newRegNum,
        applicationType: regFormData.applicationType,
        branch: regFormData.branch,
        drivingCategory: regFormData.drivingCategory,
        subclassCode: regFormData.subclassCode,
        drivingClass: regFormData.drivingClass,
        studentName: regFormData.studentName,
        idNumber: regFormData.idNumber,
        gender: regFormData.gender,
        dob: regFormData.dob,
        nationality: regFormData.nationality,
        county: regFormData.county,
        email: regFormData.email,
        phone: regFormData.phone,
        previousExperience: regFormData.previousExperience,
        healthCondition: regFormData.healthCondition,
        kinName: regFormData.kinName,
        kinRelationship: regFormData.kinRelationship,
        kinPhone: regFormData.kinPhone,
        kinEmail: regFormData.kinEmail,
        kinCity: regFormData.kinCity,
        isSelfSponsored: regFormData.isSelfSponsored,
        sponsorName: regFormData.sponsorName,
        sponsorRelationship: regFormData.sponsorRelationship,
        sponsorPhone: regFormData.sponsorPhone,
        sponsorEmail: regFormData.sponsorEmail,
        sponsorCity: regFormData.sponsorCity,
        schedule: regFormData.schedule,
        source: regFormData.source,
        salesPerson: regFormData.salesPerson,
        termsAccepted: regFormData.termsAccepted,
        privacyAccepted: regFormData.privacyAccepted,
        courseName,
        courseFee,
        registrationFee: REGISTRATION_FEE,
        totalFee,
        amountPaid: paid,
        pendingDays: 30,
        eligibleForExams: paid >= totalFee,
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
      setRegStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to save student registration', error);
      window.alert('Failed to save student registration to Supabase.');
    } finally {
      setIsSubmittingReg(false);
    }
  };
  const resetRegistration = () => {
    setRegStep(1);
    setIsStepLoading(false);
    setNewRegNumber('');
    setAmountPaid('');
    setRegFormData({
      applicationType: '',
      branch: '',
      drivingCategory: '',
      subclassCode: '',
      drivingClass: '',
      studentName: '',
      idNumber: '',
      gender: '',
      dob: '',
      nationality: '',
      county: '',
      email: '',
      phone: '',
      previousExperience: '',
      healthCondition: '',
      kinName: '',
      kinRelationship: '',
      kinPhone: '',
      kinEmail: '',
      kinCity: '',
      isSelfSponsored: 'yes',
      sponsorName: '',
      sponsorRelationship: '',
      sponsorPhone: '',
      sponsorEmail: '',
      sponsorCity: '',
      schedule: '',
      source: '',
      salesPerson: '',
      termsAccepted: false,
      privacyAccepted: false
    });
  };
  const copyRegNumber = () => {
    navigator.clipboard.writeText(newRegNumber);
  };
  // Get selected category object to populate subclasses
  const selectedCategoryObj = DRIVING_CATEGORIES.find(
    (c) => c.code === regFormData.drivingCategory
  );
  useEffect(() => {
    let filtered = contextStudents;
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCourse !== 'All') {
      filtered = filtered.filter((s) => s.course.includes(filterCourse));
    }
    setStudents(filtered);
  }, [searchTerm, filterCourse, contextStudents]);
  // Close action menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenActionMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const totalStudents = contextStudents.length;
  const eligibleStudents = contextStudents.filter(
    (s) => s.eligibleForExams
  ).length;
  const totalRevenue = contextStudents.reduce((sum, s) => sum + s.feesPaid, 0);
  const pendingFees = contextStudents.reduce(
    (sum, s) => sum + (s.totalFees - s.feesPaid),
    0
  );
  const startEditingFee = (category: string) => {
    setEditingFee(category);
    setEditValues(fees[category as keyof typeof fees]);
    setFeeSaved(false);
  };
  const saveFee = () => {
    if (editingFee) {
      setFees((prev) => ({
        ...prev,
        [editingFee]: editValues
      }));
      setEditingFee(null);
      setFeeSaved(true);
      setTimeout(() => setFeeSaved(false), 3000);
    }
  };
  const cancelEditFee = () => {
    setEditingFee(null);
  };
  const handleMarkPaid = async (studentId: string, totalFees: number) => {
    try {
      await updateStudent(studentId, {
        feesPaid: totalFees
      });
    } catch (error) {
      console.error('Failed to mark fees as paid', error);
      window.alert('Failed to update student payment in Supabase.');
    }
    setOpenActionMenu(null);
  };
  const handleToggleEligibility = (
  studentId: string,
  currentStatus: boolean) =>
  {
    void updateStudent(studentId, {
      eligibleForExams: !currentStatus
    }).catch((error) => {
      console.error('Failed to toggle exam eligibility', error);
      window.alert('Failed to update exam eligibility in Supabase.');
    });
    setOpenActionMenu(null);
  };
  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(studentId);
      } catch (error) {
        console.error('Failed to delete student', error);
        window.alert('Failed to delete student from Supabase.');
      }
    }
    setOpenActionMenu(null);
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#2E8B57] p-2 rounded-lg mr-3">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Lashawn Admin Portal</h1>
              <p className="text-xs text-gray-400">Student Management System</p>
            </div>
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {studentError &&
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {studentError}
          </div>
        }
        {studentsLoading &&
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-700">
            Loading student records from Supabase...
          </div>
        }
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="bg-blue-100 p-4 rounded-full mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Students
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalStudents}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="bg-green-100 p-4 rounded-full mr-4">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Exam Eligible</p>
              <p className="text-2xl font-bold text-gray-900">
                {eligibleStudents}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="bg-emerald-100 p-4 rounded-full mr-4">
              <CreditCard className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                KSh {totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="bg-orange-100 p-4 rounded-full mr-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Fees</p>
              <p className="text-2xl font-bold text-gray-900">
                KSh {pendingFees.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'students' ? 'border-[#2E8B57] text-[#2E8B57]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            
            <Users className="h-4 w-4 inline mr-2" />
            Student Directory
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'register' ? 'border-[#2E8B57] text-[#2E8B57]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            
            <UserPlus className="h-4 w-4 inline mr-2" />
            Register Student
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'fees' ? 'border-[#2E8B57] text-[#2E8B57]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            
            <DollarSign className="h-4 w-4 inline mr-2" />
            Fee Structure
          </button>
        </div>

        {/* Students Tab */}
        {activeTab === 'students' &&
        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-sm border border-gray-200 border-t-0 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-800">
                All Admitted Students
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none w-full sm:w-64" />
                
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="pl-9 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none appearance-none bg-white w-full sm:w-auto">
                  
                    <option value="All">All Courses</option>
                    <option value="Category">Driving Courses</option>
                    <option value="Microsoft">Computer Courses</option>
                    <option value="Basic IT">IT Courses</option>
                  </select>
                </div>
                <button
                onClick={() => {
                  setPrintMode('export');
                  setTimeout(() => window.print(), 100);
                }}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300">
                
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">Reg No. & Name</th>
                    <th className="px-6 py-4 font-semibold">Course Enrolled</th>
                    <th className="px-6 py-4 font-semibold">Fees Status</th>
                    <th className="px-6 py-4 font-semibold">Pending Days</th>
                    <th className="px-6 py-4 font-semibold">
                      Exam Eligibility
                    </th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.length > 0 ?
                students.map((student) => {
                  const feePercentage =
                  student.feesPaid / student.totalFees * 100;
                  const isFullyPaid = feePercentage === 100;
                  return (
                    <tr
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student);
                        setEditStudentData(student);
                        setIsEditing(false);
                      }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer">
                      
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold text-sm mr-3">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {student.name}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  {student.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-700">
                              {student.course}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  KSh {student.feesPaid.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  / {student.totalFees.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                              className={`h-1.5 rounded-full ${isFullyPaid ? 'bg-green-500' : 'bg-orange-500'}`}
                              style={{
                                width: `${feePercentage}%`
                              }}>
                            </div>
                              </div>
                              {!isFullyPaid &&
                          <span className="text-xs text-orange-600 mt-1 font-medium">
                                  Balance: KSh{' '}
                                  {(
                            student.totalFees - student.feesPaid).
                            toLocaleString()}
                                </span>
                          }
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {student.pendingDays > 0 ?
                        <div className="flex items-center text-sm text-gray-700">
                                <Clock className="h-4 w-4 text-blue-500 mr-1.5" />
                                {student.pendingDays} days left
                              </div> :

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                        }
                          </td>
                          <td className="px-6 py-4">
                            {student.eligibleForExams ?
                        <div className="flex items-center text-sm text-green-600 font-medium">
                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                Eligible
                              </div> :

                        <div className="flex items-center text-sm text-red-600 font-medium">
                                <XCircle className="h-4 w-4 mr-1.5" />
                                Not Eligible
                              </div>
                        }
                          </td>
                          <td className="px-6 py-4 text-right relative">
                            <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenu(
                              openActionMenu === student.id ?
                              null :
                              student.id
                            );
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                          
                              <MoreVertical className="h-5 w-5" />
                            </button>

                            {openActionMenu === student.id &&
                        <div
                          ref={menuRef}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-8 top-10 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1 text-left">
                          
                                {!isFullyPaid &&
                          <button
                            onClick={() =>
                            handleMarkPaid(
                              student.id,
                              student.totalFees
                            )
                            }
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                            
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Mark as Fully Paid
                                  </button>
                          }
                                <button
                            onClick={() =>
                            handleToggleEligibility(
                              student.id,
                              student.eligibleForExams
                            )
                            }
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                            
                                  <Award className="h-4 w-4 mr-2 text-blue-500" />
                                  Toggle Eligibility
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                            onClick={() =>
                            handleDeleteStudent(student.id)
                            }
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                            
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Student
                                </button>
                              </div>
                        }
                          </td>
                        </tr>);

                }) :

                <tr>
                      <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500">
                    
                        <div className="flex flex-col items-center justify-center">
                          <Search className="h-8 w-8 text-gray-300 mb-2" />
                          <p>No students found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                }
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing <span className="font-medium">{students.length}</span>{' '}
                of <span className="font-medium">{contextStudents.length}</span>{' '}
                students
              </span>
              <div className="flex space-x-2">
                <button
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled>
                
                  Previous
                </button>
                <button
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
                disabled>
                
                  Next
                </button>
              </div>
            </div>
          </div>
        }

        {/* Fee Structure Tab */}
        {activeTab === 'fees' &&
        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-sm border border-gray-200 border-t-0 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Fee Structure Management
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Click the edit icon on any course to update its fees.
                </p>
              </div>
              {feeSaved &&
            <div className="flex items-center text-sm text-green-600 bg-green-50 px-4 py-2 rounded-md">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Fees updated successfully
                </div>
            }
            </div>

            {/* Driving Courses Fees */}
            <div className="p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Driving Courses
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#2E8B57] text-white text-sm">
                      <th className="px-4 py-3 rounded-tl-lg">Category</th>
                      <th className="px-4 py-3">Theory Only (KSh)</th>
                      <th className="px-4 py-3">Practical Only (KSh)</th>
                      <th className="px-4 py-3">Theory & Practical (KSh)</th>
                      <th className="px-4 py-3 rounded-tr-lg text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(fees).
                  filter(([key]) => /^[A-G]\d?$/.test(key) || key === 'CE').
                  map(([category, values], index) =>
                  <tr
                    key={category}
                    className={
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }>
                    
                          <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                            {category}
                          </td>
                          {editingFee === category ?
                    <>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.theoryOnly}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            theoryOnly: Number(e.target.value)
                          }))
                          }
                          className="w-24 border border-[#2E8B57] rounded px-2 py-1 text-sm focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                        
                              </td>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.practical}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            practical: Number(e.target.value)
                          }))
                          }
                          className="w-24 border border-[#2E8B57] rounded px-2 py-1 text-sm focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                        
                              </td>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.both}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            both: Number(e.target.value)
                          }))
                          }
                          className="w-24 border border-[#2E8B57] rounded px-2 py-1 text-sm focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                        
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                            onClick={saveFee}
                            className="p-1.5 bg-[#2E8B57] text-white rounded-md hover:bg-[#267349] transition-colors"
                            title="Save">
                            
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                            onClick={cancelEditFee}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                            title="Cancel">
                            
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </> :

                    <>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {values.theoryOnly.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {values.practical.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-[#2E8B57]">
                                {values.both.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                          onClick={() => startEditingFee(category)}
                          className="p-1.5 text-gray-400 hover:text-[#2E8B57] hover:bg-[#2E8B57]/10 rounded-md transition-colors"
                          title="Edit fees">
                          
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </td>
                            </>
                    }
                        </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Computer Courses Fees */}
            <div className="p-6 pt-0">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Computer Courses
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1E90FF] text-white text-sm">
                      <th className="px-4 py-3 rounded-tl-lg">Course</th>
                      <th className="px-4 py-3">Course Fee (KSh)</th>
                      <th className="px-4 py-3 rounded-tr-lg text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(fees).
                  filter(
                    ([key]) =>
                    key.startsWith('Microsoft') ||
                    key.startsWith('Basic IT')
                  ).
                  map(([category, values], index) =>
                  <tr
                    key={category}
                    className={
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }>
                    
                          <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                            {category}
                          </td>
                          {editingFee === category ?
                    <>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.both}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            both: Number(e.target.value)
                          }))
                          }
                          className="w-28 border border-[#1E90FF] rounded px-2 py-1 text-sm focus:ring-1 focus:ring-[#1E90FF] outline-none" />
                        
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                            onClick={saveFee}
                            className="p-1.5 bg-[#1E90FF] text-white rounded-md hover:bg-blue-600 transition-colors"
                            title="Save">
                            
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                            onClick={cancelEditFee}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                            title="Cancel">
                            
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </> :

                    <>
                              <td className="px-4 py-3 text-sm font-medium text-[#1E90FF]">
                                {values.both.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                          onClick={() => startEditingFee(category)}
                          className="p-1.5 text-gray-400 hover:text-[#1E90FF] hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit fees">
                          
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </td>
                            </>
                    }
                        </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Special Courses Fees */}
            <div className="p-6 pt-0">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Special Courses
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D7263D] text-white text-sm">
                      <th className="px-4 py-3 rounded-tl-lg">Course</th>
                      <th className="px-4 py-3">Course Fee (KSh)</th>
                      <th className="px-4 py-3 rounded-tr-lg text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(fees).
                  filter(
                    ([key]) =>
                    key === 'First Aid Training' ||
                    key === 'Basic Mechanics'
                  ).
                  map(([category, values], index) =>
                  <tr
                    key={category}
                    className={
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }>
                    
                          <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                            {category}
                          </td>
                          {editingFee === category ?
                    <>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.both}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            both: Number(e.target.value)
                          }))
                          }
                          className="w-28 border border-[#D7263D] rounded px-2 py-1 text-sm focus:ring-1 focus:ring-[#D7263D] outline-none" />
                        
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                            onClick={saveFee}
                            className="p-1.5 bg-[#D7263D] text-white rounded-md hover:bg-red-600 transition-colors"
                            title="Save">
                            
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                            onClick={cancelEditFee}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                            title="Cancel">
                            
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </> :

                    <>
                              <td className="px-4 py-3 text-sm font-medium text-[#D7263D]">
                                {values.both.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                          onClick={() => startEditingFee(category)}
                          className="p-1.5 text-gray-400 hover:text-[#D7263D] hover:bg-red-50 rounded-md transition-colors"
                          title="Edit fees">
                          
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </td>
                            </>
                    }
                        </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Services Fees */}
            <div className="p-6 pt-0">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Additional Services
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white text-sm">
                      <th className="px-4 py-3 rounded-tl-lg">Service</th>
                      <th className="px-4 py-3">Fee (KSh)</th>
                      <th className="px-4 py-3 rounded-tr-lg text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(fees).
                  filter(
                    ([key]) =>
                    key === 'KRA PIN Registration' ||
                    key === 'HELB Application Assistance' ||
                    key === 'eCitizen Service Support' ||
                    key === 'Driving License Renewal'
                  ).
                  map(([category, values], index) =>
                  <tr
                    key={category}
                    className={
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }>
                    
                          <td className="px-4 py-3 font-medium text-gray-800 text-sm">
                            {category}
                          </td>
                          {editingFee === category ?
                    <>
                              <td className="px-4 py-3">
                                <input
                          type="number"
                          value={editValues.both}
                          onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            both: Number(e.target.value)
                          }))
                          }
                          className="w-28 border border-gray-800 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-gray-800 outline-none" />
                        
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                            onClick={saveFee}
                            className="p-1.5 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                            title="Save">
                            
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                            onClick={cancelEditFee}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
                            title="Cancel">
                            
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </> :

                    <>
                              <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                {values.both.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                          onClick={() => startEditingFee(category)}
                          className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit fees">
                          
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </td>
                            </>
                    }
                        </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
              <p>
                Note: Fee changes will apply to new registrations only. Existing
                student fees remain unchanged.
              </p>
            </div>
          </div>
        }

        {/* Register Student Tab */}
        {activeTab === 'register' &&
        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-sm border border-gray-200 border-t-0 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">
                Register New Student
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Complete the form below to register a new student.
              </p>
            </div>
            <div className="p-6">
              {regStep < 4 &&
            <div className="flex items-center mb-8">
                  {[1, 2, 3].map((step) =>
              <Fragment key={step}>
                      <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${regStep >= step ? 'bg-[#2E8B57] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  
                        {step}
                      </div>
                      {step < 3 &&
                <div
                  className={`flex-1 h-1 mx-2 rounded ${regStep > step ? 'bg-[#2E8B57]' : 'bg-gray-200'}`}>
                </div>
                }
                    </Fragment>
              )}
                  <div className="ml-4 text-sm text-gray-500">
                    Step {regStep} of 3:{' '}
                    {regStep === 1 ?
                'Student Details' :
                regStep === 2 ?
                'Contact & Next of Kin' :
                'Payment'}
                  </div>
                </div>
            }

              {isStepLoading &&
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
                  <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#2E8B57]/20 border-t-[#2E8B57]"></div>
                  <p className="text-sm font-medium text-gray-700">
                    Loading next step...
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Preparing the registration form.
                  </p>
                </div>
            }

              {/* Step 1: Student Details */}
              {!isStepLoading && regStep === 1 &&
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void nextRegStep();
              }}>
              
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Application Type *
                      </label>
                      <select
                    name="applicationType"
                    value={regFormData.applicationType}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select type</option>
                        <option value="New">New Application</option>
                        <option value="Renewal">Refresher</option>
                        <option value="Upgrade">Upgrade</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Branch *
                      </label>
                      <select
                    name="branch"
                    value={regFormData.branch}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select branch</option>
                        <option value="Eldoret Main">Eldoret Main Branch</option>
                        <option value="Eldoret Main">Eldoret Road Branch</option>
                        <option value="Eldoret Main">Nyahururu Branch</option>


                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Driving Category *
                      </label>
                      <select
                    name="drivingCategory"
                    value={regFormData.drivingCategory}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select category</option>
                        {DRIVING_CATEGORIES.map((cat) =>
                    <option key={cat.code} value={cat.code}>
                            {cat.code} — {cat.name}
                          </option>
                    )}
                      </select>
                    </div>
                    {selectedCategoryObj &&
                <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subclass *
                        </label>
                        <select
                    name="subclassCode"
                    value={regFormData.subclassCode}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                          <option value="">Select subclass</option>
                          {selectedCategoryObj.subclasses.map((sub) =>
                    <option key={sub.code} value={sub.code}>
                              {sub.code} — {sub.name}
                            </option>
                    )}
                        </select>
                      </div>
                }
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class Type *
                      </label>
                      <select
                    name="drivingClass"
                    value={regFormData.drivingClass}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select class</option>
                        <option value="Theory Only">Theory Only</option>
                        <option value="Practical Only">Practical Only</option>
                        <option value="Theory & Practical">
                          Theory & Practical
                        </option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <hr className="my-2 border-gray-200" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                    type="text"
                    name="studentName"
                    value={regFormData.studentName}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="Enter full name" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID/Passport Number *
                      </label>
                      <input
                    type="text"
                    name="idNumber"
                    value={regFormData.idNumber}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="Enter ID number" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <select
                    name="gender"
                    value={regFormData.gender}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                    type="date"
                    name="dob"
                    value={regFormData.dob}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                    type="text"
                    name="nationality"
                    value={regFormData.nationality}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="e.g. Kenyan" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        County
                      </label>
                      <input
                    type="text"
                    name="county"
                    value={regFormData.county}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="e.g. Uasin Gishu" />
                  
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <button
                  type="submit"
                  disabled={isStepLoading}
                  className="bg-[#2E8B57] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#267349] transition-colors">
                  
                      Next: Contact Details →
                    </button>
                  </div>
                </form>
            }

              {/* Step 2: Contact & Next of Kin */}
              {!isStepLoading && regStep === 2 &&
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void nextRegStep();
              }}>
              
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                    type="email"
                    name="email"
                    value={regFormData.email}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="student@email.com" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                    type="tel"
                    name="phone"
                    value={regFormData.phone}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="07XXXXXXXX" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Driving Experience
                      </label>
                      <select
                    name="previousExperience"
                    value={regFormData.previousExperience}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select</option>
                        <option value="None">None</option>
                        <option value="Some">Some experience</option>
                        <option value="Experienced">Experienced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Health Condition
                      </label>
                      <select
                    name="healthCondition"
                    value={regFormData.healthCondition}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select</option>
                        <option value="Good">Good</option>
                        <option value="Wears Glasses">Wears Glasses</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Next of Kin
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Next of Kin Name *
                      </label>
                      <input
                    type="text"
                    name="kinName"
                    value={regFormData.kinName}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship *
                      </label>
                      <input
                    type="text"
                    name="kinRelationship"
                    value={regFormData.kinRelationship}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                    type="tel"
                    name="kinPhone"
                    value={regFormData.kinPhone}
                    onChange={handleRegChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                    type="email"
                    name="kinEmail"
                    value={regFormData.kinEmail}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none" />
                  
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                  type="button"
                  onClick={() => void prevRegStep()}
                  disabled={isStepLoading}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  
                      ← Back
                    </button>
                    <button
                  type="submit"
                  disabled={isStepLoading}
                  className="bg-[#2E8B57] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#267349] transition-colors">
                  
                      Next: Payment →
                    </button>
                  </div>
                </form>
            }

              {/* Step 3: Payment */}
              {!isStepLoading && regStep === 3 &&
            <form onSubmit={handleRegistrationSubmit}>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Payment Information
                  </h3>
                  {regFormData.subclassCode &&
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Course Fee:
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          KSh{' '}
                          {(
                    getFeeByCode(regFormData.subclassCode) || 0).
                    toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Registration Fee:
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          KSh {REGISTRATION_FEE.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800">
                          Total:
                        </span>
                        <span className="text-lg font-bold text-[#2E8B57]">
                          KSh{' '}
                          {(
                    (getFeeByCode(regFormData.subclassCode) || 0) +
                    REGISTRATION_FEE).
                    toLocaleString()}
                        </span>
                      </div>
                    </div>
              }
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount Paid Now (KSh) *
                      </label>
                      <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) =>
                    setAmountPaid(
                      e.target.value ? Number(e.target.value) : ''
                    )
                    }
                    required
                    min={0}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                    placeholder="Enter amount" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Schedule
                      </label>
                      <select
                    name="schedule"
                    value={regFormData.schedule}
                    onChange={handleRegChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none">
                    
                        <option value="">Select schedule</option>
                        <option value="Morning">Morning (8am–12pm)</option>
                        <option value="Afternoon">Afternoon (12pm–4pm)</option>
                        <option value="Evening">Evening (4pm–6pm)</option>
                        <option value="Weekend">Weekend</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6 space-y-3">
                    <label className="flex items-start gap-2">
                      <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={regFormData.termsAccepted}
                    onChange={handleRegChange}
                    required
                    className="mt-1 h-4 w-4 text-[#2E8B57] rounded border-gray-300" />
                  
                      <span className="text-sm text-gray-600">
                        I confirm the student has read and accepted the terms
                        and conditions.
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button
                  type="button"
                  onClick={() => void prevRegStep()}
                  disabled={isSubmittingReg || isStepLoading}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  
                      ← Back
                    </button>
                    <button
                  type="submit"
                  disabled={isSubmittingReg}
                  className="bg-[#2E8B57] text-white px-8 py-2.5 rounded-md text-sm font-medium hover:bg-[#267349] transition-colors disabled:opacity-50">
                  
                      {isSubmittingReg ?
                  'Registering...' :
                  'Complete Registration'}
                    </button>
                  </div>
                </form>
            }

              {/* Step 4: Success */}
              {regStep === 4 &&
            <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-[#2E8B57]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    The student has been registered successfully.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 inline-block mb-6 border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">
                      Registration Number
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-mono font-bold text-[#2E8B57]">
                        {newRegNumber}
                      </p>
                      <button
                    onClick={copyRegNumber}
                    className="p-2 text-gray-400 hover:text-[#2E8B57] hover:bg-[#2E8B57]/10 rounded-md transition-colors"
                    title="Copy">
                    
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                  onClick={() => {
                    setPrintMode('registration');
                    setTimeout(() => window.print(), 100);
                  }}
                  className="bg-gray-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center">
                  
                      <Printer className="h-4 w-4 mr-2" />
                      Print Receipt
                    </button>
                    <button
                  onClick={resetRegistration}
                  className="bg-[#2E8B57] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#267349] transition-colors">
                  
                      Register Another Student
                    </button>
                    <button
                  onClick={() => setActiveTab('students')}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  
                      View Students
                    </button>
                  </div>
                </div>
            }
            </div>
          </div>
        }
      </div>

      {/* Student Detail Modal */}
      {selectedStudent &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center font-bold text-xl">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedStudent.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-mono">{selectedStudent.id}</span>
                    <span>•</span>
                    <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedStudent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!isEditing &&
              <button
                onClick={() => {
                  setPrintMode('receipt');
                  setTimeout(() => window.print(), 100);
                }}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
                
                    <Printer className="h-4 w-4 mr-2" />
                    Print Receipt
                  </button>
              }
                <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center px-3 py-2 rounded-md transition-colors text-sm font-medium ${isEditing ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#2E8B57] text-white hover:bg-[#267349]'}`}>
                
                  {isEditing ?
                <X className="h-4 w-4 mr-2" /> :

                <Edit3 className="h-4 w-4 mr-2" />
                }
                  {isEditing ? 'Cancel Edit' : 'Edit Details'}
                </button>
                <button
                onClick={() => {
                  setSelectedStudent(null);
                  setIsEditing(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1">
              {isEditing ?
            <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                    type="text"
                    value={editStudentData.name || ''}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      name: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Number
                      </label>
                      <input
                    type="text"
                    value={editStudentData.idNumber || ''}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      idNumber: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                    type="email"
                    value={editStudentData.email || ''}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      email: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                    type="tel"
                    value={editStudentData.phone || ''}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      phone: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                      </label>
                      <input
                    type="text"
                    value={editStudentData.course || ''}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      course: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fees Paid (KSh)
                      </label>
                      <input
                    type="number"
                    value={editStudentData.feesPaid || 0}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      feesPaid: Number(e.target.value)
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Fees (KSh)
                      </label>
                      <input
                    type="number"
                    value={editStudentData.totalFees || 0}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      totalFees: Number(e.target.value)
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pending Days
                      </label>
                      <input
                    type="number"
                    value={editStudentData.pendingDays || 0}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      pendingDays: Number(e.target.value)
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                    value={editStudentData.status || 'Active'}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      status: e.target.value
                    })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E8B57] focus:ring-1 focus:ring-[#2E8B57] outline-none">
                    
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex items-center mt-2">
                      <input
                    type="checkbox"
                    id="eligible"
                    checked={editStudentData.eligibleForExams || false}
                    onChange={(e) =>
                    setEditStudentData({
                      ...editStudentData,
                      eligibleForExams: e.target.checked
                    })
                    }
                    className="h-4 w-4 text-[#2E8B57] rounded border-gray-300 focus:ring-[#2E8B57]" />
                  
                      <label
                    htmlFor="eligible"
                    className="ml-2 text-sm text-gray-700">
                    
                        Eligible for Exams
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
                  
                      Cancel
                    </button>
                    <button
                  onClick={() => {
                    void updateStudent(selectedStudent.id, editStudentData).
                    then(() => {
                      setSelectedStudent({
                        ...selectedStudent,
                        ...editStudentData
                      } as Student);
                      setIsEditing(false);
                    }).
                    catch((error) => {
                      console.error('Failed to save student changes', error);
                      window.alert('Failed to save student changes to Supabase.');
                    });
                  }}
                  className="px-4 py-2 bg-[#2E8B57] text-white rounded-md hover:bg-[#267349] font-medium flex items-center">
                  
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </button>
                  </div>
                </div> :

            <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        Personal Details
                      </h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-xs text-gray-500">Full Name</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.name}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">ID Number</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.idNumber}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">
                            Email Address
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.email}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">
                            Phone Number
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.phone}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        Course Information
                      </h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-xs text-gray-500">
                            Enrolled Course
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.course}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">
                            Enrollment Date
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {new Date(
                          selectedStudent.enrollmentDate
                        ).toLocaleDateString()}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">
                            Pending Days
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {selectedStudent.pendingDays} days
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500">
                            Exam Eligibility
                          </dt>
                          <dd className="mt-1">
                            {selectedStudent.eligibleForExams ?
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />{' '}
                                Eligible
                              </span> :

                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                <XCircle className="h-3 w-3 mr-1" /> Not
                                Eligible
                              </span>
                        }
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                      Financial Status
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Amount Paid
                          </p>
                          <p className="text-lg font-bold text-[#2E8B57]">
                            KSh {selectedStudent.feesPaid.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">
                            Total Fees
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            KSh {selectedStudent.totalFees.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                      className={`h-2 rounded-full ${selectedStudent.feesPaid >= selectedStudent.totalFees ? 'bg-[#2E8B57]' : 'bg-orange-500'}`}
                      style={{
                        width: `${Math.min(selectedStudent.feesPaid / selectedStudent.totalFees * 100, 100)}%`
                      }}>
                    </div>
                      </div>
                      {selectedStudent.feesPaid < selectedStudent.totalFees &&
                  <p className="text-sm text-orange-600 font-medium text-right">
                          Balance: KSh{' '}
                          {(
                    selectedStudent.totalFees - selectedStudent.feesPaid).
                    toLocaleString()}
                        </p>
                  }
                    </div>

                    {selectedStudent.feesPaid < selectedStudent.totalFees &&
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-gray-800 mb-3">
                          Record Additional Payment
                        </h4>
                        <div className="flex items-end gap-3">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Amount (KSh)
                            </label>
                            <input
                        type="number"
                        value={additionalPayment}
                        onChange={(e) =>
                        setAdditionalPayment(
                          e.target.value ? Number(e.target.value) : ''
                        )
                        }
                        min={1}
                        max={
                        selectedStudent.totalFees -
                        selectedStudent.feesPaid
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#2E8B57] focus:border-[#2E8B57] outline-none"
                        placeholder="Enter amount" />
                      
                          </div>
                          <button
                      onClick={() => {
                        if (
                        typeof additionalPayment === 'number' &&
                        additionalPayment > 0)
                        {
                          const newPaid =
                          selectedStudent.feesPaid + additionalPayment;
                          void updateStudent(selectedStudent.id, {
                            feesPaid: newPaid,
                            eligibleForExams:
                            newPaid >= selectedStudent.totalFees
                          }).
                          then(() => {
                            setSelectedStudent({
                              ...selectedStudent,
                              feesPaid: newPaid,
                              eligibleForExams:
                              newPaid >= selectedStudent.totalFees
                            });
                            setAdditionalPayment('');
                          }).
                          catch((error) => {
                            console.error('Failed to record payment', error);
                            window.alert('Failed to record payment in Supabase.');
                          });
                        }
                      }}
                      disabled={
                      !additionalPayment ||
                      additionalPayment <= 0 ||
                      additionalPayment >
                      selectedStudent.totalFees -
                      selectedStudent.feesPaid
                      }
                      className="bg-[#2E8B57] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#267349] transition-colors disabled:opacity-50">
                      
                            Record Payment
                          </button>
                        </div>
                      </div>
                }
                  </div>
                </div>
            }
            </div>
          </div>
        </div>
      }

      {/* PRINT VIEWS */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div id="print-area" className="hidden print:block bg-white p-8">
        {printMode === 'registration' &&
        <div className="max-w-3xl mx-auto border-2 border-gray-800 p-8">
            <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
              <img
              src="/Lashawn_Logo-removebg-preview.png"
              alt="Logo"
              className="h-16 object-contain" />
            
              <div className="text-center flex-1 px-4">
                <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">
                  STUDENT REGISTRATION RECEIPT
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Lashawn Driving School and Computer College
                </p>
                <p className="text-xs text-gray-500">
                  Along Eldoret Roadblock, Opposite Khetias Supermarket
                </p>
                <p className="text-xs text-gray-500">Tel: +254 117 564 318</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-500 uppercase">
                  Receipt No.
                </p>
                <p className="text-lg font-mono font-bold text-red-600">
                  {newRegNumber.replace('LASH', 'RCT')}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
                  Student Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Name:
                    </span>{' '}
                    {regFormData.studentName}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Reg No:
                    </span>{' '}
                    <span className="font-mono">{newRegNumber}</span>
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      ID Number:
                    </span>{' '}
                    {regFormData.idNumber}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Phone:
                    </span>{' '}
                    {regFormData.phone}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Email:
                    </span>{' '}
                    {regFormData.email}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
                  Course Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Category:
                    </span>{' '}
                    {regFormData.drivingCategory}
                  </p>
                  {regFormData.subclassCode &&
                <p>
                      <span className="font-semibold w-24 inline-block">
                        Subclass:
                      </span>{' '}
                      {regFormData.subclassCode}
                    </p>
                }
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Class Type:
                    </span>{' '}
                    {regFormData.drivingClass}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
              Payment Summary
            </h3>
            <table className="w-full text-left mb-8 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-semibold border-b border-gray-300">
                    Description
                  </th>
                  <th className="p-3 font-semibold border-b border-gray-300 text-right">
                    Amount (KSh)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-gray-200">Course Fee</td>
                  <td className="p-3 border-b border-gray-200 text-right font-medium">
                    {(
                  getFeeByCode(regFormData.subclassCode) || 0).
                  toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-200">
                    Registration Fee
                  </td>
                  <td className="p-3 border-b border-gray-200 text-right font-medium">
                    {REGISTRATION_FEE.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border-b border-gray-300 font-bold text-gray-900">
                    Total Fees
                  </td>
                  <td className="p-3 border-b border-gray-300 text-right font-bold text-gray-900">
                    {(
                  (getFeeByCode(regFormData.subclassCode) || 0) +
                  REGISTRATION_FEE).
                  toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-3 border-b border-gray-200 font-bold text-green-800">
                    Amount Paid
                  </td>
                  <td className="p-3 border-b border-gray-200 text-right font-bold text-green-800">
                    {(typeof amountPaid === 'number' ?
                  amountPaid :
                  0).
                  toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-800">
                    Outstanding Balance
                  </td>
                  <td className="p-3 text-right font-bold text-red-600">
                    {(
                  (getFeeByCode(regFormData.subclassCode) || 0) +
                  REGISTRATION_FEE - (
                  typeof amountPaid === 'number' ? amountPaid : 0)).
                  toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-end mt-16 pt-8 border-t border-gray-300">
              <div className="text-center">
                <div className="w-48 border-b border-gray-800 mb-2"></div>
                <p className="text-xs font-bold uppercase">Student Signature</p>
              </div>
              <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`RECEIPT|${newRegNumber}|${amountPaid}`)}`}
              alt="Verification QR Code"
              className="w-16 h-16" />
            
              <div className="text-center">
                <div className="w-48 border-b border-gray-800 mb-2"></div>
                <p className="text-xs font-bold uppercase">
                  Authorized Signature & Stamp
                </p>
              </div>
            </div>
          </div>
        }

        {printMode === 'export' &&
        <div>
            <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-6">
              <img
              src="/Lashawn_Logo-removebg-preview.png"
              alt="Logo"
              className="h-12 object-contain" />
            
              <div className="text-right">
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                  Student Records Report
                </h1>
                <p className="text-sm text-gray-600">
                  Generated on: {new Date().toLocaleDateString()} at{' '}
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-800">
                  <th className="p-2 font-bold">#</th>
                  <th className="p-2 font-bold">Reg No</th>
                  <th className="p-2 font-bold">Name</th>
                  <th className="p-2 font-bold">ID Number</th>
                  <th className="p-2 font-bold">Phone</th>
                  <th className="p-2 font-bold">Course</th>
                  <th className="p-2 font-bold text-right">Paid (KSh)</th>
                  <th className="p-2 font-bold text-right">Total (KSh)</th>
                  <th className="p-2 font-bold text-right">Balance</th>
                  <th className="p-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {contextStudents.map((s, i) =>
              <tr key={s.id}>
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2 font-mono text-xs">{s.id}</td>
                    <td className="p-2 font-medium">{s.name}</td>
                    <td className="p-2">{s.idNumber}</td>
                    <td className="p-2">{s.phone}</td>
                    <td className="p-2 text-xs truncate max-w-[150px]">
                      {s.course}
                    </td>
                    <td className="p-2 text-right">
                      {s.feesPaid.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {s.totalFees.toLocaleString()}
                    </td>
                    <td className="p-2 text-right text-red-600">
                      {s.totalFees - s.feesPaid > 0 ?
                  (s.totalFees - s.feesPaid).toLocaleString() :
                  '-'}
                    </td>
                    <td className="p-2 text-xs">{s.status}</td>
                  </tr>
              )}
              </tbody>
            </table>

            <div className="mt-8 border-t-2 border-gray-800 pt-4 flex justify-between font-bold">
              <p>Total Students: {contextStudents.length}</p>
              <p>
                Total Revenue: KSh{' '}
                {contextStudents.
              reduce((sum, s) => sum + s.feesPaid, 0).
              toLocaleString()}
              </p>
            </div>
          </div>
        }

        {printMode === 'receipt' && selectedStudent &&
        <div className="max-w-3xl mx-auto border-2 border-gray-800 p-8">
            <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
              <img
              src="/Lashawn_Logo-removebg-preview.png"
              alt="Logo"
              className="h-16 object-contain" />
            
              <div className="text-center flex-1 px-4">
                <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">
                  OFFICIAL RECEIPT
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Lashawn Driving School and Computer College
                </p>
                <p className="text-xs text-gray-500">
                  Along Eldoret Roadblock, Opposite Khetias Supermarket
                </p>
                <p className="text-xs text-gray-500">Tel: +254 117 564 318</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-500 uppercase">
                  Receipt No.
                </p>
                <p className="text-lg font-mono font-bold text-red-600">
                  {selectedStudent.id.replace('LASH', 'RCT')}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
                  Student Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Name:
                    </span>{' '}
                    {selectedStudent.name}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Reg No:
                    </span>{' '}
                    <span className="font-mono">{selectedStudent.id}</span>
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      ID Number:
                    </span>{' '}
                    {selectedStudent.idNumber}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Phone:
                    </span>{' '}
                    {selectedStudent.phone}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
                  Course Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Course:
                    </span>{' '}
                    {selectedStudent.course}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Enrolled:
                    </span>{' '}
                    {new Date(
                    selectedStudent.enrollmentDate
                  ).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold w-24 inline-block">
                      Status:
                    </span>{' '}
                    {selectedStudent.status}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3">
              Payment Summary
            </h3>
            <table className="w-full text-left mb-8 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-semibold border-b border-gray-300">
                    Description
                  </th>
                  <th className="p-3 font-semibold border-b border-gray-300 text-right">
                    Amount (KSh)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-gray-200">
                    Total Course Fee (Including Registration)
                  </td>
                  <td className="p-3 border-b border-gray-200 text-right font-medium">
                    {selectedStudent.totalFees.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-3 border-b border-gray-200 font-bold text-green-800">
                    Amount Paid
                  </td>
                  <td className="p-3 border-b border-gray-200 text-right font-bold text-green-800">
                    {selectedStudent.feesPaid.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-gray-800">
                    Outstanding Balance
                  </td>
                  <td className="p-3 text-right font-bold text-red-600">
                    {(
                  selectedStudent.totalFees - selectedStudent.feesPaid).
                  toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-end mt-16 pt-8 border-t border-gray-300">
              <div className="text-center">
                <div className="w-48 border-b border-gray-800 mb-2"></div>
                <p className="text-xs font-bold uppercase">Student Signature</p>
              </div>
              <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`RECEIPT|${selectedStudent.id}|${selectedStudent.feesPaid}`)}`}
              alt="Verification QR Code"
              className="w-16 h-16" />
            
              <div className="text-center">
                <div className="w-48 border-b border-gray-800 mb-2"></div>
                <p className="text-xs font-bold uppercase">
                  Authorized Signature & Stamp
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}
