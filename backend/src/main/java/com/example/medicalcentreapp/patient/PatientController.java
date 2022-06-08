package com.example.medicalcentreapp.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/patients/{id}")
    public Patient getPatientById(@PathVariable String id) {
        return patientService.getPatientById(id);
    }

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @PostMapping("/patients")
    public Patient addPatient(@RequestBody Patient patient) {
        patientService.addPatient(patient);
        return patient;
    }
}