const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
 Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.status(500).json({ error: "Failed to fetch comments" }));
});

// Add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        /**
         * Deletes a comment by its ID and returns the deleted comment document.
         *
         * @type {Promise<Comment|null>}
         * @returns {Promise<Comment|null>} The deleted comment document if found, otherwise null.
         */
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});
