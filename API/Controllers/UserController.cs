using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Context;
using ReWear.Models;
using ReWear.Models.VM;

namespace ReWear.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProfile(Guid id, [FromForm] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");

            user.Name = updatedUser.Name;
            user.Address = updatedUser.Address;
            user.ImageUrl = updatedUser.ImageUrl ?? user.ImageUrl;

            if (updatedUser.ImageFile != null)
            {
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(updatedUser.ImageFile.FileName)}";
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await updatedUser.ImageFile.CopyToAsync(stream);
                }

                user.ImageUrl = $"/uploads/{fileName}";
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully" });
        }


        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordVM vm)
        {
            var user = await _context.Users.FindAsync(vm.UserId);
            if (user == null)
                return NotFound("User not found");

            if (user.Password != vm.OldPassword)
                return BadRequest("Old password is incorrect");

            if (vm.NewPassword != vm.ConfirmPassword)
                return BadRequest("New password and confirm password do not match");

            if (string.IsNullOrWhiteSpace(vm.NewPassword) || vm.NewPassword.Length < 6)
                return BadRequest("New password must be at least 6 characters");

            user.Password = vm.NewPassword;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Password changed successfully" });
        }


    }
}