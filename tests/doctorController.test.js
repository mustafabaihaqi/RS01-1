const { createDoctor, getDoctors } = require('../backend/controllers/doctorController');
const Doctor = require('../backend/models/doctor');

jest.mock('../backend/models/doctor');

describe('Doctor Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: 'dr. Siti',
        specialization: 'Umum',
        availableTimes: '08:00 - 10:00',
        code: 'B',
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Doctor.prototype.save = jest.fn();
  });

  describe('createDoctor', () => {
    it('should create a new doctor successfully', async () => {
      const mockDoctor = { ...req.body, _id: 'abc123' };
      Doctor.prototype.save.mockResolvedValue(mockDoctor);

      await createDoctor(req, res);

      expect(Doctor).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDoctor);
    });

    it('should handle error during doctor creation', async () => {
      Doctor.prototype.save.mockRejectedValue(new Error('Save failed'));

      await createDoctor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Gagal menyimpan data dokter' });
    });
  });

  describe('getDoctors', () => {
    it('should return list of doctors', async () => {
      const mockDoctors = [
        { name: 'dr. A', specialization: 'Umum' },
        { name: 'dr. B', specialization: 'Gigi' },
      ];
      Doctor.find.mockResolvedValue(mockDoctors);

      await getDoctors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDoctors);
    });

    it('should handle error when fetching doctors', async () => {
      Doctor.find.mockRejectedValue(new Error('DB Error'));

      await getDoctors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Gagal memuat data dokter' });
    });
  });
});
