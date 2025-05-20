const Doctor = require('../models/doctor');

const createDoctor = async (req, res) => {
  console.log('REQ BODY:', req.body);
  try {
    const { name, specialization, availableTimes, code } = req.body;
    const newDoctor = new Doctor({
      name,
      specialization,
      availableTimes,
      code
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err);
  res.status(500).json({ message: 'Gagal menyimpan data dokter' });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat data dokter' });
  }
};

module.exports = { getDoctors, createDoctor };