const Queue = require('../models/queue');
const Doctor = require('../models/doctor')

const generateQueueNumber = async () => {
    const allQueues = await Queue.find().sort({ queueNumber: 1 });
  
    const usedNumbers = new Set(
      allQueues.map(q => parseInt(q.queueNumber.slice(1), 10))
    );
  
    for (let i = 1; i <= usedNumbers.size + 1; i++) {
      if (!usedNumbers.has(i)) {
        return 'A' + i.toString().padStart(3, '0');
      }
    }
  };

  const createQueue = async (req, res) => {
    const { patientName, doctor, time } = req.body;
  
    if (!patientName || !doctor || !time) {
      return res.status(400).json({ error: 'Data pasien, dokter, dan waktu wajib diisi' });
    }
  
    try {
      const selectedDoctor = await Doctor.findById(doctor);
      if (!selectedDoctor) return res.status(404).json({ error: 'Dokter tidak ditemukan' });
  
      const prefix = selectedDoctor.code.toUpperCase(); // e.g. 'A', 'B', etc.
  
      // Cari antrean terakhir untuk dokter ini berdasarkan prefix-nya
      const lastQueue = await Queue.findOne({ queueNumber: new RegExp(`^${prefix}`) })
        .sort({ queueNumber: -1 });
  
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
  
      res.status(201).json(newQueue);
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

const deleteQueue = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQueue = await Queue.findByIdAndDelete(id);

        if (!deletedQueue) {
            return res.status(404).json({ error: 'Antrean tidak ditemukan' });
        }

        res.status(200).json({ message: 'Antrean berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus antrean' });
    }
};

const deleteQueueByNumber = async (req, res) => {
    const { queueNumber } = req.params;

    try {
        const deletedQueue = await Queue.findOneAndDelete({ queueNumber });

        if (!deletedQueue) {
            return res.status(404).json({ error: 'Antrean dengan nomor tersebut tidak ditemukan' });
        }

        res.status(200).json({ message: 'Antrean berhasil dihapus', deletedQueue });
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus antrean' });
    }
};

module.exports = { createQueue, getQueues, deleteQueue, deleteQueueByNumber };
