const patient = require("../models/patient")

export async function getPatientList(page = 1, perPage = 10) {
  // Extract page and perPage from request parameters (assuming query string)

  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * perPage;

    // Get total number of documents (optional for pagination metadata)
    const totalDocuments = await patient.countDocuments();

    // Find patients with limit and skip
    const patients = await patient.find({}, null, { skip, limit: perPage });

    // Respond with patients and total documents (if applicable)
    return { patients, totalDocuments }; // Or adjust response structure as needed
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPatient(data){
    try {
        const createData = await patient.create(data)

        return createData._id;
    }
    catch(error){
        console.error(error);
        return null;
    }
}