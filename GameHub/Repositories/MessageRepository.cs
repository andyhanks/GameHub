using GameHub.Models;
using GameHub.Utils;
using Microsoft.Data.SqlClient;
using System.Configuration;

namespace GameHub.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration configuration) : base(configuration) { }
        public List<Message> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, SendDate, Content, LobbyId, UserId
                        FROM Message
                        ORDER BY SendDate ";
                    var reader = cmd.ExecuteReader();
                    var messages = new List<Message>();
                    while (reader.Read())
                    {
                        messages.Add(new Message()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            SendDate = DbUtils.GetDateTime(reader, "SendDate"),
                            LobbyId = DbUtils.GetInt(reader, "LobbyId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }
                    reader.Close();
                    return messages;
                }
            }
        }
        //add
        public void Add(Message message)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Message (Content, SendDate, LobbyId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Content, @SendDate, @LobbyId, @UserId)";
                    DbUtils.AddParameter(cmd, "@Content", message.Content);
                    DbUtils.AddParameter(cmd, "@SendDate", message.SendDate);
                    DbUtils.AddParameter(cmd, "@LobbyId", message.LobbyId);
                    DbUtils.AddParameter(cmd, "@UserId", message.UserId);
                    message.Id = (int)cmd.ExecuteScalar();
                }
            }

        }

   
        
        //////////////////////delete

        public List<Message> GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Content, SendDate, LobbyId, UserId FROM Message " +
                                      "WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Message>() {new Message()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Content = reader.GetString(reader.GetOrdinal("Content")),
                        SendDate = DbUtils.GetDateTime(reader, "SendDate"),
                        LobbyId = DbUtils.GetInt(reader,"LobbyId"),
                        UserId = DbUtils.GetInt(reader,"UserId"),
                    }};
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        public void Delete(int messageId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Message 
                                      WHERE Id = @MessageId";
                    DbUtils.AddParameter(cmd, "@MessageId", messageId);
                    cmd.ExecuteNonQuery();
                }
            }
        ///////////////////////////////////////////////////still Delete
        }


        public void UpdateMessage(Message message) //updates messages
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 UPDATE Message
                                 SET Content = @content,
                                     SendDate = @sendDate,
                                     LobbyId = @lobbyId,
                                     UserId = @UserId
                                 WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", message.Id);
                    cmd.Parameters.AddWithValue("@content", message.Content);
                    cmd.Parameters.AddWithValue("@sendDate", message.SendDate);
                    cmd.Parameters.AddWithValue("@lobbyId", message.LobbyId);
                    cmd.Parameters.AddWithValue("@userId", message.UserId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Message GetMessageById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT Id, Content, SendDate, LobbyId, UserId 
                                    FROM Message
                                    WHERE Id = @id
                                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Message message = new Message()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            SendDate = DbUtils.GetDateTime(reader, "SendDate"),
                            LobbyId = DbUtils.GetInt(reader, "LobbyId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        };
                        reader.Close();
                        return message;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public List<Message> GetMessageByLobbyId(int id) 
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT m.Id, Content, SendDate, LobbyId, UserId,
                                    u.Id as UserProfileId, u.DisplayName
                                    FROM Message m
                                    LEFT Join UserProfile u
                                    ON m.UserId = u.id
                                    Where m.LobbyId = @id                                 
                                    ORDER BY SendDate Desc";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
               
                        Message message = new Message();
                        List<Message> messages = new List<Message>();
                        while (reader.Read())
                        {
                            
                            message = new Message()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                SendDate = DbUtils.GetDateTime(reader, "SendDate"),
                                LobbyId = DbUtils.GetInt(reader, "LobbyId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                }

                            };

                            messages.Add(message);
                        }
                        reader.Close();
                        return messages;
                    

                }
            }
        }
    }
}
        