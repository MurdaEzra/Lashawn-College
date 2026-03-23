import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { supabase } from './supabaseClient';

type ContactType = 'next_of_kin' | 'sponsor';

interface StudentContactRow {
  id: string;
  contact_type: ContactType;
  name: string | null;
  relationship: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  is_self_sponsored: boolean | null;
}

interface PaymentRow {
  id: string;
  amount: number | string | null;
  payment_date: string | null;
}

interface EnrollmentRow {
  id: string;
  driving_category: string | null;
  subclass_code: string | null;
  driving_class: string | null;
  course_name: string | null;
  schedule: string | null;
  source: string | null;
  sales_person: string | null;
  course_fee: number | string | null;
  registration_fee: number | string | null;
  total_fee: number | string | null;
  amount_paid: number | string | null;
  balance: number | string | null;
  terms_accepted: boolean | null;
  privacy_accepted: boolean | null;
  enrolled_at: string | null;
}

interface StudentRow {
  id: string;
  registration_number: string;
  application_type: string | null;
  branch: string | null;
  student_name: string | null;
  id_number: string | null;
  gender: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  county: string | null;
  email: string | null;
  phone: string | null;
  previous_experience: string | null;
  health_condition: string | null;
  status: string | null;
  pending_days: number | null;
  eligible_for_exams: boolean | null;
  enrollment_date: string | null;
  created_at: string | null;
  student_course_enrollments: EnrollmentRow[] | null;
  student_contacts: StudentContactRow[] | null;
  payments: PaymentRow[] | null;
}

export interface Student {
  id: string;
  studentId: string;
  enrollmentId?: string;
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  course: string;
  feesPaid: number;
  totalFees: number;
  pendingDays: number;
  eligibleForExams: boolean;
  status: string;
  enrollmentDate: string;
  documents?: {
    passportPhoto?: string;
    idCard?: string;
    pdl?: string;
  };
}

export interface StudentRegistrationPayload {
  registrationNumber?: string;
  applicationType: string;
  branch: string;
  drivingCategory: string;
  subclassCode: string;
  drivingClass: string;
  studentName: string;
  idNumber: string;
  gender: string;
  dob: string;
  nationality: string;
  county: string;
  email: string;
  phone: string;
  previousExperience: string;
  healthCondition: string;
  kinName: string;
  kinRelationship: string;
  kinPhone: string;
  kinEmail: string;
  kinCity: string;
  isSelfSponsored: string;
  sponsorName: string;
  sponsorRelationship: string;
  sponsorPhone: string;
  sponsorEmail: string;
  sponsorCity: string;
  schedule: string;
  source: string;
  salesPerson: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  courseName: string;
  courseFee: number;
  registrationFee: number;
  totalFee: number;
  amountPaid: number;
  pendingDays?: number;
  status?: string;
  eligibleForExams?: boolean;
  enrollmentDate?: string;
}

