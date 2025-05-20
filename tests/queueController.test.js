const { createQueue, getQueues } = require('../backend/controllers/queueController');
const Queue = require('../backend/models/queue');
const Doctor = require('../backend/models/doctor');

// MOCK MODEL: Doctor
jest.mock('../backend/models/doctor');

// MOCK MODEL: Queue (constructor dan method save)
jest.mock('../backend/models/queue', () => {
  const mockQueueConstructor = jest.fn().mockImplementation(function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue({
        ...data,
        toObject: () => data
      })
    };
  });

  // Attach static methods (like findOne, find) on the mock constructor
  mockQueueConstructor.findOne = jest.fn();
  mockQueueConstructor.find = jest.fn();

  return mockQueueConstructor;
});

describe('Queue Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        patientName: 'John Doe',
        doctor: 'doctorId123',
        time: '08:00 - 10:00',
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createQueue', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = { patientName: '', doctor: '', time: '' };

      await createQueue(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Data pasien dan dokter wajib diisi' });
    });

    it('should return 400 if patientName is longer than 50 characters', async () => {
      req.body.patientName = 'A'.repeat(51);

      await createQueue(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nama pasien tidak boleh lebih dari 50 karakter' });
    });

    it('should return 404 if doctor is not found', async () => {
      Doctor.findById.mockResolvedValue(null);

      await createQueue(req, res);

      expect(Doctor.findById).toHaveBeenCalledWith('doctorId123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Dokter tidak ditemukan' });
    });

    it('should start queue at A001 if no previous queue', async () => {
      Doctor.findById.mockResolvedValue({ name: 'dr. Andi', code: 'A' });

      Queue.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue(null)
      });

      await createQueue(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        queueNumber: 'A001',
        patientName: 'John Doe',
        doctor: 'dr. Andi',
        time: '08:00 - 10:00'
      }));
    });

    it('should create new queue with incremented number', async () => {
      Doctor.findById.mockResolvedValue({ name: 'dr. Andi', code: 'A' });

      Queue.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue({ queueNumber: 'A005' })
      });

      await createQueue(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        queueNumber: 'A006',
        patientName: 'John Doe',
        doctor: 'dr. Andi',
        time: '08:00 - 10:00'
      }));
    });

    it('should handle internal server error', async () => {
      Doctor.findById.mockRejectedValue(new Error('DB Error'));

      await createQueue(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Terjadi kesalahan saat membuat antrean' });
    });
  });

  describe('getQueues', () => {
    it('should return list of queues', async () => {
      const mockQueues = [
        { patientName: 'A', queueNumber: 'A001' },
        { patientName: 'B', queueNumber: 'A002' }
      ];

      Queue.find.mockResolvedValue(mockQueues);

      await getQueues(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockQueues);
    });

    it('should handle error when fetching queues', async () => {
      Queue.find.mockRejectedValue(new Error('DB Error'));

      await getQueues(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Gagal mengambil data antrean' });
    });
  });
});
