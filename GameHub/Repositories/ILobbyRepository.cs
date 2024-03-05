using GameHub.Models;

namespace GameHub.Repositories
{
    public interface ILobbyRepository
    {
        void Add(Lobby lobby);
        List<Lobby> GetAll();
        Lobby GetById(int id);
    }
}