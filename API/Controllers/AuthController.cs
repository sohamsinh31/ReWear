using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Context;
using ReWear.Models;
using ReWear.Models.VM;

namespace ReWear.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM vm)
        {
            if (string.IsNullOrEmpty(vm.Email) || string.IsNullOrEmpty(vm.Password))
                return BadRequest("Email and Password are required.");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == vm.Email && u.Password == vm.Password);

            if (user == null)
                return Unauthorized("Invalid email or password.");

            if (!user.IsActive)
                return Forbid("User account is inactive.");

            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    user.UserId,
                    user.Email,
                    user.Role,
                    user.Points
                }
            });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] User user)
        {
            // Check if user with email exists
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return Conflict("A user with this email already exists.");

            // Save uploaded file if present
            if (user.ImageFile != null && user.ImageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(user.ImageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await user.ImageFile.CopyToAsync(fileStream);
                }

                // Set image URL (relative or full path depending on use)
                user.ImageUrl = $"/uploads/{uniqueFileName}";
            }

            user.UserId = Guid.NewGuid();
            user.CreatedDate = DateTime.UtcNow;
            user.Password = user.Password; // Consider hashing!
            user.IsActive = true;
            user.Role = "User";
            user.Points = 0;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Registration successful",
                user = new
                {
                    user.UserId,
                    user.Email,
                    user.ImageUrl,
                    user.Role
                }
            });
        }

    }
}
