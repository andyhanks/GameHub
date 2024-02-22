using System.ComponentModel.DataAnnotations;

namespace GameHub.Models
{
    public class UserProfile
    {


            public int Id { get; set; }

            [Required]
            [MaxLength(50)]
            public string FirstName { get; set; }

            [Required]
            [MaxLength(50)]
            public string LastName { get; set; }

            [Required]
            [MaxLength(50)]
            public string DisplayName { get; set; }

            [Required]
            [DataType(DataType.EmailAddress)]
            [MaxLength(255)]
            public string Email { get; set; }

            [DisplayFormat(DataFormatString = "{0:MMM dd, yyyy}")]
            public DateTime CreateDateTime { get; set; }

            [DataType(DataType.Url)]
            [MaxLength(255)]
            public string ImageLocation { get; set; }

            [Required]
            public int UserTypeId { get; set; }
            //public UserType? UserType { get; set; }

            public string FullName
            {
                get
                {
                    return $"{FirstName} {LastName}";
                }
            }
        }
    
}
}
