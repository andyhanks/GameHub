using GameHub.Models;

namespace GameHub.Repositories
{
    public interface ILobbyRepository
    {
        List<Lobby> GetAll();
    }
}