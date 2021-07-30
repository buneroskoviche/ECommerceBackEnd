const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    const tags = tagData.map(tag => tag.toJSON());
    res.status(200).json(tags)
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!tagById) {
      res.status(404).json({ message: "No tag with that ID!" });
    }
    res.status(200).json(tagById.toJSON())
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if(!req.body.tag_name) {
      res.status(400).json({ message: "Missing a tag name!" });
      return;
    }
    await Tag.create(req.body);
    res.status(200).json({ message: `Created new tag: ${req.body.tag_name}`});
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const toUpdate = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if(!toUpdate) {
      res.status(404).json({ message: "No tag with that ID!" });
    }
    res.status(200).json(toUpdate);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
