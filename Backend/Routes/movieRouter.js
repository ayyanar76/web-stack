import express from 'express'
import { Addmovies, Allmovies, deletemovie, getmovie, updatemovie } from '../Controllers.js/moviecontoll.js';
import { isverifyuser, rolebased } from '../Middleware/Auth.js';


const router = express.Router()


router.route('/allmovies').get(Allmovies).post(isverifyuser,rolebased("admin"),Addmovies)
router.route('/allmovies/:id').get(getmovie).put(updatemovie).delete(deletemovie)



export default router;