using GameHub.Models;

namespace GameHub.Repositories
{
    public interface IUserRepository
    {
        List<UserProfile> GetAll();
    }
}