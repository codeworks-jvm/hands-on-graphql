# hands-on-graphql

# Introduction
Cette mise en pratique a pour objectif de présenter une autre alternative de création des API sans REST. 
Elle commence par une partie théorique tout en faisant un petit rappel sur les API et ses limites avant d'aborder quelques notions théoriques sur GraphQL à fin d'avoir une petite idée sur son contexte d'utilisation et ses avantages.  
Après cette paranthèse théorique, place à la pratique de mise en palce en SPRING, NodeJS, et Quarkus.


# GraphQL une alternative aux API REST
Si aujourd'hui REST(Representational State Transfer) est le format standard des API le plus utilisé, une nouvelle approche existe desormais : il s'agit de GraphQL, un nouveau format qui est venu remédier à certaines limites de REST

## Petit rappel sur les API REST
REST est orientée ressource et reste toujours une valeur sûre pour la création d'API grâce à sa simplicité en termes de manipulation des données. Elle respecte certaines règles comme: l'interface uniforme (verbes HTTP), l'adressage via les URL, le sans état et la connectivité.

Chaque entité exposée en REST est une ressource qui peut être demandée avec des verbes HTTP via un EndPoint en suivant le format suivant:

`METHOD /api/:resource:/:id:`

**Exemple:**

| URL           | Methodes      | Actions  |
| ------------- |:-------------:| -----:|
| /users        | GET           | Récupere les users |
| /users/1      | GET           | Récupere le user 1 |
| /users        | POST          | Ajoute un nouveau user |
| /users/2      | PUT           | Modifie l'utilisateur 2 |
| /users/1      | DELETE        | Supprime l'utilisateur 1 |
| /users/company | GET          | Récupere toutes compagnies de tous les users |
| /company      | GET          | Récupere toutes compagnies |

Même si les API REST peuvent devenir verbeuses, elles sont bien adaptées au opérations standard CRUD(Create, Read, Update, Delete) et peuvent être intuitivement effectuées pour chaque ressource.

### Quelques limites de REST

 - Oblige le client à récupérer toutes les données même les champs qu'il n'a pas besoin (Over-fetching) dû aux réponses de données fixe gérees par le serveur qui ne peuvent pas être déterminées par le client. 
 - Oblige souvent le client à faire plusieurs appels pour avoir le résultat souhaité(under-fetching).
 - Il n'est pas fait pour gérer les rélations entre objets
 - REST c'est tout ou rien, il est statique (on obtient le résultat que le développeur a choisi de renvoyer)
 - Beaucoup d'EndPoint(point d'entrées) et des resources à exploiter peuvent vite devenir problématique dans un gros système d'information.
 

## Qu'est-ce que GraphQL?
"GraphQL est un langage de requête et de manipulation de données open-source pour les API, et un moteur d'exécution pour répondre aux requêtes avec des données existantes. GraphQL interprète les chaînes du client et renvoie les données d'une manière compréhensible, prévisible et prédéfinie. Il n'a pas vocation à remplacer les API REST mais simplement une alternative à ces API."

[Plus de détails sur la spécification complète de GraphQL](https://graphql.org/)

GraphQL n'est pas un langage de programmation ni un framework, c'est une spécification pour implémenter votre API. Permet de centraliser toutes les requêtes dans un seul endPoint et utilise uniquement ***deux opérations (query et munation)*** pour lire ou modifier les données.

 `GET /api?query={ users(id:"1") { firstName, age } }` 
 
 `POST /api?mutation={ createUser(id: "2", firstName: "Nourdine") { firstName } }`

## Pourquoi GraphQL?
Contrairement aux API REST, les API GraphQL offrent certains avantages : 

 - Eviter l'over-fetching ou l'under-fetching des données
   Les clients peuvent récupérer plusieurs types de données dans une seule demande ou peuvent limiter les données de réponse en fonction de critères spécifiques. 
   
 - Permettre aux modèles de données d'évoluer, l'ajout de champs et de fonctionnalités supplémentaires à l'API existante ne nécissite pas de modifications radicales pour les clients existants parce que les API GraphQL renvoie les données démandées pa le client. Cela peut être fait sans avoir besoin d'une nouvelle version de l'application.
 
 - Permet de définir un mode d'accès aux données et avoir un contrat clair entre le client et le serveur via un schema. Ce qui permet aux équipes de développement des deux côtés de travailler sans autre communication.
 
 - Permet aux utilisateurs de découvrir les API et d'affiner les requêtes côté client grâce l'introspection de schéma native via des outils graphiques tels que GraphiQL qui permet une découverte facile et fluide des API.
 
- Côté client, le langage de requête apporte flexibilité et efficacité permettant aux développeurs de s'adapter aux contraintes de leurs environnements techniques tout en réduisant les allers-retours serveur.

**NB: L'un des principaux inconvénients de GraphQL est la gestion du cache. Comme les requêtes sont spécifiques, il est difficile de mutualiser le cache et de servir la même réponse.**