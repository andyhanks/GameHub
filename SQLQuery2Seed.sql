-- Insert seed data into UserType table
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
