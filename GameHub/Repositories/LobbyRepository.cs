using GameHub.Models;
using GameHub.Utils;

namespace GameHub.Repositories
{
    public class LobbyRepository : BaseRepository, ILobbyRepository
    {
        public LobbyRepository(IConfiguration configuration) : base(configuration) { }
        public List<Lobby> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     select l.Id, Title, [Description], l.CreateDateTime, [Image], UsersOnline, IsOpen, UserId, [Platform], GameType, u.Id, u.DisplayName as 'CreatingUser'
                        FROM Lobby l
                        LEFT JOIN UserProfile u
                        on l.UserId = u.Id
                        ORDER BY Title;";

                    List<Lobby> lobbies = new List<Lobby>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        lobbies.Add(new Lobby()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Image = DbUtils.GetString(reader, "Image"),
                            UsersOnline = DbUtils.GetInt(reader, "UsersOnline"),
                            IsOpen = (bool)DbUtils.GetBool(reader, "IsOpen"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader,"CreatingUser"),
                            }
                        });
                    }
                    reader.Close();

                    return lobbies;
                }
            }
        }

        public Lobby GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      select l.Id, Title, [Description], l.CreateDateTime, [Image], UsersOnline, IsOpen, UserId, [Platform], GameType, u.Id, u.DisplayName as 'CreatingUser'
                        FROM Lobby l
                        LEFT JOIN UserProfile u
                        ON userId = u.Id
                        Where l.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Lobby lobby = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        lobby = new Lobby()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Image = DbUtils.GetString(reader, "Image"),
                            UsersOnline = DbUtils.GetInt(reader, "UsersOnline"),
                            IsOpen = (bool)DbUtils.GetBool(reader, "IsOpen"),
                            Platform = DbUtils.GetString(reader,"Platform"),
                            GameType = DbUtils.GetString(reader, "GameType"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "CreatingUser"),
                            }
                        };
                    }
                    reader.Close();

                    return lobby;
                }
            }
        }

        public void Add(Lobby lobby)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Lobby (Title, [Description], CreateDateTime, Image,
                                                                 UsersOnline, IsOpen, Platform, GameType, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Description, @CreateDateTime, 
                                                @Image, @UsersOnline, @IsOpen, @Platform, @GameType, @UserId)";
                    DbUtils.AddParameter(cmd, "@Title", lobby.Title);
                    DbUtils.AddParameter(cmd, "@Description", lobby.Description);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", lobby.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Image", lobby.Image);
                    DbUtils.AddParameter(cmd, "@UsersOnline", lobby.UsersOnline);
                    DbUtils.AddParameter(cmd, "@IsOpen", lobby.IsOpen);
                    DbUtils.AddParameter(cmd, "@Platform", lobby.Platform);
                    DbUtils.AddParameter(cmd, "@GameType", lobby.GameType);
                    DbUtils.AddParameter(cmd, "@UserId", lobby.UserId);


                    lobby.Id = (int)cmd.ExecuteScalar();
                }
            }


        }
    }
}
        