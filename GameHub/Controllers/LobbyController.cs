using GameHub.Models;
using GameHub.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace GameHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LobbyController: ControllerBase
    {
        //private readonly ILobbyRepository _lobbyRepository;
        private readonly ILobbyRepository _lobbyRepository;
        public LobbyController(ILobbyRepository lobbyRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _lobbyRepository = lobbyRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_lobbyRepository.GetAll());
        }
    }
}
