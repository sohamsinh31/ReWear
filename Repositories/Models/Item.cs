using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace ReWear.Models
{
    public class Item
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string Size { get; set; }

        public string Condition { get; set; }

        public int PointsRequired { get; set; }

        public int UsedFrequency { get; set; }

        public string? CoverImageUrl { get; set; }

        public List<string>? ImageUrls { get; set; }

        [NotMapped]
        public IFormFile? CoverImage { get; set; }

        [NotMapped]
        public IFormFile[]? OtherImages { get; set; }

        public bool IsAvailable { get; set; } = true;

        public bool IsApproved { get; set; } = false;

        public Guid UserId { get; set; }

        public User? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
