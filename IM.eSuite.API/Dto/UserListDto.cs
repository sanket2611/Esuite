using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class UserListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}