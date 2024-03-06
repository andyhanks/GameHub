using System.ComponentModel.DataAnnotations;

namespace GameHub.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime SendDate { get; set; }

        [Required]
        public int LobbyId {get; set;}
        
        public Lobby? Lobby { get; set; }

        [Required]
        public int UserId { get; set; }
        public UserProfile? UserProfile { get; set; }
    }
}
