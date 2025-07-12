using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace ReWear.Models
{
    public enum RequestType
    {
        Swap,
        Points
    }

    public enum OrderStatus
    {
        Pending,
        Accepted,
        Rejected,
        Cancelled,
        Completed
    }

    public class OrderRequest
    {
        public Guid Id { get; set; }

        public Guid RequestedItemId { get; set; }

        public RequestType RequestType { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public Item? RequestedItem { get; set; }

        public Guid UserId { get; set; }

        public User? User { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;
    }
}
