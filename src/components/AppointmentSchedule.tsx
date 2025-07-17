import { useState } from "react";
import { Calendar, Clock, User, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RescheduleDialog } from "./RescheduleDialog";
import { PatientDetailsDialog } from "./PatientDetailsDialog";
import { useToast } from "@/hooks/use-toast";

// Mock patient data
const patientData = {
  1: {
    id: "P1-2024-001",
    name: "Sarah Johnson",
    dateOfBirth: "March 15, 1990",
    age: 34,
    gender: "Female",
    bloodType: "A+",
    maritalStatus: "Married",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main Street, Springfield, IL 62701",
    occupation: "Software Engineer",
    language: "English",
    photo: "/lovable-uploads/2db79cf2-3939-4304-bd84-0816905d0314.png"
  },
  2: {
    id: "P2-2024-002",
    name: "Michael Chen",
    dateOfBirth: "July 22, 1985",
    age: 39,
    gender: "Male",
    bloodType: "B+",
    maritalStatus: "Single",
    phone: "(555) 234-5678",
    email: "michael.chen@email.com",
    address: "456 Oak Avenue, Springfield, IL 62702",
    occupation: "Data Analyst",
    language: "English"
  },
  3: {
    id: "P3-2024-003",
    name: "Jennifer Wilson",
    dateOfBirth: "December 3, 1992",
    age: 31,
    gender: "Female",
    bloodType: "O-",
    maritalStatus: "Married",
    phone: "(555) 345-6789",
    email: "jennifer.wilson@email.com",
    address: "789 Pine Street, Springfield, IL 62703",
    occupation: "Teacher",
    language: "English"
  },
  4: {
    id: "P4-2024-004",
    name: "Robert Davis",
    dateOfBirth: "May 18, 1978",
    age: 46,
    gender: "Male",
    bloodType: "AB+",
    maritalStatus: "Divorced",
    phone: "(555) 456-7890",
    email: "robert.davis@email.com",
    address: "321 Elm Drive, Springfield, IL 62704",
    occupation: "Construction Manager",
    language: "English"
  },
  5: {
    id: "P5-2024-005",
    name: "Emily Rodriguez",
    dateOfBirth: "September 12, 1988",
    age: 36,
    gender: "Female",
    bloodType: "A-",
    maritalStatus: "Married",
    phone: "(555) 567-8901",
    email: "emily.rodriguez@email.com",
    address: "654 Maple Lane, Springfield, IL 62705",
    occupation: "Nurse",
    language: "English"
  },
  6: {
    id: "P6-2024-006",
    name: "David Thompson",
    dateOfBirth: "February 8, 1970",
    age: 54,
    gender: "Male",
    bloodType: "O+",
    maritalStatus: "Married",
    phone: "(555) 678-9012",
    email: "david.thompson@email.com",
    address: "987 Cedar Road, Springfield, IL 62706",
    occupation: "Accountant",
    language: "English"
  },
  7: {
    id: "P7-2024-007",
    name: "Maria Garcia",
    dateOfBirth: "November 25, 1995",
    age: 28,
    gender: "Female",
    bloodType: "B-",
    maritalStatus: "Single",
    phone: "(555) 789-0123",
    email: "maria.garcia@email.com",
    address: "147 Birch Circle, Springfield, IL 62707",
    occupation: "Marketing Coordinator",
    language: "Spanish"
  }
};

// Mock appointment data with priority
const upcomingAppointments = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "Today",
    time: "09:00 AM",
    duration: 30,
    type: "Consultation",
    mode: "In-person",
    status: "Pending",
    reason: "Hypertension follow-up",
    priority: "High"
  },
  {
    id: 2,
    patientName: "Michael Chen",
    date: "Today", 
    time: "10:30 AM",
    duration: 45,
    type: "Check-up",
    mode: "Video Call",
    status: "Accepted",
    reason: "Diabetes management",
    priority: "Medium"
  },
  {
    id: 3,
    patientName: "Jennifer Wilson",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: 30,
    type: "Consultation",
    mode: "Video Call",
    status: "Pending",
    reason: "General checkup",
    priority: "Low"
  },
  {
    id: 4,
    patientName: "Robert Davis",
    date: "Jan 25",
    time: "11:30 AM",
    duration: 60,
    type: "Surgery Consultation",
    mode: "In-person",
    status: "Pending",
    reason: "Knee surgery consultation",
    priority: "High"
  }
];

const appointmentHistory = [
  {
    id: 5,
    patientName: "Emily Rodriguez",
    date: "Jan 15",
    time: "02:00 PM",
    duration: 60,
    type: "Therapy",
    mode: "In-person",
    status: "Completed",
    reason: "Anxiety counseling",
    priority: "Medium"
  },
  {
    id: 6,
    patientName: "David Thompson",
    date: "Jan 14",
    time: "03:30 PM",
    duration: 30,
    type: "Follow-up",
    mode: "In-person", 
    status: "Completed",
    reason: "Arthritis treatment review",
    priority: "Low"
  },
  {
    id: 7,
    patientName: "Maria Garcia",
    date: "Jan 12",
    time: "01:00 PM",
    duration: 45,
    type: "Consultation",
    mode: "Video Call",
    status: "Completed",
    reason: "Blood pressure monitoring",
    priority: "Medium"
  }
];

