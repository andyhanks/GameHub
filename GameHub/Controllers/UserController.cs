using GameHub.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAll());
        }
    }
}
