using Bl.Api;
using Bl.Services;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 🔐 JWT KEY from appsettings.json
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new Exception("Missing Jwt Key in appsettings.json");
// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddDbContext<Datamanager>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<AuthBL>();
builder.Services.AddScoped<AuthDal>();
builder.Services.AddScoped<JwtService>(sp =>
    new JwtService(jwtKey));
builder.Services.AddScoped<ICustomerProfileDal, CustomerProfileDal>();
builder.Services.AddScoped<ICustomerProfileBl, CustomerProfileService>();
builder.Services.AddScoped<IDoctorsListDal, DoctorsListDal>();
builder.Services.AddScoped<IDoctorsListBl, DoctorsListService>();
builder.Services.AddScoped<IWorkerProfileDal, WorkerProfileDal>();
builder.Services.AddScoped<IWorkerProfileBl, WorkerProfileService>();
builder.Services.AddScoped<ICustomerBookingDal, CustomerBookingDal>();
builder.Services.AddScoped<ICustomerBookingBl, CustomerBookingService>();
builder.Services.AddScoped<DoctorDal>();
builder.Services.AddScoped<DoctorService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS – allow Angular dev server (any local port, e.g. 4200 or 56981)
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
            {
                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                    return false;
                return uri.Host is "localhost" or "127.0.0.1";
            })
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 🔐 Authentication (JWT)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)),

        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// 🔐 Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("DoctorOnly", policy =>
        policy.RequireClaim("UserType", "Doctor"));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<Datamanager>();
    await context.Database.EnsureCreatedAsync();
    await DatabaseSchemaService.EnsureWorkerProfileColumnsAsync(context);
    await DatabaseSeedService.SeedAsync(context);
}

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Middleware order matters for CORS + JWT:
// Routing → CORS → Authentication → Authorization → Endpoints
app.UseRouting();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();