export function AppointmentSchedule() {
  const [appointments, setAppointments] = useState(upcomingAppointments);
  const [rescheduleDialog, setRescheduleDialog] = useState({
    open: false,
    appointmentId: null as number | null,
    currentDate: "",
    currentTime: ""
  });
  const [patientDialog, setPatientDialog] = useState({
    open: false,
    patientId: null as number | null
  });
  const { toast } = useToast();

  const handleAcceptAppointment = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "Accepted" }
          : apt
      )
    );
    toast({
      title: "Appointment Accepted",
      description: "The appointment has been successfully accepted.",
    });
  };

  const handleReschedule = (appointmentId: number, currentDate: string, currentTime: string) => {
    setRescheduleDialog({
      open: true,
      appointmentId,
      currentDate,
      currentTime
    });
  };

  const handleRescheduleConfirm = (newDate: string, newTime: string) => {
    if (rescheduleDialog.appointmentId) {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === rescheduleDialog.appointmentId 
            ? { ...apt, date: newDate, time: newTime }
            : apt
        )
      );
      toast({
        title: "Appointment Rescheduled",
        description: `Appointment has been rescheduled to ${newDate} at ${newTime}.`,
      });
    }
  };

  const handleViewPatientDetails = (appointmentId: number) => {
    setPatientDialog({
      open: true,
      patientId: appointmentId
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "default";
      case "Pending": return "outline";
      case "Completed": return "secondary";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High": return "❤️";
      case "Medium": return "⚡";
      case "Low": return "🔽";
      default: return "⚪";
    }
  };

  const pendingAppointments = appointments.filter(apt => apt.status === "Pending").length;
  const acceptedAppointments = appointments.filter(apt => apt.status === "Accepted").length;
  const completedAppointments = appointmentHistory.length;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-background to-accent/10">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
          <Clock className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Medical Appointments</h2>
        <p className="text-muted-foreground mt-2">Manage your appointments and prescriptions with our advanced healthcare management system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{appointments.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming Appointments</div>
          </div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4 flex items-center gap-3">
          <User className="h-8 w-8 text-yellow-600" />
          <div>
            <div className="text-2xl font-bold text-foreground">{pendingAppointments}</div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
          </div>
        </div>
        <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 flex items-center gap-3">
          <div className="h-8 w-8 text-green-600 flex items-center justify-center">
            <div className="w-6 h-6 bg-green-600 rounded" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}></div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{completedAppointments}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="history">Appointment History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">Upcoming Appointments</span>
            <Badge variant="outline">
              {appointments.length} appointments
            </Badge>
          </div>

          <div className="rounded-lg border shadow-card bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-primary/5">
                  <TableHead className="font-semibold">Patient</TableHead>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Reason</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-accent/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{appointment.patientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{appointment.date} at {appointment.time}</div>
                          <div className="text-sm text-muted-foreground">{appointment.duration} min</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground text-sm font-medium">
                        {appointment.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{appointment.reason}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={getPriorityColor(appointment.priority)}>
                          {getPriorityIcon(appointment.priority)}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(appointment.status)} className="shadow-sm">
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {appointment.status === "Pending" && (
                          <Button 
                            variant="medical" 
                            size="sm"
                            onClick={() => handleAcceptAppointment(appointment.id)}
                          >
                            Accept
                          </Button>
                        )}
                        
                        <Button 
                          variant={appointment.status === "Accepted" ? "default" : "outline"} 
                          size="sm"
                          disabled={appointment.status !== "Accepted"}
                        >
                          <Pill className="h-3 w-3 mr-1" />
                          Prescription
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={appointment.status === "Accepted"}
                          onClick={() => handleReschedule(appointment.id, appointment.date, appointment.time)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">Appointment History</span>
            <Badge variant="outline">
              {appointmentHistory.length} completed
            </Badge>
          </div>

          <div className="rounded-lg border shadow-card bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-primary/5">
                  <TableHead className="font-semibold">Patient</TableHead>
                  <TableHead className="font-semibold">Date & Time</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Reason</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentHistory.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-accent/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
                          <User className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <span className="font-medium text-foreground">{appointment.patientName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{appointment.date} at {appointment.time}</div>
                          <div className="text-sm text-muted-foreground">{appointment.duration} min</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium">
                        {appointment.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{appointment.reason}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={getPriorityColor(appointment.priority)}>
                          {getPriorityIcon(appointment.priority)}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(appointment.status)} className="shadow-sm">
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewPatientDetails(appointment.id)}
                        >
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pill className="h-3 w-3 mr-1" />
                          View Prescription
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <RescheduleDialog
        open={rescheduleDialog.open}
        onOpenChange={(open) => setRescheduleDialog(prev => ({ ...prev, open }))}
        currentDate={rescheduleDialog.currentDate}
        currentTime={rescheduleDialog.currentTime}
        onReschedule={handleRescheduleConfirm}
      />

      <PatientDetailsDialog
        open={patientDialog.open}
        onOpenChange={(open) => setPatientDialog(prev => ({ ...prev, open }))}
        patient={patientDialog.patientId ? patientData[patientDialog.patientId] || null : null}
      />
    </div>
  );
}