using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace ReWear.Models
{
    public class User
    {
        public Guid UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }

        public bool IsActive { get; set; } = true;

        public string Role { get; set; } = "User";

        public string? ImageUrl { get; set; } = null;

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        public int Points { get; set; } = 100;

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}