interface StudentContextType {
  students: Student[];
  loading: boolean;
  error: string;
  refreshStudents: () => Promise<void>;
  addStudent: (student: StudentRegistrationPayload) => Promise<Student>;
  updateStudent: (registrationNumber: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (registrationNumber: string) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const toNumber = (value: number | string | null | undefined) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
};

const mapStudentRow = (row: StudentRow): Student => {
  const enrollment = row.student_course_enrollments?.[0];
  const paidFromPayments = (row.payments || []).reduce(
    (sum, payment) => sum + toNumber(payment.amount),
    0
  );
  const paid = enrollment?.amount_paid != null
    ? toNumber(enrollment.amount_paid)
    : paidFromPayments;
  const totalFees = enrollment?.total_fee != null ? toNumber(enrollment.total_fee) : 0;

  return {
    id: row.registration_number,
    studentId: row.id,
    enrollmentId: enrollment?.id,
    name: row.student_name || '',
    idNumber: row.id_number || '',
    email: row.email || '',
    phone: row.phone || '',
    course: enrollment?.course_name || row.application_type || '',
    feesPaid: paid,
    totalFees,
    pendingDays: row.pending_days || 0,
    eligibleForExams: row.eligible_for_exams || false,
    status: row.status || 'Active',
    enrollmentDate:
      row.enrollment_date ||
      enrollment?.enrolled_at ||
      row.created_at ||
      new Date().toISOString().split('T')[0],
    documents: {}
  };
};

async function getNextRegistrationNumber() {
  const currentYear = new Date().getFullYear();
  const { data, error } = await supabase.rpc('next_registration_number', {
    registration_year: currentYear
  });

  if (error || !data) {
    throw new Error(
      error?.message ||
      'Failed to generate the next registration number from Supabase.'
    );
  }

  return data as string;
}

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshStudents = useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('students')
      .select(
        `
          id,
          registration_number,
          application_type,
          branch,
          student_name,
          id_number,
          gender,
          date_of_birth,
          nationality,
          county,
          email,
          phone,
          previous_experience,
          health_condition,
          status,
          pending_days,
          eligible_for_exams,
          enrollment_date,
          created_at,
          student_course_enrollments (
            id,
            driving_category,
            subclass_code,
            driving_class,
            course_name,
            schedule,
            source,
            sales_person,
            course_fee,
            registration_fee,
            total_fee,
            amount_paid,
            balance,
            terms_accepted,
            privacy_accepted,
            enrolled_at
          ),
          student_contacts (
            id,
            contact_type,
            name,
            relationship,
            phone,
            email,
            city,
            is_self_sponsored
          ),
          payments (
            id,
            amount,
            payment_date
          )
        `
      )
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setStudents([]);
      setLoading(false);
      return;
    }

    setStudents(((data || []) as StudentRow[]).map(mapStudentRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    void refreshStudents();
  }, [refreshStudents]);

  const addStudent = useCallback(
    async (student: StudentRegistrationPayload) => {
      setError('');
      const registrationNumber =
        student.registrationNumber || await getNextRegistrationNumber();

      const studentInsert = {
        registration_number: registrationNumber,
        application_type: student.applicationType || null,
        branch: student.branch || null,
        student_name: student.studentName,
        id_number: student.idNumber,
        gender: student.gender || null,
        date_of_birth: student.dob || null,
        nationality: student.nationality || null,
        county: student.county || null,
        email: student.email || null,
        phone: student.phone,
        previous_experience: student.previousExperience || null,
        health_condition: student.healthCondition || null,
        status: student.status || 'Active',
        pending_days: student.pendingDays ?? 30,
        eligible_for_exams:
          student.eligibleForExams ?? student.amountPaid >= student.totalFee,
        enrollment_date:
          student.enrollmentDate || new Date().toISOString().split('T')[0]
      };

      const { data: createdStudent, error: studentError } = await supabase
        .from('students')
        .insert(studentInsert)
        .select('id')
        .single();

      if (studentError || !createdStudent) {
        const message = studentError?.message || 'Failed to create student.';
        setError(message);
        throw new Error(message);
      }

      const enrollmentInsert = {
        student_id: createdStudent.id,
        driving_category: student.drivingCategory || null,
        subclass_code: student.subclassCode || null,
        driving_class: student.drivingClass || null,
        course_name: student.courseName,
        schedule: student.schedule || null,
        source: student.source || null,
        sales_person: student.salesPerson || null,
        course_fee: student.courseFee,
        registration_fee: student.registrationFee,
        total_fee: student.totalFee,
        amount_paid: student.amountPaid,
        balance: Math.max(student.totalFee - student.amountPaid, 0),
        terms_accepted: student.termsAccepted,
        privacy_accepted: student.privacyAccepted,
        enrolled_at: new Date().toISOString()
      };

      const { data: createdEnrollment, error: enrollmentError } = await supabase
        .from('student_course_enrollments')
        .insert(enrollmentInsert)
        .select('id')
        .single();

      if (enrollmentError) {
        setError(enrollmentError.message);
        throw new Error(enrollmentError.message);
      }

      const contactsToInsert = [
        {
          student_id: createdStudent.id,
          contact_type: 'next_of_kin' as ContactType,
          name: student.kinName || null,
          relationship: student.kinRelationship || null,
          phone: student.kinPhone || null,
          email: student.kinEmail || null,
          city: student.kinCity || null,
          is_self_sponsored: null
        },
        {
          student_id: createdStudent.id,
          contact_type: 'sponsor' as ContactType,
          name: student.sponsorName || null,
          relationship: student.sponsorRelationship || null,
          phone: student.sponsorPhone || null,
          email: student.sponsorEmail || null,
          city: student.sponsorCity || null,
          is_self_sponsored: student.isSelfSponsored === 'yes'
        }
      ].filter((contact) =>
        contact.name ||
        contact.relationship ||
        contact.phone ||
        contact.email ||
        contact.city ||
        contact.is_self_sponsored !== null
      );

      if (contactsToInsert.length > 0) {
        const { error: contactsError } = await supabase
          .from('student_contacts')
          .insert(contactsToInsert);

        if (contactsError) {
          setError(contactsError.message);
          throw new Error(contactsError.message);
        }
      }

      if (student.amountPaid > 0) {
        const paymentInsert = {
          student_id: createdStudent.id,
          enrollment_id: createdEnrollment?.id || null,
          amount: student.amountPaid,
          payment_type: 'registration',
          payment_date: new Date().toISOString(),
          recorded_by: null
        };

        const { error: paymentError } = await supabase
          .from('payments')
          .insert(paymentInsert);

        if (paymentError) {
          setError(paymentError.message);
          throw new Error(paymentError.message);
        }
      }

      const created: Student = {
        id: registrationNumber,
        studentId: createdStudent.id,
        enrollmentId: createdEnrollment?.id,
        name: student.studentName,
        idNumber: student.idNumber,
        email: student.email,
        phone: student.phone,
        course: student.courseName,
        feesPaid: student.amountPaid,
        totalFees: student.totalFee,
        pendingDays: student.pendingDays ?? 30,
        eligibleForExams:
          student.eligibleForExams ?? student.amountPaid >= student.totalFee,
        status: student.status || 'Active',
        enrollmentDate:
          student.enrollmentDate || new Date().toISOString().split('T')[0],
        documents: {}
      };

      setStudents((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const updateStudent = useCallback(
    async (registrationNumber: string, data: Partial<Student>) => {
      const existingStudent = students.find((student) => student.id === registrationNumber);

      if (!existingStudent) {
        return;
      }

      setError('');

      const studentUpdates: Record<string, unknown> = {};
      if (data.name !== undefined) studentUpdates.student_name = data.name;
      if (data.idNumber !== undefined) studentUpdates.id_number = data.idNumber;
      if (data.email !== undefined) studentUpdates.email = data.email;
      if (data.phone !== undefined) studentUpdates.phone = data.phone;
      if (data.pendingDays !== undefined) studentUpdates.pending_days = data.pendingDays;
      if (data.eligibleForExams !== undefined) {
        studentUpdates.eligible_for_exams = data.eligibleForExams;
      }
      if (data.status !== undefined) studentUpdates.status = data.status;

      if (Object.keys(studentUpdates).length > 0) {
        const { error: studentError } = await supabase
          .from('students')
          .update(studentUpdates)
          .eq('id', existingStudent.studentId);

        if (studentError) {
          setError(studentError.message);
          throw new Error(studentError.message);
        }
      }

      const enrollmentUpdates: Record<string, unknown> = {};
      if (data.course !== undefined) enrollmentUpdates.course_name = data.course;
      if (data.totalFees !== undefined) enrollmentUpdates.total_fee = data.totalFees;
      if (data.feesPaid !== undefined) enrollmentUpdates.amount_paid = data.feesPaid;

      const resolvedTotalFees =
        data.totalFees !== undefined ? data.totalFees : existingStudent.totalFees;
      const resolvedFeesPaid =
        data.feesPaid !== undefined ? data.feesPaid : existingStudent.feesPaid;

      if (
        data.totalFees !== undefined ||
        data.feesPaid !== undefined
      ) {
        enrollmentUpdates.balance = Math.max(resolvedTotalFees - resolvedFeesPaid, 0);
      }

      if (Object.keys(enrollmentUpdates).length > 0 && existingStudent.enrollmentId) {
        const { error: enrollmentError } = await supabase
          .from('student_course_enrollments')
          .update(enrollmentUpdates)
          .eq('id', existingStudent.enrollmentId);

        if (enrollmentError) {
          setError(enrollmentError.message);
          throw new Error(enrollmentError.message);
        }
      }

      if (
        data.feesPaid !== undefined &&
        data.feesPaid > existingStudent.feesPaid
      ) {
        const paymentAmount = data.feesPaid - existingStudent.feesPaid;
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            student_id: existingStudent.studentId,
            enrollment_id: existingStudent.enrollmentId || null,
            amount: paymentAmount,
            payment_type: 'tuition',
            payment_date: new Date().toISOString(),
            recorded_by: null
          });

        if (paymentError) {
          setError(paymentError.message);
          throw new Error(paymentError.message);
        }
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === registrationNumber
            ? {
                ...student,
                ...data,
                studentId: student.studentId,
                enrollmentId: student.enrollmentId
              }
            : student
        )
      );
    },
    [students]
  );

  const deleteStudent = useCallback(
    async (registrationNumber: string) => {
      const existingStudent = students.find((student) => student.id === registrationNumber);

      if (!existingStudent) {
        return;
      }

      setError('');

      const { error: deleteError } = await supabase
        .from('students')
        .delete()
        .eq('id', existingStudent.studentId);

      if (deleteError) {
        setError(deleteError.message);
        throw new Error(deleteError.message);
      }

      setStudents((prev) => prev.filter((student) => student.id !== registrationNumber));
    },
    [students]
  );

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        refreshStudents,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }

  return context;
}
