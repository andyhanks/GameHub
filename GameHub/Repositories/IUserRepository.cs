using GameHub.Models;

namespace GameHub.Repositories
{
    public interface IUserRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetByEmail(string email);
        UserProfile GetById(int id);
    }
}