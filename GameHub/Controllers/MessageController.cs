﻿using Azure;
using GameHub.Models;
using GameHub.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GameHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {

        private readonly IMessageRepository _messageRepository;
        public MessageController(IMessageRepository messageRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _messageRepository = messageRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_messageRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Message message)
        {
            _messageRepository.Add(message);
            return CreatedAtAction(
                "Get", new { id = message.Id }, message);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _messageRepository.GetById(id);

                if (_messageRepository == null)
                {
                    return NotFound($"Category with ID {id} not found");
                }

                _messageRepository.Delete(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMessage(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }

            _messageRepository.UpdateMessage(message);

            return NoContent();
        }

    }
}
