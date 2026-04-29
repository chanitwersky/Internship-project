using _1_contrller.Services;

var builder = WebApplication.CreateBuilder();

builder.Services.AddControllers();
builder.Services.AddSingleton<EmailsService>();

var app = builder.Build();
app.MapControllers();

app.Run();

