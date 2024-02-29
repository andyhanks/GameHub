using System.ComponentModel.DataAnnotations;

namespace GameHub.Models
{
    public class Lobby
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        public string Description { get; set; }

        [DisplayFormat(DataFormatString = "{0:MMM dd, yyyy}")]
        public DateTime CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string Image { get; set; }

        public int UsersOnline { get; set; }
        public bool IsOpen { get; set; }


        [Required]
        public int UserId { get; set; }
        public UserProfile? UserProfile { get; set; }
        
        public string Platform {  get; set; }

        public string GameType { get; set; }
    }
}
