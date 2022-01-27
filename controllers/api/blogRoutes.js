const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update blog post
router.put('/:id', (req, res) => {
  
  try {
    const blogData = await Blog.update(
      {title = req.body.title},{where: {id: req.params.id}}
    );
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
    
});

module.exports = router;
