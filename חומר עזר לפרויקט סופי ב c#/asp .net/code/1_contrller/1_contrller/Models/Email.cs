using System.ComponentModel.DataAnnotations;

namespace _1_contrller.Models
{
    public class Email
    {
        [Range(1, 100000, ErrorMessage = "ID is not in range")]
        public int Id { get; set; }
        [EmailAddress(ErrorMessage = "Custom error")]
        public string Sender { get; set; }
        [EmailAddress]
        public string Reciever { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public bool HasAttachment { get; set; }
    }
}
