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
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
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
    }


public static class UserProfileEndpoints
{
	public static void MapUserProfileEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/UserProfile").WithTags(nameof(UserProfile));

        group.MapGet("/", () =>
        {
            return new [] { new UserProfile() };
        })
        .WithName("GetAllUserProfiles")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new UserProfile { ID = id };
        })
        .WithName("GetUserProfileById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, UserProfile input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateUserProfile")
        .WithOpenApi();

        group.MapPost("/", (UserProfile model) =>
        {
            //return TypedResults.Created($"/api/UserProfiles/{model.ID}", model);
        })
        .WithName("CreateUserProfile")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new UserProfile { ID = id });
        })
        .WithName("DeleteUserProfile")
        .WithOpenApi();
    }
}}
