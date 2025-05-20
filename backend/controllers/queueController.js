const Queue = require('../models/queue');
const Doctor = require('../models/doctor');

const createQueue = async (req, res) => {
  const { patientName, doctor, time } = req.body;

  if (!patientName || !doctor || !time) {
    return res.status(400).json({ error: 'Data pasien dan dokter wajib diisi' });
  }

  if (patientName.length > 50) {
    return res.status(400).json({ error: 'Nama pasien tidak boleh lebih dari 50 karakter' });
  }

  try {
    const selectedDoctor = await Doctor.findById(doctor);
    if (!selectedDoctor) return res.status(404).json({ error: 'Dokter tidak ditemukan' });

    const prefix = selectedDoctor.code.toUpperCase();

    const lastQueue = await Queue.findOne({
      doctor: selectedDoctor.name,
      queueNumber: new RegExp(`^${prefix}`)
    }).sort({ queueNumber: -1 });

    let nextNumber = 1;
    if (lastQueue) {
      const lastNum = parseInt(lastQueue.queueNumber.slice(1), 10);
      nextNumber = lastNum + 1;
    }

    const queueNumber = prefix + nextNumber.toString().padStart(3, '0');

    const newQueue = new Queue({
      patientName,
      doctor: selectedDoctor.name,
      time,
      queueNumber
    });

    await newQueue.save();

    res.status(201).json(newQueue.toObject ? newQueue.toObject() : newQueue);
  } catch (err) {
    console.error('CREATE QUEUE ERROR:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat antrean' });
  }
};

const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find();
    res.status(200).json(queues);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data antrean' });
  }
};

module.exports = { createQueue, getQueues };
