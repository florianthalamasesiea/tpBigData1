# TP Big Data

## Description

Ce projet a été développé dans le cadre d'un TP sur le traitement de grandes données (Big Data) avec Node.js et MongoDB. 
Il implémente du multithreading à grâcé à des "workers" pour optimiser le traitement de fichiers CSV venant d'une base de données SIRENE des entreprise françaises.

## Fonctionnalités

- **Lecture de fichiers CSV**: Extraction de données à partir de fichiers stockés localement.
- **Traitement parallèle**: Utilisation de threads pour accélérer le traitement des données.
- **Stockage des données**: Insertion des données traitées dans une base de données MongoDB.

## Technologies Utilisées

- Node.js
- MongoDB
- Mongoose
- PM2

## Prérequis

- Node.js
- MongoDB

## Installation

- git clone https://github.com/florianthalamasesiea/tpBigData1.git
- cd tpBigData1
- npm install

## Lancer le projet
- node .
- node index.js
- pm2 start index.js

## Lancer le parseur csv
- node csvparser.js
- pm2 start csvparser.js
