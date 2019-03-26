import express from 'express'
import { createContact, updateContact, deleteContact } from '../controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('It works!')
})

router.post('/contact', createContact)
router.put('/contact/:phoneNumber', updateContact)
router.delete('/contact/:phoneNumber', deleteContact)
export default router
