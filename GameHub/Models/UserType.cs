namespace GameHub.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }

        public static int Player_ID => 1;
        public static int Admin_ID => 2;
    }
}
