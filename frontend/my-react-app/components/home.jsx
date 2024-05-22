import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/custom.css'; // Importer le fichier CSS personnalisé


const Home = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to BookBuddy!</h1>
                <p className="lead">Your ultimate companion for managing and tracking your reading journey.</p>
                <hr className="my-4" />
                <p>Discover new books, keep track of your favorites, and connect with other readers.</p>
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </div>
        </div>
    );
}

export default Home;
