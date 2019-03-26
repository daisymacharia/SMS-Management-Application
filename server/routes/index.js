import express from 'express'
import {
  createContact,
  updateContact,
  deleteContact,
  createMessage,
  deleteMessage,
  getSingleMessage,
  getAllSentMessages,
  getAllReceivedtMessages,
} from '../controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Welcome')
})

router.post('/contact', createContact)
router.put('/contact/:phoneNumber', updateContact)
router.delete('/contact/:phoneNumber', deleteContact)
router.post('/message', createMessage)
router.delete('/message/:id', deleteMessage)
router.get('/message/:id', getSingleMessage)
router.get('/message/sent/:phoneNumber', getAllSentMessages)
router.get('/message/received/:phoneNumber', getAllReceivedtMessages)

export default router
