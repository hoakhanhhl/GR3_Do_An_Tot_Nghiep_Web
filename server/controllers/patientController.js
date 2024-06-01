const patient = require("../models/patient");
const { getPatientList, createPatient } = require("../services/patientServices");
const express = require('express')
const app = express()
app.post('/patient', async (req, res) => {
    try {
      const patient = req.body; // Assuming data is sent in the request body
  
      // Validate patient data (optional but recommended)
  
      const createdPatientId = await createPatient(patient);
  
      if (createdPatientId) {
        res.status(201).json({ message: 'Patient created successfully!', id: createdPatientId });
      } else {
        res.status(500).json({ message: 'Error creating patient' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/patient', async (req, res) => {
    try {
      const body = req.body; // Assuming data is sent in the request body
      const page = patient.page;
      const perPage = patient.perPage;
      // Validate patient data (optional but recommended)
  
      const {patients, totalDocuments} = await getPatientList(page, perPage)
  
      if (createdPatientId) {
        res.status(201).json({ total: totalDocuments, data: patientList });
      } else {
        res.status(500).json({ message: 'Error fetching patient' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

