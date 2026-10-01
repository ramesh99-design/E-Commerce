using System.ComponentModel.DataAnnotations;
namespace E_Commerce.Api.Models;


public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Range(typeof(decimal), "0.01", "99999999")]
    public decimal Price { get; set; }

    [Required]
    public string Category { get; set; } = string.Empty;

    public int Stock { get; set; }

    public string ImageLink { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

}
