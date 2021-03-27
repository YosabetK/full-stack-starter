const express= require ('express');

const router = express.Router();

const models = require('../../models');

router.get('/', async function(req, res){
    const rows = await models.Skill.findAll();
    res.json(rows);
});
router.post('/', async function (req, res){
    //build a new Skill row in memory from the form data in the body of the request
    const row = models.Skill.build(req.body);
    try{
        // wait for the database to save the new row
        await row.save();
        //if successful, return 201 status (created), and the Json data of the row
        res.status(201).json(row)
    } catch (error) {
        //if the database returned an error, print it to the console
        console.log(error);
        // snd back the UNPROCESSABLE ENTITY error code and the error message itself
        res.status(442).json(error);
    }
});
router.get('/:id', async function(req, res) {
    const skill = await models.Skill.findByPk(req.params.id);
    if (skill) {
      res.json(skill);
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  });
  
  router.patch('/:id', interceptors.requireLogin, async function(req, res) {
    const skill = await models.Skill.findByPk(req.params.id);
    if (skill) {
      try {
        await skill.update(req.body);
        res.status(HttpStatus.OK).end();  
      } catch (error) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
      }
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  })
  
  router.delete('/:id', interceptors.requireLogin, async function(req, res) {
    const skill = await models.Skill.findByPk(req.params.id);
    if (skill) {
      await skill.destroy();
      res.status(HttpStatus.OK).end();
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  });
module.exports = router;