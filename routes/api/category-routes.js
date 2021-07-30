const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    const categories = categoryData.map(cat => cat.toJSON());
    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!categoryById) {
      res.status(404).json({ message: "No category with that ID!" });
    }
    res.status(200).json(categoryById.toJSON())
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    if(!req.body.category_name) {
      res.status(400).json({ message: "Missing a category name!" });
      return;
    }
    await Category.create(req.body);
    res.status(200).json({ message: `Created new category: ${req.body.category_name}`});
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const toUpdate = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if(!toUpdate) {
      res.status(404).json({ message: "No category with that ID!" });
    }
    res.status(200).json(toUpdate);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catToDelete = await Category.destroy({
      where: { id: req.params.id}
    });
    if(!catToDelete) {
      res.status(404).json({ message: "No category with that ID!" });
    }
    res.status(200).json(catToDelete);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
