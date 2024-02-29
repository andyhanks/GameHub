using GameHub.Models;
using GameHub.Utils;

namespace GameHub.Repositories
{
    public class LobbyRepository : BaseRepository
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
                     select l.Id, Title, [Description], l.CreateDateTime, [Image], UsersOnline, IsOpen, UserId, [Platform], GameType, u.Id, DisplayName as 'CreatingUser'
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
                            Description = DbUtils.GetString(reader, "[Description]"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Image = DbUtils.GetString(reader, "Image"),
                            UsersOnline = DbUtils.GetInt(reader, "UsersOnline"),
                            IsOpen = (bool)DbUtils.GetBool(reader, "IsOpen"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "Name"),
                            }
                        });
                    }
                    reader.Close();

                    return lobbies;
                }
            }
        }
    }
}
        