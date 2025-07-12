using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Context;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("place")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest orderRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == orderRequest.RequestedItemId);

            if (item == null || !item.IsAvailable || !item.IsApproved)
                return NotFound("Item not found or unavailable");

            item.IsAvailable = false;

            orderRequest.Id = Guid.NewGuid();
            orderRequest.Status = OrderStatus.Pending;

            _context.OrderRequests.Add(orderRequest);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order placed successfully", orderId = orderRequest.Id });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.OrderRequests.ToListAsync();
            return Ok(orders);
        }

        // Optional: GET by user, GET by item, etc. can be added here
    }
}
