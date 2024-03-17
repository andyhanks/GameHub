# GameHub

GameHub is a Looking for Group (LFG) website designed to connect gamers who are looking to play together. In a world where your immediate circle of friends might not always be available, GameHub steps in to fill the gap, facilitating the process of finding and joining gaming sessions with like-minded players.

## Features

- **User Registration**: Users can sign up for an account on GameHub, providing basic information and preferences.
- **Game Selection**: Upon registration, users are prompted to choose from a list of available games they're interested in playing.
- **Lobby**: Once matched, users find themselves in a lobby where they can chat and plan out their gaming session with the host and other players.
- **User Profiles**: Users have profiles where they can manage their details and indicate their preferences.

## Installation

1. Clone the repository: `git clone https://github.com/andyhanks/GameHub.git`
2. Navigate to the project directory: `cd gamehub`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Access the website at `http://localhost:3000`
6. Install Microsoft SQL Server
7. Run the following SQL Queries: 
[Uploading SQLQueryInitial.sql…]()USE [master]

IF db_id('GameHub') IS NULL
  CREATE DATABASE [GameHub]
GO

USE [GameHub]
GO


DROP TABLE IF EXISTS [Message];
DROP TABLE IF EXISTS [UserLobby];
DROP TABLE IF EXISTS [Lobby];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [TypeName] nvarchar(50) NOT NULL,
  [Description] nvarchar(555)
);

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UserTypeId] integer NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Bio] nvarchar(555),
  [PreferredGames] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),
  [Ready] bit,
  CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
);

CREATE TABLE [Lobby] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(555),
  [CreateDateTime] datetime NOT NULL,
  [Image] nvarchar(255),
  [UsersOnline] int,
  [IsOpen] bit,
  [UserId] int,
  [Platform] nvarchar(255),
  [GameType] nvarchar(255),
  CONSTRAINT [FK_Lobby_UserProfile] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
);

CREATE TABLE [UserLobby] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [LobbyId] int NOT NULL,
  CONSTRAINT [FK_UserLobby_UserProfile] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_UserLobby_Lobby] FOREIGN KEY ([LobbyId]) REFERENCES [Lobby] ([Id]),
  CONSTRAINT [UC_UserLobby_UserId_LobbyId] UNIQUE ([UserId], [LobbyId])
);

CREATE TABLE [Message] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Content] nvarchar(1000) NOT NULL,
  [SendDate] datetime NOT NULL,
  [LobbyId] int,
  [UserId] int,
  CONSTRAINT [FK_Message_UserProfile] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Message_Lobby] FOREIGN KEY ([LobbyId]) REFERENCES [Lobby] ([Id])
);

GO



[Uploading -- Insert seed data into UserType table
INSERT INTO UserType (TypeName, Description)
VALUES ('Player', 'Regular player type'),
       ('Admin', 'Administrator user type');

-- Insert seed data into UserProfile table
INSERT INTO UserProfile (UserTypeId, DisplayName, FirstName, LastName, Email, Bio, PreferredGames, CreateDateTime, ImageLocation, Ready)
VALUES (2, 'admin_user', 'Admin', 'User', 'admin@example.com', 'Administrator', NULL, GETDATE(), NULL, 1),
       (1, 'regular_user', 'Regular', 'User', 'user@example.com', 'Regular user', 'Chess, Scrabble', GETDATE(), NULL, 1),
       (1, 'another_regular_user', 'Another', 'Regular', 'another_user@example.com', 'Another regular user', 'Checkers', GETDATE(), NULL, 1);

-- Insert seed data into Lobby table
INSERT INTO Lobby (Title, Description, CreateDateTime, Image, UsersOnline, IsOpen, UserId, Platform, GameType)
VALUES ('Chess Club', 'A lobby for chess enthusiasts', GETDATE(), NULL, 10, 1, 2, 'Chess.com', 'Chess'),
       ('Scrabble Corner', 'A lobby for Scrabble lovers', GETDATE(), NULL, 5, 1, 3, 'Facebook', 'Scrabble'),
       ('Checkers Hangout', 'A lobby for Checkers fans', GETDATE(), NULL, 8, 1, 1, 'Discord', 'Checkers');

-- Insert seed data into UserLobby table
INSERT INTO UserLobby (UserId, LobbyId)
VALUES (2, 1),
       (3, 2),
       (1, 3);

-- Insert seed data into Message table
INSERT INTO Message (Content, SendDate, LobbyId, UserId)
VALUES ('Welcome to Chess Club!', GETDATE(), 1, 2),
       ('Let''s play some Scrabble!', GETDATE(), 2, 3),
       ('Anyone up for a game of Checkers?', GETDATE(), 3, 1),
       ('Checkers is a great game!', GETDATE(), 3, 3),
       ('I agree! Checkers is awesome.', GETDATE(), 3, 1);
SQLQuery2Seed.sql…]()

## Usage

1. Register for an account on GameHub.
2. Edit your profile.
3. Click on the "Game On" button to join a lobby for your selected game.
4. Chat with the host and other players in the lobby to plan your gaming session.
5. Enjoy playing games with your newfound gaming buddies!



## Credits

- Developed by [Andy Hanks](https://github.com/andyhanks)


---

This README provides an overview of GameHub, how to install and use it, guidelines for contributing, and credits for contributions to the project.
