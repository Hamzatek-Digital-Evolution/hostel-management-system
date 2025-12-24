const request = require('supertest');
const app = require('../app');
const { sequelize, Hostel, Room, Student, Payment, Allocation } = require('../models');

beforeAll(async () => {
  // ensure test database schema
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Admin allocation integration', () => {
  test('allocates a room to a paid student', async () => {
    // create test data
    const hostel = await Hostel.create({ name: 'TestHostel', gender: 'Male', totalRooms: 1 });
    const room = await Room.create({ hostelId: hostel.id, roomNumber: '101', capacity: 2, occupied: 0, status: 'AVAILABLE' });
    const student = await Student.create({ userId: 2, regNumber: 'S001', firstName: 'Test', lastName: 'Student', gender: 'Male', phoneNumber: '123', school: 'Engineering' });
    const payment = await Payment.create({ studentId: student.id, amount: 100, reference: 'TST', status: 'PAID' });

    const res = await request(app)
      .post('/api/admin/allocations/allocate')
      .send({ studentId: student.id, roomId: room.id })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.allocation).toBeDefined();

    const updatedRoom = await Room.findByPk(room.id);
    expect(updatedRoom.occupied).toBe(1);
  });

  test('rejects allocation if student has not paid', async () => {
    const hostel = await Hostel.create({ name: 'NoPayHostel', gender: 'Male', totalRooms: 1 });
    const room = await Room.create({ hostelId: hostel.id, roomNumber: '201', capacity: 2, occupied: 0, status: 'AVAILABLE' });
    const student = await Student.create({ userId: 3, regNumber: 'S002', firstName: 'No', lastName: 'Pay', gender: 'Male', phoneNumber: '456', school: 'Science' });

    const res = await request(app)
      .post('/api/admin/allocations/allocate')
      .send({ studentId: student.id, roomId: room.id })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/not paid/i);
  });

  test('admin can vacate allocation', async () => {
    const hostel = await Hostel.create({ name: 'VacateHostel', gender: 'Male', totalRooms: 1 });
    const room = await Room.create({ hostelId: hostel.id, roomNumber: '301', capacity: 2, occupied: 0, status: 'AVAILABLE' });
    const student = await Student.create({ userId: 4, regNumber: 'S003', firstName: 'To', lastName: 'Vacate', gender: 'Male', phoneNumber: '789', school: 'Arts' });
    const payment = await Payment.create({ studentId: student.id, amount: 50, reference: 'VAC', status: 'PAID' });

    // allocate first
    const allocRes = await request(app)
      .post('/api/admin/allocations/allocate')
      .send({ studentId: student.id, roomId: room.id })
      .set('Accept', 'application/json');
    expect(allocRes.statusCode).toBe(201);
    const allocationId = allocRes.body.allocation.id;

    // vacate
    const vacRes = await request(app)
      .post('/api/admin/allocations/vacate')
      .send({ allocationId })
      .set('Accept', 'application/json');

    expect(vacRes.statusCode).toBe(200);
    const updatedRoom = await Room.findByPk(room.id);
    expect(updatedRoom.occupied).toBe(0);

    const allocation = await Allocation.findByPk(allocationId);
    expect(allocation.status).toBe('VACATED');
  });
});
