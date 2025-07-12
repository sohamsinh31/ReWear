using Microsoft.AspNetCore.Mvc;

namespace ReWear.Controllers
{

    [Route("/api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login()
        {
            return Ok();
        }
    }
}