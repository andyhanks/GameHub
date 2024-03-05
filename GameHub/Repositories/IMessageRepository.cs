using GameHub.Models;

namespace GameHub.Repositories
{
    public interface IMessageRepository
    {
        void Add(Message message);
        void Delete(int messageId);
        List<Message> GetAll();
        List<Message> GetById(int id);
        Message GetMessageById(int id);
        void UpdateMessage(Message message);
    }
}