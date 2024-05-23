import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('à lire');
  const [totalPages, setTotalPages] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('664c6eee5f0924f596f9b466'); // Exemple d'userId fixe

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, imageUrl, status, totalPages, category, userId };

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du livre');
      }

      // Réinitialiser les champs après l'ajout
      setTitle('');
      setAuthor('');
      setImageUrl('');
      setStatus('à lire');
      setTotalPages('');
      setCategory('');

      alert('Le livre a été ajouté avec succès !');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de l\'ajout du livre.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ajouter un livre</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Auteur:</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image (URL):</label>
          <input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">État:</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="fini">Fini</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre de pages:</label>
          <input type="number" className="form-control" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie:</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter le livre</button>
      </form>
    </div>
  );
};

export default AddBookForm;
