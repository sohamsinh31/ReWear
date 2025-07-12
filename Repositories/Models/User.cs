using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace ReWear.Models
{
    public class User
    {
        public Guid UserId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }

        public bool IsActive { get; set; }

        public string Role { get; set; } = "User";

        public string ImageUrl { get; set; } = null;

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        public int Points { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}