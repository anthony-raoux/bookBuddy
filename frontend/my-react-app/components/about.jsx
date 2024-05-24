import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/custom.css'; // Importer le fichier CSS personnalisé

const About = () => {
    return (
        <div className="container mt-5 jumbotron">
            <h1>Notre site</h1>
            <p>
                Bienvenue sur la page À propos de BookBuddy, votre gestionnaire de livres de confiance.
                BookBuddy est conçu pour aider les amateurs de livres à organiser, suivre et explorer leur collection de livres de manière efficace.
            </p>
            <h2>En savoir plus sur BookBuddy</h2>
            <p>
                Avec BookBuddy, vous pouvez facilement ajouter des livres à votre collection en scannant le code-barres,
                en saisissant les informations manuellement ou en les important depuis des fichiers. L'application vous
                permet également de suivre vos progrès de lecture, de créer des listes de souhaits et de noter vos lectures.
            </p>
            <p>
                Les fonctionnalités clés de BookBuddy incluent :
                <ul>
                    <li>Une interface utilisateur intuitive et conviviale</li>
                    <li>La possibilité de classer vos livres par genre, auteur, ou état de lecture</li>
                    <li>Des recommandations personnalisées basées sur vos préférences de lecture</li>
                    <li>Des statistiques détaillées sur vos habitudes de lecture</li>
                </ul>
            </p>
            <p>
                Que vous soyez un lecteur occasionnel ou un passionné de lecture, BookBuddy est l'outil parfait pour
                gérer votre bibliothèque personnelle et découvrir de nouveaux livres passionnants.
            </p>
        </div>
    );
}

export default About;
