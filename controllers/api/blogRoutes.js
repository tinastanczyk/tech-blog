const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
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
router.put('/:id', withAuth, async (req, res) => {
  
  try {
    const blogData = await Blog.update(
      {title: req.body.title, content: req.body.content},{where: {id: req.params.id}}
    );
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
    
});



module.exports = router;
