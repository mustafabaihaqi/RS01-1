const Queue = require('../models/queue');

let queueCounter = 1;

(async () => {
    try {
        const lastQueue = await Queue.findOne().sort({ queueNumber: -1 });
        if (lastQueue) {
            // Ambil angka dari queueNumber (misal A003 → 3)
            const lastNumber = parseInt(lastQueue.queueNumber.substring(1), 10);
            queueCounter = lastNumber + 1;
        }
    } catch (err) {
        console.error('Gagal inisialisasi queueCounter:', err);
    }
})();

const generateQueueNumber = () => {
    return 'A' + queueCounter.toString().padStart(3, '0');
};

const createQueue = async (req, res) => {
    const { patientName, doctor, time } = req.body;

    if (!patientName || patientName.trim() === '') {
        return res.status(400).json({ error: 'Nama pasien wajib diisi' });
    }

    try {
        const queueNumber = generateQueueNumber();
        const newEntry = new Queue({ patientName, doctor, time, queueNumber });
        await newEntry.save();

        queueCounter++; 

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('CREATE QUEUE ERROR:', error); 
        res.status(500).json({ error: 'Gagal membuat antrean', detail: error.message }); 
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
