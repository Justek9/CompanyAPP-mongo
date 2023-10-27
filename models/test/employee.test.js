const Employee = require('../employees.model')
const expect = require('chai').expect
const mongoose = require('mongoose')

describe('Employee', () => {
	it('should throw an error if no firstName', async () => {
		const emp = new Employee({}) // create new Employee, but don't set any attr value
		let error
		try {
			await emp.validate({})
		} catch (err) {
			error = err
		}

		expect(error).to.exist
	})
	it('should throw an error if "firstName" is not a string', () => {
		const cases = [{}, []]
		for (let name of cases) {
			const emp = new Employee({ name })

			const err = emp.validateSync()
			expect(err.errors.firstName).to.exist
		}
	})

	it('should not throw an error if "firstName", "lastName" and "department" is okay', () => {
		const cases = [
			{ firstName: 'John', lastName: 'Doe', department: 'Sales' },
			{ firstName: 'Josh', lastName: 'Gilbert', department: 'HR' },
		]
		for (let name of cases) {
			const emp = new Employee(name)

			emp.validateSync(err => {
				expect(err).to.not.exist
			})
		}
	})
})
