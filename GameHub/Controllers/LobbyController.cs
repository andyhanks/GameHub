using Azure;
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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_lobbyRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Post(Lobby lobby)
        {
            lobby.CreateDateTime = DateTime.Now;
            _lobbyRepository.Add(lobby);
            return CreatedAtAction(
                "GetById", new { id = lobby.Id }, lobby);
        }
    }



}
