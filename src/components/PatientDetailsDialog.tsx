import { User, Phone, Mail, MapPin, Briefcase, Globe, Heart, Droplet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodType: string;
  maritalStatus: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  language: string;
  photo?: string;
}

interface PatientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: PatientData | null;
}

export function PatientDetailsDialog({
  open,
  onOpenChange,
  patient,
}: PatientDetailsDialogProps) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Patient Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {patient.photo ? (
                  <img 
                    src={patient.photo} 
                    alt={patient.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-primary" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">Patient ID: {patient.id}</p>
              <p className="text-sm text-muted-foreground">
                Date of Birth: {patient.dateOfBirth} ({patient.age} years old)
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{patient.gender}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Droplet className="h-3 w-3" />
                  {patient.bloodType}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {patient.maritalStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{patient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Additional Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Occupation: {patient.occupation}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Language: {patient.language}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}