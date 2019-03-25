import express from 'express'
import { createContact } from '../controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('It works!')
})

router.post('/contact', createContact)

export default router
