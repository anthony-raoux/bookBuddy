import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/custom.css'; 

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Bienvenue sur BookBuddy!</h1>
                <p className="lead">Votre compagnon ultime pour gérer et suivre votre parcours de lecture.</p>
                <hr className="my-4" />
                <p>Découvrez de nouveaux livres, gardez une trace de vos favoris et connectez-vous avec d'autres lecteurs.</p>
                <a className="btn btn-primary btn-lg" href="/about" role="button">En savoir plus</a>
            </div>
        </div>
    );
}

export default Home;
