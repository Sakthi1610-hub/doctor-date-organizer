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

// Mock appointment data
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
    reason: "Hypertension follow-up"
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
    reason: "Diabetes management"
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
    reason: "General checkup"
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
    reason: "Knee surgery consultation"
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
    reason: "Anxiety counseling"
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
    reason: "Arthritis treatment review"
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
    reason: "Blood pressure monitoring"
  }
];

export function AppointmentSchedule() {
  const [appointments, setAppointments] = useState(upcomingAppointments);

  const handleAcceptAppointment = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "Accepted" }
          : apt
      )
    );
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

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-background to-accent/10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">Medical Appointments</h2>
        <p className="text-muted-foreground mt-2">Manage your appointments and prescriptions efficiently</p>
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
                        
                        <Button variant="outline" size="sm">
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
                      <Badge variant={getStatusColor(appointment.status)} className="shadow-sm">
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
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
    </div>
  );
}