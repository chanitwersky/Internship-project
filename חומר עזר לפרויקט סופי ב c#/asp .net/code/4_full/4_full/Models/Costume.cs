using System.ComponentModel.DataAnnotations;

namespace _4_full.Models
{
    public class Costume
    {
        public int Id { get; set; } // Primary key
        public int Price { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
