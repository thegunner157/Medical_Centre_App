package com.example.Medical_Centre_App.visit;

import com.example.Medical_Centre_App.doctor.Doctor;
import com.example.Medical_Centre_App.patient.Patient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class VisitService {

    String doctorId = "bf68bcba8e464107b160aba8442314f7";

    Visit visit1 = new Visit(doctorId, "10:00", "10:15", "11-05-2020", Boolean.FALSE);
    Visit visit2 = new Visit(doctorId, "14:00", "14:30", "12-05-2020", Boolean.TRUE);
    Visit visit3 = new Visit(doctorId, "16:20", "16:30", "11-05-2020", Boolean.FALSE);
    List<Visit> bookedVisits = new ArrayList<>(Arrays.asList(visit2));
    List<Visit> unbookedVisits = new ArrayList<>(Arrays.asList(visit1, visit3));

    public Visit getVisitById(String id) {
        for (Visit visit : bookedVisits) {
            if (visit.getId().equals(id)) {
                return visit;
            }
        }
        for (Visit visit : unbookedVisits) {
            if (visit.getId().equals(id)) {
                return visit;
            }
        }
        return null;
    }

    public List<Visit> getAllBookedVisits() {
        return bookedVisits;
    }

    public List<Visit> getAllUnbookedVisits() {
        return unbookedVisits;
    }

    public void addVisit(Visit visit) {
        if(visit.getIsBooked() == Boolean.TRUE){
            bookedVisits.add(visit);
        }
        else{
            unbookedVisits.add(visit);
        }

    }

    public void removeVisit(String visitId) {
        Visit visit = getVisitById(visitId);
        if (visit.getIsBooked() == Boolean.TRUE) {
            for (int i = 0; i < bookedVisits.size(); i++) {
                if (bookedVisits.get(i).getId().equals(visitId)) {
                    this.bookedVisits.remove(i);
                }
            }
        }
        else{
            for (int i = 0; i < unbookedVisits.size(); i++) {
                if (unbookedVisits.get(i).getId().equals(visitId)) {
                    this.unbookedVisits.remove(i);
                }
            }
        }
    }

    public void bookVisit(String visitId, String patientId) {
        for (int i = 0; i < unbookedVisits.size(); i++) {
            if (unbookedVisits.get(i).getId().equals(visitId)) {
                this.unbookedVisits.get(i).setPatientId(patientId);
                this.unbookedVisits.get(i).setIsBooked(Boolean.TRUE);
                Visit visit = this.unbookedVisits.get(i);
                bookedVisits.add(visit);
                this.unbookedVisits.remove(i);
                break;
            }
        }
    }

    public void unBookVisit(String visitId) {
        for (int i = 0; i < bookedVisits.size(); i++) {
            if (bookedVisits.get(i).getId().equals(visitId)) {
                this.bookedVisits.get(i).setPatientId(null);
                this.bookedVisits.get(i).setIsBooked(Boolean.FALSE);
                Visit visit = this.bookedVisits.get(i);
                unbookedVisits.add(visit);
                this.bookedVisits.remove(i);
                break;
            }
        }
    }

}
