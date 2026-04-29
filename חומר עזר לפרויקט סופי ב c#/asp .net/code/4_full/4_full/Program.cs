using _4_full.Data;
using _4_full.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped<CostumesService>();
builder.Services.AddDbContext<StoreDbContext>( options =>
{
    // TODO: Move connection string to configuration
    options.UseSqlServer("Data Source=dsql;Integrated Security=True;Trust Server Certificate=True");
});
var app = builder.Build();

app.MapControllers();

app.Run();
