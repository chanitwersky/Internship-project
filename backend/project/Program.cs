using Bl.Api;
using Bl.Services;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 🔐 JWT KEY from appsettings.json
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new Exception("Missing Jwt Key in appsettings.json");
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<Datamanager>();
builder.Services.AddScoped<AuthBL>();
builder.Services.AddScoped<AuthDal>();
builder.Services.AddScoped<JwtService>(sp =>
    new JwtService(jwtKey));
builder.Services.AddScoped<ICustomerProfileDal, CustomerProfileDal>();
builder.Services.AddScoped<ICustomerProfileBl, CustomerProfileService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ⚠️ חשוב מאוד הסדר
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();