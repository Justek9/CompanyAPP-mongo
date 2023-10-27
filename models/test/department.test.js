const Department = require('../department.model')
const expect = require('chai').expect
const mongoose = require('mongoose')

describe('Department', () => {
	it('should throw an error if no "name" arg', async () => {
		const dep = new Department({}) // create new Department, but don't set `name` attr value

		dep.validateSync(err => {
			expect(err.errors.name).to.exist
		})
	})

	it('should throw an error if "name" is not a string', () => {
		const cases = [{}, []]
		for (let name of cases) {
			const dep = new Department({ name })

			dep.validateSync(err => {
				expect(err.errors.name).to.exist
			})
		}
	})

	it('should throw an error if  "name" arg is longer that 20 or less than 5 characters', async () => {
		const cases = ['tererereererertestetetete', 'te', 'test', 'testtest']
		for (let name of cases) {
			const dep = new Department({ name })

			dep.validateSync(err => {
				expect(err.errors.name).to.exist
			})
		}
	})

	it('should not throw an error if  "name" arg is is ok', async () => {
		const cases = ['Testttt', 'tedted']
		for (let name of cases) {
			const dep = new Department({ name })

			let error

			try {
				await dep.validate(name)
			} catch (err) {
				error = err
			}

			expect(error).to.not.exist
		}
	})
})
