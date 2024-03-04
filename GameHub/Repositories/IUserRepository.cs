using GameHub.Models;

namespace GameHub.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int userId);
        List<UserProfile> GetAll();
        UserProfile GetByEmail(string email);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
    }
}