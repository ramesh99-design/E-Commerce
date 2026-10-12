using System.ComponentModel.DataAnnotations;
using E_Commerce.Api.Data;
using E_Commerce.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "FrontendPolicy",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173", "https://ez-shopping1.netlify.app")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddOpenApi();

var app = builder.Build();
app.UseCors("FrontendPolicy");
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// GET all products
app.MapGet(
    "/api/products",
    async (AppDbContext db) =>
    {
        var products = await db.Products.ToListAsync();

        return Results.Ok(products);
    }
);

// GET product by ID
app.MapGet(
    "/api/products/{id}",
    async (int id, AppDbContext db) =>
    {
        var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (product is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(product);
    }
);

app.MapPost(
    "/api/products",
    async (Product product, AppDbContext db) =>
    {
        var validationContext = new ValidationContext(product);
        var validationResults = new List<ValidationResult>();

        bool isValid = Validator.TryValidateObject(
            product,
            validationContext,
            validationResults,
            validateAllProperties: true
        );

        if (!isValid)
        {
            return Results.BadRequest(validationResults);
        }

        var existingProduct = await db.Products.FirstOrDefaultAsync(p => p.Id == product.Id);

        if (existingProduct is not null)
        {
            return Results.BadRequest("A product with this Id already exists.");
        }
        product.Id = 0;

        db.Products.Add(product);

        await db.SaveChangesAsync();

        return Results.Created($"/api/products/{product.Id}", product);
    }
);

app.MapPut(
    "/api/products/{id:int}",
    async (int id, Product product, AppDbContext db) =>
    {
        var existingProduct = await db.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (existingProduct is null)
        {
            return Results.NotFound(new { message = $"Product with Id {id} was not found." });
        }
        var validationContext = new ValidationContext(product);
        var validationResults = new List<ValidationResult>();

        var isValid = Validator.TryValidateObject(
            product,
            validationContext,
            validationResults,
            validateAllProperties: true
        );
        if (!isValid)
        {
            return Results.BadRequest(validationResults);
        }

        existingProduct.Name = product.Name;
        existingProduct.Category = product.Category;
        existingProduct.Price = product.Price;
        existingProduct.Stock = product.Stock;
        existingProduct.ImageLink = product.ImageLink;
        existingProduct.Description = product.Description;
        existingProduct.Author = product.Author;

        await db.SaveChangesAsync();

        return Results.Ok(existingProduct);
    }
);
app.MapDelete(
    "/api/products/{id}",
    async (int id, AppDbContext db) =>
    {
        var existingProduct = await db.Products.FirstOrDefaultAsync(p => p.Id == id);

        if (existingProduct is null)
        {
            return Results.NotFound();
        }

        db.Products.Remove(existingProduct);

        await db.SaveChangesAsync();

        return Results.NoContent();
    }
);

app.Run();
