using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Context;
using ReWear.Models;
using System.Text.Json;

namespace ReWear.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ItemsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.Include(i => i.User).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            var item = await _context.Items.Include(i => i.User).FirstOrDefaultAsync(i => i.Id == id);

            if (item == null) return NotFound();

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem([FromForm] Item item)
        {
            item.Id = Guid.NewGuid();
            item.CoverImageUrl = await SaveImage(item.CoverImage, "cover");
            item.ImageUrls = new List<string>();

            if (item.OtherImages != null)
            {
                foreach (var img in item.OtherImages)
                {
                    var imageUrl = await SaveImage(img, "gallery");
                    if (!string.IsNullOrEmpty(imageUrl))
                        item.ImageUrls.Add(imageUrl);
                }
            }

            item.ImageUrls ??= new List<string>();

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(Guid id, [FromForm] Item updatedItem)
        {
            var existing = await _context.Items.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title = updatedItem.Title;
            existing.Description = updatedItem.Description;
            existing.Size = updatedItem.Size;
            existing.Category = updatedItem.Category;
            existing.Condition = updatedItem.Condition;
            existing.IsAvailable = updatedItem.IsAvailable;

            if (updatedItem.CoverImage != null)
                existing.CoverImageUrl = await SaveImage(updatedItem.CoverImage, "cover");

            if (updatedItem.OtherImages?.Length > 0)
            {
                existing.ImageUrls = new List<string>();
                foreach (var img in updatedItem.OtherImages)
                {
                    var url = await SaveImage(img, "gallery");
                    if (!string.IsNullOrEmpty(url))
                        existing.ImageUrls.Add(url);
                }
            }

            _context.Entry(existing).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound();

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<string> SaveImage(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0) return null;

            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads", "items", folder);
            Directory.CreateDirectory(uploadsPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var relativePath = Path.Combine("uploads", "items", folder, fileName).Replace("\\", "/");
            return "/" + relativePath;
        }
    }
}
