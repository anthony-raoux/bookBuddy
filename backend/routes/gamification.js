// routes/gamification.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour gérer la gamification
router.post('/reword/:parametre', async (req, res) => {
  try {
    const { userId } = req.body;
    const { parametre } = req.params;

    // Appeler la fonction correspondante selon le paramètre
    switch (parametre) {
      case 'addBook':
        await userController.assignBibliophileBadge(userId);
        break;
      case 'addFavoriteBook':
        await userController.assignStarsBadge(userId);
        break;
      case 'visitProfile':
        await userController.assignExplorerBadge(userId);
        break;
      default:
        return res.status(400).json({ message: 'Paramètre non reconnu' });
    }

    res.status(200).json({ message: `Badge attribué pour l'action ${parametre}` });
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de l'attribution du badge: ${error.message}` });
  }
});

module.exports = router;
