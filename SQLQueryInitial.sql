USE [master]

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