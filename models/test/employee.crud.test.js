const Employee = require('../employees.model')
const expect = require('chai').expect
const mongoose = require('mongoose')

describe('Employee', () => {
	before(async () => {
		try {
			await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
		} catch (err) {
			console.error(err)
		}
	})

	describe('Reading data', () => {
		before(async () => {
			const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Sales' })
			await emp1.save()

			const emp2 = new Employee({ firstName: 'Josh', lastName: 'Gilbert', department: 'HR' })
			await emp2.save()
		})

		it('should return all the data with "find" method', async () => {
			const employees = await Employee.find()
			const expectedLength = 2
			expect(employees.length).to.be.equal(expectedLength)
		})

		it('should return proper document by various params with findOne method', async () => {
			const employee = await Employee.findOne({ firstName: 'John' })
			const expectedName = 'John'
			expect(employee.firstName).to.be.equal(expectedName)
		})

		after(async () => {
			await Employee.deleteMany()
		})
	})

	describe('Creating data', () => {
		it('should insert new document with "insertOne" method', async () => {
			const employee = new Employee({ firstName: 'Josh', lastName: 'Gilbert', department: 'HR' })
			await employee.save()
			expect(employee.isNew).to.be.false
		})
		after(async () => {
			await Employee.deleteMany()
		})
	})
	describe('Updating data', () => {
		beforeEach(async () => {
			const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Sales' })
			await emp1.save()

			const emp2 = new Employee({ firstName: 'Josh', lastName: 'Gilbert', department: 'HR' })
			await emp2.save()
		})
		afterEach(async () => {
			await Employee.deleteMany()
		})

		it('should properly update one document with "updateOne" method', async () => {
			await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Amanda' } })
			const updatedEmployee = await Employee.findOne({ firstName: 'Amanda' })
			expect(updatedEmployee).to.not.be.null
		})

		it('should properly update one document with "save" method', async () => {
			const employee = await Employee.findOne({ firstName: 'Josh' })
			employee.firstName = 'Tom'
			await employee.save()

			const updatedEmployee = await Employee.findOne({ firstName: 'Tom' })
			expect(updatedEmployee).to.not.be.null
		})

		it('should properly update multiple documents with "updateMany" method', async () => {
			await Employee.updateMany({}, { $set: { firstName: 'Updated!' } })
			const employees = await Employee.find({ firstName: 'Updated!' })
			expect(employees.length).to.be.equal(2)
		})
	})
	describe('Removing data', () => {
		beforeEach(async () => {
			const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Sales' })
			await emp1.save()

			const emp2 = new Employee({ firstName: 'Josh', lastName: 'Gilbert', department: 'HR' })
			await emp2.save()
		})

		afterEach(async () => {
			await Employee.deleteMany()
		})

		it('should properly remove one document with "deleteOne" method', async () => {
			await Employee.deleteOne({ firstName: 'Josh' })
			const removeEmployee = await Employee.findOne({ firstName: 'Josh' })
			expect(removeEmployee).to.be.null
		})

		it('should properly remove multiple documents with "deleteMany" method', async () => {
			await Employee.deleteMany({})
			const employees = await Employee.find()
			expect(employees.length).to.be.equal(0)
		})
	})
})
