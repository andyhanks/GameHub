﻿
using GameHub.Models;
using GameHub.Utils;


namespace GameHub.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.Bio, up.PreferredGames, up.CreateDateTime, up.ImageLocation, up.Ready, up.[Password], up.UserTypeId,
                               ut.TypeName AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               ORDER BY up.DisplayName";

                    List<UserProfile> userProfiles = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            PreferredGames = DbUtils.GetString(reader, "PreferredGames"),
                            Password = DbUtils.GetString(reader, "Password"),
                            Ready = (bool)DbUtils.GetBool(reader, "Ready"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                TypeName = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        });
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.TypeName AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                TypeName = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

       

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        

                                        INSERT INTO UserProfile ( FirstName, LastName, DisplayName, 
                                                                 Email, Bio, PreferredGames, CreateDateTime, ImageLocation, Ready, Password, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES ( @FirstName, @LastName, @DisplayName, 
                                                @Email, @Bio, @PreferredGames, @CreateDateTime, @ImageLocation, @Ready, @Password, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Bio", userProfile.Bio);
                    DbUtils.AddParameter(cmd, "@PreferredGames", userProfile.PreferredGames);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Ready", userProfile.Ready);
                    DbUtils.AddParameter(cmd, "@Password", userProfile.Password);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);


                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }


        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE  UserProfile
                        SET
                        FirstName = @firstName,
                        LastName = @lastName,
                        DisplayName = @displayName, 
                        Email = @email, 
                        Bio = @bio, 
                        PreferredGames = @preferredGames, 
                        CreateDateTime = @createDateTime, 
                        ImageLocation = @imageLocation, 
                        Ready = @ready, 
                        [Password] = @password 
                        Where Id = @id;    ";
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@displayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@bio", userProfile.Bio);
                    DbUtils.AddParameter(cmd, "@preferredGames", userProfile.PreferredGames);
                    DbUtils.AddParameter(cmd, "@createDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@imageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@ready", userProfile.Ready);
                    DbUtils.AddParameter(cmd, "@password", userProfile.Password);
                 


                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.Bio, up.PreferredGames, up.CreateDateTime, up.ImageLocation, up.Ready, up.[Password], up.UserTypeId,
                               ut.TypeName AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            PreferredGames = DbUtils.GetString(reader, "PreferredGames"),
                            Password = DbUtils.GetString(reader, "Password"),
                            Ready = (bool)DbUtils.GetBool(reader, "Ready"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                TypeName = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        public void Delete(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserProfile 
                                        WHERE Id = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    cmd.ExecuteNonQuery();
                }


            }
        }
    }
}



